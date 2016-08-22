import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  actions: {
    linkSteam() {
      var route = this,
          controller = this.controllerFor('login'),
          thisState = this;

      // The provider name is passed to `open`
      this.get('sessionTorii').open('steam-oauth2').then(function(user) {
          // route.transitionTo('dashboard.overview');
          this.refresh();
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});
