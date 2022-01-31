import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { MixinSearch } from './nc-search-behavior.js';


class NcSearchInput extends mixinBehaviors([AppLocalizeBehavior], MixinSearch(PolymerElement)) {
  static get template() {
    return html`
       <style>
        :host{
          display: block;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
        }
        
        paper-input{
          padding: 0 5px;
        }
      </style>

      <div>
        <paper-input id="search" label="{{localize('SEARCH_INPUT_TEXT')}}" no-label-float on-keyup="_keyUp" value="{{searchInputValue}}">
          <paper-icon-button slot="suffix" on-click="_clearSearch" icon="clear">
          </paper-icon-button>
        </paper-input>
      </div>
    `;
  }
  static get properties() {
    return {
      language: String,
      loading: {
        type: Boolean,
        value: false,
        notify: true
      },
      searchType: String,
      searchInputValue: String,
      searchStartAtCharacterNumber: Number,
      target: {
        type: Object
      },
      lastSearchTime: {
        type: String,
        value: ''
      } 
    };
  }

  static get importMeta() { 
    return import.meta; 
  }

  connectedCallback() {
    super.connectedCallback();
    this.useKeyIfMissing = true;
    this.target = this;

    this.loadResources(this.resolveUrl('./static/translations.json'));
  }

  _keyUp(e){
    let dateNow = new Date();
    let result = 0;

    if (this.lastSearchTime != ''){
      result = dateNow.getTime() - this.lastSearchTime.getTime() 
      // console.log('result: ', result);
    }
    this.lastSearchTime = dateNow;
    
    if (result >= 300){
      if (this.searchInputValue.length >= this.searchStartAtCharacterNumber){
        if (e.key == 'Enter'){
          if (this.enterPressed){
            this.dispatchEvent(new CustomEvent('input-search-insert', { detail: this.searchInputValue, bubbles: true, composed: true }));
          } else{
            this.dispatchEvent(new CustomEvent('input-insert', { detail: this.searchInputValue, bubbles: true, composed: true }));
          }
        } else {
          this.dispatchEvent(new CustomEvent('input-search', { detail: this.searchInputValue, bubbles: true, composed: true }));
        }
      } else {
        this.dispatchEvent(new CustomEvent('clear-list', {bubbles: true, composed: true }));
      }
    } else {
      if (e.key == 'Enter'){
        this.enterPressed = true;
      } else {
        this.enterPressed = false;
      }
      this._searchChangedDebouncer = Debouncer.debounce(this._searchChangedDebouncer,
        timeOut.after(300),
        () => this._keyUp(e)
      );
    }
  }

  _clearSearch(){
    this.enterPressed = false;
    this.searchInputValue = '';
    this.dispatchEvent(new CustomEvent('clear-list', {bubbles: true, composed: true }));
  }

  selectInputText(){
    this.$.search.focus();
    this.$.search.inputElement.inputElement.select();
  }

  setInputFocus(){
    this.$.search.focus();
  }

  refresh(){
    if (this.searchInputValue.length >= this.searchStartAtCharacterNumber){
      this.dispatchEvent(new CustomEvent('input-search', { detail: this.searchInputValue, bubbles: true, composed: true }));
    }
  }
}

window.customElements.define('nc-search-input', NcSearchInput);
