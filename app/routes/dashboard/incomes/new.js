import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model(params, transition) {
    let entryDate = moment();
    if (transition.queryParams.period) {
      entryDate = moment(transition.queryParams.period + "-01");
    }

    return this.store.createRecord('balance-change', {
      changeType: 'income',
      entryDate: entryDate.format("YYYY-MM-DD")
    });
  },

  actions: {
    
  }
});
