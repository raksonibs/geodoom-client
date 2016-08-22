import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load() {
    var thisState = this;
    return new RSVP.Promise((resolve, reject) => {
      let userId = thisState.get('session.data.authenticated.user_id');
      
      if (!isEmpty(userId)) {
        return thisState.get('store').find('user', userId).then((user) => {
          thisState.set('user', user);
        }, reject);
      } else {
        resolve();
      }
    });
  }
});