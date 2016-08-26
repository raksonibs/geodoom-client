import { money } from 'red-green-client/helpers/money';
import { module, test } from 'qunit';

module('Unit | Helper | money');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = money([4200, "$"]);
  assert.equal(result, "$42.00");
});
