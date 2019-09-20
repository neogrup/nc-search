import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import moment from 'moment/src/moment.js';
import 'moment/src/locale/es.js';
import 'moment/src/locale/ca.js';
import {formatMoney} from 'accounting-js';

/* @polymerMixin */
let ncSearchBehavior = (base) =>
  class extends base {
    constructor() {
      super();
    }

    static get properties() {
      return {
        language: {
          type: String,
          observer: '_languageChanged'
        }
      }
    }

    _languageChanged(){
      if (typeof(moment)!="undefined") {
        moment.locale(this.language);
      }
    }

    _getLineActionClass(element){
      let className = '';
      let lineAction = element.action;

      switch (lineAction) {
      }

      return className;
    }
  };
  export const MixinSearch = dedupingMixin(ncSearchBehavior);
