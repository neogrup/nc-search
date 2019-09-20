import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-ripple/paper-ripple.js';
import { MixinSearch } from './nc-search-behavior.js';

class NcSearchLinesLine extends MixinSearch(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
        }
        
        .line {
          position: relative;
          min-height: 40px;
          @apply --layout-horizontal;
          @apply --layout-center;
          border-color: #BDBDBD;
          border-style: solid;
          border-width: 0 0 1px 0;
        }

        .line-container {
          min-height: 40px;
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-flex;
        }

        .line-content{
          @apply --layout-horizontal;
          @apply --layout-flex;
          padding-left: 10px;
        }

        .line-code {
          width: 70px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .line-content-name {
          font-size: 1.1em;
        }

        .line-price {
          /* width: 90px; */
          padding: 0 5px 0 2px;
          text-align: right;
        }
        
        .line-actions{
          /* font-size: 1em; */
        }

        paper-ripple {
          color: var(--app-accent-color);
        }

        paper-icon-button{
          padding: 2px;
        }
      </style>
      
      
      <div class="line">
        <div class="line-container" on-tap="_selectLine">
          <!-- <div class="line-code">[[line.code]]</div> -->
          <div class="line-content">
            <div class="line-content-name">[[line.name]]</div>
          </div>
          <div class="line-price">{{_formatPrice(line.price)]]</div>
        </div>
        <div class="line-actions">
          <template is="dom-if" if="{{showLinesActionsDialog}}">
            <paper-icon-button icon="more-vert" on-tap="_showLineActions"></paper-icon-button>
          </template>

          <template is="dom-if" if="{{!showLinesActionsDialog}}">
            <template is="dom-repeat" items="{{lineActions}}">
              <paper-icon-button icon="[[item.icon]]" class\$="[[_getLineActionClass(item)]]" on-tap="_lineActionSelected"></paper-icon-button>
            </template>
          </template>
        </div>
        <paper-ripple id="ripple" initial-opacity="0.5"></paper-ripple>
      </div>
    `;
  }
  static get properties() {
    return {
      line: {
        language: String,
        type: Object,
        value: {}
      },
      showLinesActionsDialog: {
        type: Boolean,
        value: false
      },
      lineActions: Array,
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.lineActions){
      if (this.lineActions.length <= 1){
        this.showLinesActionsDialog = false;
      } else {
        this.showLinesActionsDialog = true;
      }
    }
  }

  _showLineActions(e){
    this.dispatchEvent(new CustomEvent('actions', { detail: e.target, bubbles: true, composed: true }));
  }

  _lineActionSelected(e){
    this.dispatchEvent(new CustomEvent('line-action-selected', { detail: e, bubbles: true, composed: true }));
  }

  _selectLine() {
    this.dispatchEvent(new CustomEvent('product-selected', {detail: this.line, bubbles: true, composed: true }));
  }

  _formatPrice(price){
    if (price){
      return price + ' €';
    }
  }
}

window.customElements.define('nc-search-lines-line', NcSearchLinesLine);
