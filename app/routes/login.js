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
    } 
  }
});