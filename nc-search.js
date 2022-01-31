import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-fab/paper-fab.js';
import './nc-search-input.js';
import './nc-search-lines.js';

class NcSearch extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          @apply --layout-vertical;
          height: 100%;
          width: 100%;
          font-size: var(--nc-doc-font-size);
        }

        .add {
          position: absolute;
          bottom: 0px;
          left: calc(50% - 30px);
          margin-bottom: 10px;
        }

        paper-fab{
        --paper-fab-background: var(--app-secondary-color);
        --paper-fab-keyboard-focus-background: var(--app-secondary-color);
      }
      </style>
      
      <div id="search-input">
        <nc-search-input
            language="{{language}}"
            search-start-at-character-number="[[searchStartAtCharacterNumber]]"
            on-input-search="_search"
            on-input-search-insert="_searchInsert"
            on-input-insert="_insert"
            on-clear-list="_clearList">
        </nc-search-input>
      </div>

      <div id="search-list" style="height: 100%;overflow: auto;">
        <nc-search-lines
            language="{{language}}"
            loading="{{loading}}"
            lines-data="[[linesData]]"
            search-type="[[searchType]]"
            data-ticket-products-search-lines-actions="[[dataTicketProductsSearchLinesActions]]"
            data-ticket-customers-search-lines-actions="[[dataTicketCustomersSearchLinesActions]]"
            on-item-selected-enter-pressed="_selectInputText">
        </nc-search-lines>
      </div>
      <template is="dom-if" if="{{showAddButton}}">
        <div class="add">
          <paper-fab icon="add" on-tap="_searchAdd"></paper-fab>
        </div>
      </template>
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
      searchType: {
        type: String,
        value: "product"
      },
      searchStartAtCharacterNumber:{
        type: Number,
        value: 3
      }, 
      linesData: Object,
      dataTicketProductsSearchLinesActions: Array,
      dataTicketCustomersSearchLinesActions: Array,
      showAddButton: {
        type: Boolean,
        value: false
      }
    };
  }

  _search(e){
    if (this.searchType == 'product') {
      this.dispatchEvent(new CustomEvent('product-search', { detail: e.detail, bubbles: true, composed: true }));
    } else {
      this.dispatchEvent(new CustomEvent('customer-search', { detail: e.detail, bubbles: true, composed: true }));
    }
    this.shadowRoot.querySelector('nc-search-lines').set('insertAfterSearch',false);
  }

  _searchInsert(e){
    if (this.searchType == 'product') {
      this.dispatchEvent(new CustomEvent('product-search', { detail: e.detail, bubbles: true, composed: true }));
    } else {
      this.dispatchEvent(new CustomEvent('customer-search', { detail: e.detail, bubbles: true, composed: true }));
    }
    this.shadowRoot.querySelector('nc-search-lines').set('insertAfterSearch',true);
  }

  _insert(e){
    if (!this.loading){
      this.shadowRoot.querySelector('nc-search-lines')._selectLine();
      this.shadowRoot.querySelector('nc-search-lines').set('insertAfterSearch',false);
    }
  }

  clearListAndFilter(){
    this.shadowRoot.querySelector('nc-search-input').set('searchInputValue','');
    this.setInputFocus();
    this.set('linesData', {});
  }
  
  _clearList(){
    this.set('linesData', {});
  }

  _selectInputText(){
    this.shadowRoot.querySelector('nc-search-input').selectInputText();
  }

  setInputFocus(){
    this.shadowRoot.querySelector('nc-search-input').setInputFocus();
  }

  lineActionSelectedPrev(element){
    if (this.shadowRoot.querySelector('nc-search-lines')){
      this.shadowRoot.querySelector('nc-search-lines')._lineActionSelectedPrev(element);
    }
  }

  _searchAdd(){
    if (this.searchType == "product") {
      // this.dispatchEvent(new CustomEvent('product-add', {bubbles: true, composed: true }));
    } else {
      this.dispatchEvent(new CustomEvent('customer-add', {bubbles: true, composed: true }));
    }
  }

  refresh(){
    if(typeof this.shadowRoot.querySelector('nc-search-input').refresh !== 'undefined') {
      this.shadowRoot.querySelector('nc-search-input').refresh();
    }
  }
}

window.customElements.define('nc-search', NcSearch);
