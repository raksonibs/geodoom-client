import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from "../config/environment";
const { service } = Ember.inject;

//sessionAuthetnicated is a method called by simpleauth's applicationroutemixin when user authenticated
export default Ember.Route.extend(ApplicationRouteMixin, { 
  session: service(),
  authenticatedAjax: service(),
  sessionAuthenticated() {
    this._super(...arguments);
    this.loadUser();
  },
  loadUser() {
    if (!this.get('session.isAuthenticated')) {
      return;
    }
    // return a promise, progression of route will be halted until it gets resolved
    // but since user data can load asynchronosuly with rest of the application, so don't return promise
    // this.store.findRecord('user', 'me').then( user => {
    //   this.set('session.currentUser', user);
    // })

    const url = `${ENV.apiBaseURL}/users/me`;
    const request = this.get('authenticatedAjax').request(url);

    request.then((userData) => {
      this.store.pushPayload(userData);
      // pushing raw data into store
      // pushpayload noramlized the data by the serializer before pushing it into the store, and then we just peek at that store record
      const user = this.store.peekRecord('user', userData.data.id);
      this.set('session.currentUser', user);
    });
  },
  beforeModel() {
    this.loadUser();
  }
});

