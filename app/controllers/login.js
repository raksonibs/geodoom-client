import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    loginOauth() {
      this.send('login2');
    }
  }
});
