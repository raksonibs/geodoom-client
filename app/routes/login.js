import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
// unathetnicated route makes it accesible to not logged in users and redirects them to routeifalreadyauthenticated if oggedin
export default Ember.Route.extend(UnauthenticatedRouteMixin, { 
  session: Ember.inject.service(),
  actions: {
    login(username, password) { 
      this.controller.set('isLoggingIn', true); 
      this.get('session').authenticate('authenticator:oauth2', username, password)
        .catch(() => this.controller.set('errorMessage', "Invalid login."))
        .finally(() => this.controller.set('isLoggingIn', false));
    }, 
    

    login2() {
      var route = this,
          controller = this.controllerFor('login');
      // The provider name is passed to `open`
      this.get('sessionTorii').open('steam-oauth2').then(function(){
        route.transitionTo('dashboard');
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});