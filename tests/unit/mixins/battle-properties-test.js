import Ember from 'ember';
import BattlePropertiesMixin from 'red-green-client/mixins/battle-properties';
import { module, test } from 'qunit';

module('Unit | Mixin | battle properties');

// Replace this with your real tests.
test('it works', function(assert) {
  let BattlePropertiesObject = Ember.Object.extend(BattlePropertiesMixin);
  let subject = BattlePropertiesObject.create();
  assert.ok(subject);
});
