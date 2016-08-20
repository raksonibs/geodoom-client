import Ember from 'ember';
import PhoenixInitializer from 'red-green-client/initializers/phoenix';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | phoenix', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  PhoenixInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
