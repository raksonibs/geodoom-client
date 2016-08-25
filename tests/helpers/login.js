// jshint ignore: start
export default Ember.Test.registerAsyncHelper('login',
  function(app, assert, name) {
    visit("/login")
    fillIn('#email', 'oskar@gmail.com');
    fillIn('#password', '1234');
    click('button#login');
  }
);
// jshint ignore: end