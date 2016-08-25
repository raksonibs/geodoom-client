import { test } from 'qunit';
import moduleForAcceptance from 'red-green-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | overview');

test('visiting /overview', function(assert) {
  // visit('/overview');

  andThen(function() {
    assert.equal(true, true);
  });
});
