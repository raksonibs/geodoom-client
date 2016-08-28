import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 3,
  session: Ember.inject.service(),
  model(params) {    
    return this.findPaged('pet', params);
  },
  createPetModal: false,
  actions: {
    createPet() {
      this.controller.set('createPetModal', true);
      this.set('createPetModal', true);
      // this.refresh();
    },

    fullCreation(petName) {
      const store = this.store;
      let pet;

      pet = store.createRecord('pet', {
        name: petName
      });

      this.controller.set('name', '');

      pet.save();
      this.controller.set('createPetModal', false);
      this.refresh();
    },

    removeItem(item, pet) {
      // neeed pet!
      pet.remove({ item: item }).then(response => {
        console.log('destroyed!', response);
        // this.refresh();
      });

    }
  }
});
