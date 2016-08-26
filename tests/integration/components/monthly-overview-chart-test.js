// jshint ignore: start
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import { sessionStub } from 'red-green-client/tests/helpers/stub-session';
import Ember from 'ember';
// jshint ignore: start
const sessionStub = Ember.Service.extend({
  currentUser: {
    email: "oskar@gmail.com"
  },
  authenticate(argument) {
    console.log(argument);
    return new Promise(function(resolve, reject) {
      resolve(true);

      reject(false);
    });
  },
  open(argument) {
    this.authenticate(argument);
  }
});
moduleForComponent('monthly-overview-chart', 'Integration | Component | monthly overview chart', {
  integration: true,
  beforeEach() {
    this.register('service:session', sessionStub);
    this.inject.service('session', { as: 'session'});
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('battles', [
    Ember.Object.create({
      winnerEmail: "oskar@gmail.com",
      loserEmail: "kacper@gmail.com",
      "createdAt": "2016-08-01"
    })
  ]);

  this.render(hbs`{{monthly-overview-chart
    battles=battles
  }}`);

  assert.equal(this.$('.monthly-overview-chart').text().trim(), '');
});
// jshint ignore: end