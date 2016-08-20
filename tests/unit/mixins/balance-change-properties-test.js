import Ember from 'ember';
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';
import { module, test } from 'qunit';

module('Unit | Mixin | balance change properties');

// Replace this with your real tests.
test('it works', function(assert) {
  let BalanceChangePropertiesObject = Ember.Object.extend(BalanceChangePropertiesMixin);
  let subject = BalanceChangePropertiesObject.create();
  assert.ok(subject);
});
