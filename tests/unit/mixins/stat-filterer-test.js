import Ember from 'ember';
import StatFiltererMixin from 'red-green-client/mixins/stat-filterer';
import { module, test } from 'qunit';

module('Unit | Mixin | stat filterer');

// Replace this with your real tests.
test('it works', function(assert) {
  let StatFiltererObject = Ember.Object.extend(StatFiltererMixin);
  let subject = StatFiltererObject.create();
  assert.ok(subject);
});
