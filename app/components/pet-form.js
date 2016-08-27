import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createPetModal() {
      var name = this.get('name');
      this.get('fullCreationTest')(name);
    }
  }
});
