// jshint ignore: start
import Ember from 'ember';

export default Ember.Service.extend({
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
// jshint ignore: end