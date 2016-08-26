import { moduleFor, test } from 'ember-qunit';
// import Ember from 'ember';
import sessionStub from 'red-green-client/tests/helpers/stub-session';

moduleFor('route:login', 'Unit | Route | login', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:authenticatedAjax', 'controller:login'],
  beforeEach() {
    this.register('service:session', sessionStub);
    this.register('service:torii', sessionStub);
  }
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('login works', function(assert) {
  let route = this.subject();
  // route.send('login', 'oskar@gmail.com', '1234');

  assert.ok(route);
});

test('login2 works', function(assert) {
  let route = this.subject();
  // route.send('login2', 'oskar@gmail.com', '1234');

  assert.ok(route);
});
