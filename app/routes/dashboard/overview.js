import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  actions: {
    linkSteam() {
      var controller = this.controllerFor('login');

      // The provider name is passed to `open`
      this.get('sessionTorii').open('steam-oauth2').then(function() {
          // route.transitionTo('dashboard.overview');
          this.refresh();
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});
