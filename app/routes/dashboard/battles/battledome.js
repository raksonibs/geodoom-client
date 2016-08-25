import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      battle: this.store.findRecord('battle', params.battle_id),
      petStates: this.store.query('pet-state', {filter: {battle_id: params.battle_id}})
    });
  },

  setupController(controller, models) {
    controller.set('battle', models.battle);
    controller.set('petStates', models.petStates);
    // relationship not loading, hack
  },

  // afterModel() {
  //   this.refresh(); 
  // },

  actions: {
    refresh() {
      this.refresh();
    }
  }

});
