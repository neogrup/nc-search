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

        .row-center{
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .row-flex{
          @apply --layout-flex;
        }

        .row-responsive{
          @apply --layout-vertical;
        }

        .row-padding-vertical {
          margin: 2px 0px;
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

        .line-content-customer {
          @apply --layout-vertical;
          width: 100%;
          padding: 10px 0px;
        }

        .line-content-customer-icon{
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }

        .line-content-customer-code {
          font-size: 0.9em;
        }

        .line-content-customer-name {
          font-size: 1.1em;
          font-weight: 600;
        }
        
        .line-content-customer-tax-identification-code {
          
        }

        .line-content-customer-contact-email {
          color: #757575;
        }

        .line-content-customer-contact-tel {
          color: #757575;
        }

        .line-content-customer-postal-address-detail{
          color: #757575;
        }

        .line-content-customer-description{
          color: #757575;
        }
        
        iron-icon {
          fill: #9E9E9E;
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
            <div class="line-product-price">{{_formatPrice(line.price)}}</div>
          </div>
        </template>

        <template is="dom-if" if="{{isCustomerLine}}">
          <div class="line-container-customer" on-tap="_selectLine">
            <div class="line-content-customer">

              <div class="row-center row-padding-vertical">
                <template is="dom-if" if="[[_lineHasValue(line.name)]]">
                  <div class="row-center" style="width: 70%">
                    <div class="line-content-customer-icon">
                      <iron-icon icon="social:person"></iron-icon>  
                    </div>
                    <div class="line-content-customer-name">[[line.name]]</div>
                  </div>
                </template>

                <template is="dom-if" if="[[_lineHasValue(line.taxIdentification.code)]]">
                  <div class="row-center">
                    <div class="line-content-customer-icon">
                      <iron-icon icon="nc-icons:taxIdentification"></iron-icon>  
                    </div>
                    <div class="line-content-customer-tax-identification-code">[[line.taxIdentification.code]]</div>
                  </div>
                </template>
              </div>

              <div class="row-center row-padding-vertical">
                <template is="dom-if" if="[[_lineHasValue(line.contact.email)]]">
                  <div class="row-center" style="width: 70%">
                    <div class="line-content-customer-icon">
                      <iron-icon icon="mail"></iron-icon>  
                    </div>
                    <div class="line-content-customer-contact-email">[[line.contact.email]]</div>
                  </div>
                </template>

                <template is="dom-if" if="[[_lineHasValue(line.contact.tel)]]">
                  <div class="row-center">
                    <div class="line-content-customer-icon">
                      <iron-icon icon="communication:phone"></iron-icon>  
                    </div>
                    <div class="line-content-customer-contact-tel">[[line.contact.tel]]</div>
                  </div>
                </template>
              </div>

              <template is="dom-if" if="[[_lineHasValue(line.postalAddress.detail)]]">
                <div class="row-center row-padding-vertical">
                  <div class="line-content-customer-icon">
                    <iron-icon icon="maps:place"></iron-icon>  
                  </div>
                  <div class="line-content-customer-postal-address-detail">[[_getFullPostalAddressDetail(line.postalAddress)]]</div>
                </div>
              </template>

              <template is="dom-if" if="[[_lineHasValue(line.description)]]">
                <div class="row-center row-padding-vertical">
                  <div class="line-content-customer-icon">
                    <iron-icon icon="info"></iron-icon>  
                  </div>
                  <div class="line-content-customer-description">[[line.description]]</div>
                </div>
              </template>
              
            </div>
          </div>

        </template>


        <div class="line-actions">
          <template is="dom-if" if="{{showLinesActionsDialog}}">
            <paper-icon-button icon="more-vert" on-tap="_openLineActions"></paper-icon-button>
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

  _selectLine() {
    if (this.searchType == 'product') {
      this.dispatchEvent(new CustomEvent('product-selected', {detail: this.line, bubbles: true, composed: true }));
    } else {
      this.dispatchEvent(new CustomEvent('customer-selected', {detail: this.line, bubbles: true, composed: true }));
    }
  }

  _lineActionSelected(e){
    this.dispatchEvent(new CustomEvent('line-action-selected', { detail: e, bubbles: true, composed: true }));
  }

  _openLineActions(e){
    this.dispatchEvent(new CustomEvent('open-line-actions', { detail: e.target, bubbles: true, composed: true }));
  }

  _formatPrice(price){
    if (price){
      return price + ' €';
    }
  }

  _lineHasValue(value){
    return ((value === undefined) || (value == '')) ? false : true;
  }

  _getFullPostalAddressDetail(postalAddress){
    let fullPostalAddress;

    fullPostalAddress = postalAddress.detail;

    if (postalAddress.postalCode){
      fullPostalAddress = fullPostalAddress + " (" + postalAddress.postalCode;
      if (postalAddress.city){
        fullPostalAddress = fullPostalAddress + " - " + postalAddress.city + ")";
      } else {
        fullPostalAddress = fullPostalAddress + ")";
      }
    } else {
      if (postalAddress.city){
        fullPostalAddress = fullPostalAddress + " (" + postalAddress.city + ")";
      }
    }

    return fullPostalAddress;
  }
}

window.customElements.define('nc-search-lines-line', NcSearchLinesLine);
