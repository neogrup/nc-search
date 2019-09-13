import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-input/paper-input.js';


class NcSearchInput extends PolymerElement {
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
        
        paper-card{
          width: 100%;
          margin: 0 0 5px 0;
          padding: 5px;
        }
      </style>

      <paper-card>
        <div>
          <paper-input id="search" on-value-changed="_searchChanged"></paper-input>
        </div>
      </paper-card>
    `;
  }
  static get properties() {
    return {
      language: String,
      searchType: String,
      searchStartAtCharacterNumber: Number 
    };
  }

  _searchChanged(){
    console.log(this.$.search.value)
    let searchString = this.$.search.value;
    if (searchString.length >= this.searchStartAtCharacterNumber){
      this.dispatchEvent(new CustomEvent('search', { detail: this.$.search.value, bubbles: true, composed: true }));
    } else {
      this.dispatchEvent(new CustomEvent('clear-list', {bubbles: true, composed: true }));
    }
  }
}

window.customElements.define('nc-search-input', NcSearchInput);
