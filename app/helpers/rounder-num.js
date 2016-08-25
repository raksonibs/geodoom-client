import Ember from 'ember';

export function rounderNum(params/*, hash*/) {
  if (params[0] !== undefined) {
    return params[0].toFixed(2);
  } 

  return params;
}

export default Ember.Helper.helper(rounderNum);
