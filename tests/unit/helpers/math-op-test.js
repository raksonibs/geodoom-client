import { mathOp } from 'red-green-client/helpers/math-op';
import { module, test } from 'qunit';

module('Unit | Helper | math op');

// Replace this with your real tests.
test('it adds correctly', function(assert) {
  let result = mathOp([1, 2, "+"]);
  assert.equal(result, 3.0);
});

test('it multiplies correctly', function(assert) {
  let result = mathOp([1, 2, "*"]);
  assert.equal(result, 2.00);
});

test('it divides correctly', function(assert) {
  let result = mathOp([1, 2, "/"]);
  assert.equal(result, 0.5);
});

test('it subtracts correctly', function(assert) {
  let result = mathOp([1, 2, "-"]);
  assert.equal(result, -1.0);
});