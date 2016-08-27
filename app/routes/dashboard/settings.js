import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    refresh() {
      this.refresh();
    }
  }
});
