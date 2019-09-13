import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './nc-search-input.js';
import './nc-search-list.js';
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
            on-clear-list="_clearList">
        </nc-search-input>
      </div>

      <div id="search-list" style="height: 100%;overflow: auto;">
        <nc-search-list
            language="{{language}}"
            list-data="[[listData]]">
        </nc-search-list>
      </div>

    `;
  }
  static get properties() {
    return {
      language: String,
      searchType: {
        type: String,
        value: "product"
      },
      searchStartAtCharacterNumber:{
        type: Number,
        value: 3
      }, 
      listData: Object
    };
  }
  
  _clearList(){
    this.set('listData', {});
  }

}

window.customElements.define('nc-search', NcSearch);
