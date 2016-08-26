// jshint ignore: start
import Ember from 'ember';

const sessionStub = Ember.Service.extend({
  currentUser: {
    email: "oskar@gmail.com"
  },
  authenticate(argument) {
    return new Promise(function(resolve, reject) {
      console.log(argument);
      resolve(true);

      reject(false);
    });
  },
  open(argument) {
    this.authenticate(argument);
  }
});

export { sessionStub };
// jshint ignore: end