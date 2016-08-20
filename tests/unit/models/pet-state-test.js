import { moduleForModel, test } from 'ember-qunit';

moduleForModel('pet-state', 'Unit | Model | pet state', {
  // Specify the other units that are required for this test.
  needs: ['model:battle', 'model:pet']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
