// jshint ignore: start
export default Ember.Test.registerAsyncHelper('signup',
  function(app, assert, name) {
    visit("/signup")
    fillIn('#email', `oskar${Math.ceil(Math.random() * 10000)}@gmail.com`);
    fillIn('#password', 'password');
    click('button#signup');
  }
// jshint ignore: end