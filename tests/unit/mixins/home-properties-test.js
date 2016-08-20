import Ember from 'ember';
import HomePropertiesMixin from 'red-green-client/mixins/home-properties';
import { module, test } from 'qunit';

module('Unit | Mixin | home properties');

// Replace this with your real tests.
test('it works', function(assert) {
  let HomePropertiesObject = Ember.Object.extend(HomePropertiesMixin);
  let subject = HomePropertiesObject.create();
  assert.ok(subject);
});
