import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      battle: this.store.createRecord('battle'),
      users: this.store.findAll('user')
    });
  },

  setupController(controller, models) {
    controller.set('battle', models.battle);
    controller.set('users', models.users);    
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
