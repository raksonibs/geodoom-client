import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Object.extend({
  store: Ember.inject.service(), // inject the ember-data store
  ajax: Ember.inject.service(),
  // The authorization argument passed in to `session.open` here is
  // the result of the `torii.open(providerName)` promise
  open: function(authorization) {
    // this should pass user that was authorized but does not! :(
    var thisState = this;
    console.log(`${ENV.apiBaseURL}/users/me`)
    return this.get('ajax').request(`${ENV.apiBaseURL}/users/me`).then(function(user) {      
      return thisState.get('store').find('user', user.data.id).then(function(user) {
        return {
          currentUser: user
        }
      })
    });
  }
});