import { rounderNum } from 'red-green-client/helpers/rounder-num';
import { module, test } from 'qunit';

module('Unit | Helper | rounder num');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = rounderNum([42.34112312]);
  assert.equal(result, 42.34);
});
