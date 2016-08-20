import { moduleForModel, test } from 'ember-qunit';

moduleForModel('state', 'Unit | Model | state', {
  // Specify the other units that are required for this test.
  needs: ['model:battle']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
