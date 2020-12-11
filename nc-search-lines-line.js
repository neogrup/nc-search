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

        .line-container-product {
          min-height: 40px;
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-flex;
        }

        .line-product-code {
          width: 70px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .line-content-product{
          @apply --layout-horizontal;
          @apply --layout-flex;
          padding-left: 5px;
        }

        .line-content-product-name {
          font-size: 1.1em;
        }

        .line-product-price {
          /* width: 90px; */
          padding: 0 5px 0 2px;
          text-align: right;
        }

        .line-container-customer {
          min-height: 60px;
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-flex;
        }

        .line-content-customer{
          @apply --layout-vertical;
          padding-left: 5px;
        }

        .line-content-customer-code {
          font-size: 0.9em;
        }

        .line-content-customer-name {
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

        <template is="dom-if" if="{{isProductLine}}">
          <div class="line-container-product" on-tap="_selectLine">
            <!-- <div class="line-product-code">[[line.code]]</div> -->
            <div class="line-content-product">
              <div class="line-content-product-name">[[line.name]]</div>
            </div>
            <div class="line-product-price">{{_formatPrice(line.price)]]</div>
          </div>
        </template>

        <template is="dom-if" if="{{isCustomerLine}}">
          <div class="line-container-customer" on-tap="_selectLine">
            <div class="line-content-customer">
              <div class="line-content-customer-code">[[line.code]]</div>
              <div class="line-content-customer-name">[[line.name]]</div>
            </div>
          </div>
        </template>


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
      searchType: {
        type: String,
      },
      isProductLine: {
        type: Boolean,
        computed: '_isProductLine(searchType)'
      },
      isCustomerLine: {
        type: Boolean,
        computed: '_isCustomerLine(searchType)'
      },
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

  _isProductLine(searchType){
    return (searchType=='product');
  }

  _isCustomerLine(searchType){
    return (searchType=='customer');
  }

  _showLineActions(e){
    this.dispatchEvent(new CustomEvent('actions', { detail: e.target, bubbles: true, composed: true }));
  }

  _lineActionSelected(e){
    this.dispatchEvent(new CustomEvent('line-action-selected', { detail: e, bubbles: true, composed: true }));
  }

  _selectLine() {
    if (this.searchType == 'product') {
      this.dispatchEvent(new CustomEvent('product-selected', {detail: this.line, bubbles: true, composed: true }));
    } else {
      this.dispatchEvent(new CustomEvent('customer-selected', {detail: this.line, bubbles: true, composed: true }));
    }
  }

  _formatPrice(price){
    if (price){
      return price + ' €';
    }
  }
}

window.customElements.define('nc-search-lines-line', NcSearchLinesLine);
