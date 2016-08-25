// jshint ignore: start
import Ember from 'ember';
import accounting from 'accounting';
import moment from 'moment';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const valueForInput = this.get('balanceChange.value') ? this.get('balanceChange.value') : null
    this.set('valueForInput', valueForInput);
    this.set('balanceChangeData', this.get('balanceChange').getProperties('value', 'entryDate'))
  },

  actions: {
    updateFormInput(value) {
      this.set('balanceChange.value', value);
    }
  }
});
// jshint ignore: end