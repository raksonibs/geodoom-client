import Ember from 'ember';
import accounting from 'accounting';
import moment from 'moment';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const valueForInput = this.get('balanceChange.value') ? this.formatValue(this.get('balanceChange.value')) : null
    this.set('valueForInput', valueForInput);
    this.set('balanceChangeData', this.get('balanceChange').getProperties('value', 'entryDate'))
  },

  formatData(value) {
    return accounting.formatMoney(value/100, "");
  },

  unformatData(value) {
    return Math.round(accounting.unformat(value)*100);;
  },

  valueForDate: Ember.computed('balanceChange.entryDate', {
    get(key) {
      return this.get('balanceChange.entryDate');
    }, set(key, value) {
      this.set('balanceChange.entryDate', moment().format("YYYY-MM-DD"));
      return value;
    }
  }),

  isNegative: Ember.computed('balanceChange.value', function() {
    return this.get('balanceChange.value') < 0;
  }),

  isValid: Ember.computed('balanceChange.value', 'isNegative', function() {
    return !this.get('isNegative') && this.get('balanceChange.value');
  }),

  isDisabled: Ember.computed('balanceChange.isSaving', 'isValid', function() {
    return this.get('balanceChange.isSaving') || !this.get('isValid');
  }),

  actions: {
    updateFormInput(value) {
      this.set('balanceChange.value', this.unformatData(value))
    }
  }
});
