import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stat', 'Unit | Model | stat', {
  // Specify the other units that are required for this test.
  needs: ['model:pet']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
