import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model(params) {
    return this.store.findAll('pet');
  }
});
