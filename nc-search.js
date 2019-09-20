import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './nc-search-input.js';
import './nc-search-lines.js';
class NcSearch extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host{
          @apply --layout-vertical;
          height: 100%;
          width: 100%;
          font-size: var(--nc-doc-font-size);
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
            data-ticket-products-search-lines-actions="[[dataTicketProductsSearchLinesActions]]"
            on-product-selected-enter-pressed="_selectInputText">
        </nc-search-lines>
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
      searchType: {
        type: String,
        value: "product"
      },
      searchStartAtCharacterNumber:{
        type: Number,
        value: 3
      }, 
      linesData: Object,
      dataTicketProductsSearchLinesActions: Array
    };
  }

  _search(e){
    this.dispatchEvent(new CustomEvent('search', { detail: e.detail, bubbles: true, composed: true }));
    this.shadowRoot.querySelector('nc-search-lines').set('insertAfterSearch',false);
  }

  _searchInsert(e){
    this.dispatchEvent(new CustomEvent('search', { detail: e.detail, bubbles: true, composed: true }));
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
}

window.customElements.define('nc-search', NcSearch);
