import Ember from 'ember';
import StatFiltererMixin from 'red-green-client/mixins/stat-filterer';
import { module, test } from 'qunit';

let subject;
let StatFiltererObject;

module('Unit | Mixin | stat filterer', {
  beforeEach() {
    StatFiltererObject = Ember.Object.extend(StatFiltererMixin);
    subject = StatFiltererObject.create(); // store a reference to window.alert
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(subject);
});

test('it returns stats model with length for test', function(assert) {
  assert.expect(1);

  subject.set('stats', [
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_wins', 
                          value: 3
                        })
                      ]
              );

  assert.equal(subject.get('test'), 1);
});

test('it returns accurate data for remaning values', function(assert) {
  assert.expect(8);

  subject.set('stats', [
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_wins', 
                          value: 3
                        }),
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_deaths', 
                          value: 5
                        }),
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_kills', 
                          value: 10
                        }),
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_money_earned', 
                          value: 50
                        }),
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_shots_fired', 
                          value: 0
                        }),
                        Ember.Object.create({
                          user: 1, 
                          name: 'total_shots_hit', 
                          value: 0
                        })
                      ]
              );

  assert.equal(subject.get('deaths'), 5);
  assert.equal(subject.get('wins'), 3);
  assert.equal(subject.get('winRatio'), 50.00);
  assert.equal(subject.get('kdRatio'), 200.00);
  assert.equal(subject.get('totalShots'), 0);
  assert.equal(subject.get('totalShotsHit'), 0);
  assert.equal(subject.get('hitPercent'), 0);
  assert.equal(subject.get('totalMoneyEarned'), 50);
});
