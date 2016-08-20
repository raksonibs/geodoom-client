import Ember from 'ember';
import moment from 'moment';

export function periodInWords(params/*, hash*/) {
  return moment(params[0]).format("MMMM YYYY");
}

export default Ember.Helper.helper(periodInWords);

// to acheive rload, set RefreshModel in queryParams hash for period query parameter and switch the this.store.findAll('balance-change') call to a this.store.query(). Use query() so can pass paramters to our API call, instead of just just whole index balance with findAll()