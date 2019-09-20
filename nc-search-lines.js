import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { MixinSearch } from './nc-search-behavior.js';

import './nc-search-lines-line.js'

class NcSearchLines extends mixinBehaviors([AppLocalizeBehavior], MixinSearch(PolymerElement)) {
  static get template() {
    return html`
      <style>
         ::-webkit-scrollbar {
          width: 15px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 1px var(--app-scrollbar-color);
          background-color: #EEEEEE;
          border-radius: 10px;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: var(--app-scrollbar-color);
          border-radius: 10px;
        }

        :host {
          display: block;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        paper-card{
          padding: 5px;
          height: 100%;
        }

        .lines-empty{
          text-align: center;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
        }
        
        .lines{
          height: 100%;
          width:100%;
          color: black;
          overflow: auto;
        }
      </style>

      <paper-card>
        <div id="lines" class="lines">
          <template is="dom-repeat" items="{{lines}}" as="line">
            <nc-search-lines-line
                id="slot[[line.id]]" 
                language="{{language}}" 
                line="{{line}}"
                line-actions="[[dataTicketProductsSearchLinesActions]]" 
                on-actions="_showLineActions" 
                on-line-action-selected="_lineActionSelectedPrev" 
                on-item-selected="_itemSelected">
            </nc-search-lines-line>
          </template>
                    
          <template is="dom-if" if="{{showNoLines}}">
            <p class="lines-empty">{{localize('SEARCH_LINES_NOT_LINES')}}</p>
          </template>
        </div>
      </paper-card>

      <paper-dialog id="actions" vertical-align="top" dynamic-align>
        <div class="line-dialog-actions">
          <template is="dom-repeat" items="{{dataTicketProductsSearchLinesActions}}">
            <paper-icon-button icon="[[item.icon]]" class\$="[[_getLineActionClass(item)]]" on-tap="_lineActionSelected"></paper-icon-button>
          </template>
        </div>
      </paper-dialog>
    `;
  }
  static get properties() {
    return {
      language: String,
      linesData: {
        type: Object,
        value: {},
        notify: true
      },
      showNoLines: {
        type: Boolean,
        value: true
      },
      lines: {
        type: Array,
        value: []
      },
      dataTicketProductsSearchLinesActions: Array
    };
  }

  static get importMeta() { 
    return import.meta; 
  }

  static get observers() {
    return [
      '_linesDataChanged(linesData)'
    ]
  }
  

  connectedCallback() {
    super.connectedCallback();
    this.useKeyIfMissing = true;

    this.loadResources(this.resolveUrl('./static/translations.json'));
  }

  _linesDataChanged() {
    this.set('lines', []);
    this.showNoLines = true;
    if (!this.linesData) return;
    if (this.linesData.length > 0) {
      this.showNoLines = false;
      this.set('lines', this.linesData);
      if (this.insertAfterSearch){
        this._selectLine();
        this.insertAfterSearch = false;
      }
    }
  }

  _selectLine(){
    if (this.linesData){
      if (this.linesData.length == 1){
        this.dispatchEvent(new CustomEvent('product-selected-enter-pressed', {bubbles: true, composed: true }));
        this.dispatchEvent(new CustomEvent('product-selected', {detail: this.linesData[0], bubbles: true, composed: true }));
      }
    }
  }

  _showLineActions(element){
    this._currentLine = element.target.line;
    this.shadowRoot.querySelector('#actions').positionTarget = element.detail;
    this.shadowRoot.querySelector('#actions').open();
  }

  _lineActionSelectedPrev(element){
    this._currentLine = element.target.line;
    this._lineActionSelected(element)
  }

  _lineActionSelected(element){
    let lineAction = (element.model.item) ? element.model.item.action : element.detail.model.item.action;

    switch (lineAction) {
      case '_showInfo':
        this._showInfo();
        break;
    }
  }

  _showInfo(){
    this.dispatchEvent(new CustomEvent('product-show-info', { detail: this._currentLine, bubbles: true, composed: true }));
    this.shadowRoot.querySelector('#actions').close();
  }
}

window.customElements.define('nc-search-lines', NcSearchLines);
