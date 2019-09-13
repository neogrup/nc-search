import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-ripple/paper-ripple.js';

class NcSearchListItem extends PolymerElement {
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

        .line-content-code {
          width: 100px;
          font-size: 1.1em;
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
      </style>
      
      <div class="line">
        <div class="line-container" _on-tap="_selectLine">
          <div class="line-content">
            <div class="line-content-code">[[line.code]]</div>
            <div class="line-content-name">[[line.name]]</div>
          </div>
          <div class="line-price">[[line.price]]</div>
          <div class="line-actions">
            <paper-icon-button icon="more-vert" on-tap="_showLineActions"></paper-icon-button>
          </div>
        </div>
        <paper-ripple id="ripple" initial-opacity="0.5"></paper-ripple>
      </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'nc-search-list',
      },
    };
  }
}

window.customElements.define('nc-search-list-item', NcSearchListItem);
