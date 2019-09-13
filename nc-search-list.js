import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-card/paper-card.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import './nc-search-list-item.js'

class NcSearchList extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
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
            <nc-search-list-item
                id="slot[[line.id]]" 
                language="{{language}}" 
                line="{{line}}">
            </nc-search-list-item>
          </template>
                    
          <template is="dom-if" if="{{showNoLines}}">
            <p class="lines-empty">{{localize('DOC_LINES_NOT_LINES')}}</p>
          </template>
        </div>
      </paper-card>
    `;
  }
  static get properties() {
    return {
      language: String,
      listData: {
        type: Object,
        value: {},
        observer: '_listDataChanged'
      },
      showNoLines: {
        type: Boolean,
        value: true
      },
      lines: {
        type: Array,
        value: []
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.useKeyIfMissing = true;

    this.loadResources(this.resolveUrl('./static/translations.json'));
  }

  _listDataChanged() {
    this.set('lines', []);
    this.showNoLines = true;
    if (!this.listData) return;
    if (this.listData.length > 0) {
      this.showNoLines = false;
      this.set('lines', this.listData);
    }
  }
}

window.customElements.define('nc-search-list', NcSearchList);
