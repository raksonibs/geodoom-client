import Ember from 'ember';

export function rounderNum(params/*, hash*/) {
  return params[0].toFixed(2);
}

export default Ember.Helper.helper(rounderNum);
