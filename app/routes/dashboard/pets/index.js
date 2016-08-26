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
      var controller = this.controller.set('createPetModal', true);
      this.set('createPetModal', true);
      // this.refresh();
    },

    fullCreation(petName) {
      debugger
    }
  }
});
