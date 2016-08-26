import { moduleFor, test } from 'ember-qunit';
import { sessionStub } from 'red-green-client/tests/helpers/stub-session';

moduleFor('controller:dashboard/settings', 'Unit | Controller | settings', {
  // Specify the other units that are required for this test.
  needs: ['service:session'],
  beforeEach() {
    // this.register('service:session', sessionStub);   
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it sets userData null', function(assert) {
  let controller = this.subject();
  assert.equal(typeof controller.get('userData'), "object");
});

test('it updates currency', function(assert) {
  let controller = this.subject();
  controller.send('updateCurrency', "EUR");

  assert.equal(controller.get('userData.currency', "EUR"), "EUR");
});

test('it updates email', function(assert) {
  let controller = this.subject();
  controller.send('updateEmail', "email");

  assert.equal(controller.get('userData.email', "email"), "email");
});

test('it saves attrs', function(assert) {
  let controller = this.subject();
  controller.send('updateCurrency', "EUR");
  controller.send('updateEmail', "email");

  // controller.send('save');
  assert.ok(controller);
});
