import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitForm() {
      this.get('save')();
    },

    updateSelectedUser(value) {
      this.send('updateSelectedUser')(value);
    }
  }
});
