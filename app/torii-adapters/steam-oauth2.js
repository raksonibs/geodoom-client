import Ember from 'ember';

export default Ember.Object.extend({
  store: Ember.inject.service(), // inject the ember-data store
  session: Ember.inject.service(),
  authenticatedAjax: Ember.inject.service(),
  // The authorization argument passed in to `session.open` here is
  // the result of the `torii.open(providerName)` promise
  open: function() {
    // need to passssss user
    // var userId = authorization.user,
    // var store  = this.get('store');
    // var thisState = this;

    // return store.find('user', 3).then(function(user){
    //   // store.pushPayload(user);
    //   // pushing raw data into store
    //   // pushpayload noramlized the data by the serializer before pushing it into the store, and then we just peek at that store record
    //   // const user = this.store.peekRecord('user', user.data.id);
    //   thisState.set('session.currentUser', user);
    // });
  }
});