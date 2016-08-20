import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  selectedPet: null,
  actions: {
    updateSelectedPet(value) {
      this.set('selectedPet', value);
    },

    startMatch() {
      this.get('model').set('status', "started");

      if (this.get('selectedPet') === null) {
        this.set('selectedPet', this.get('currentUser.pets').toArray().objectAt(0).toJSON().name);
      }

      // NEED TO GET ID OF PET VIA NAME> SHOULD BE UNIQUE ID

      if (this.get('model.challengedEmail') === this.get('currentUser.email')) {
        this.get('model').set('challengedPetId', this.get('selectedPet'));
      } else {
        this.get('model').set('challengerPetId', this.get('selectedPet'));
      }

      this.get('model').save().then((battle) => {
        this.transitionToRoute('dashboard.battles.battledome', battle);
        // this.refreshRoute();
      })
    }
  }
});
