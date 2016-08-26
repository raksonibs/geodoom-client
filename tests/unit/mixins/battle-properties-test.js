import Ember from 'ember';
import BattlePropertiesMixin from 'red-green-client/mixins/battle-properties';
import { module, test } from 'qunit';
// import { sessionStub } from 'red-green-client/test/helpers/stub-session';

// const sessionStub = Ember.Service.extend({
//   currentUser: Ember.Object.create({
//     email: "oskar@gmail.com"
//   })
// });

var Owner = Ember.Object.extend(Ember._RegistryProxyMixin, Ember._ContainerProxyMixin);
var settings = settings || {};

let subject;
let BattlePropertiesObject;

module('Unit | Mixin | battle properties', {
  needs: [
    'service:session'
  ],

  beforeEach() {
    BattlePropertiesObject = Ember.Object.extend(BattlePropertiesMixin);
    subject = BattlePropertiesObject.create(); 
    this.registry = new Ember.Registry();

    this.owner = Owner.create({
        __registry__: this.registry
    });

    this.container = this.registry.container({
        owner: this.owner
    });

    this.owner.__container__ = this.container;

    if(typeof settings.beforeEach === 'function') {
        return settings.beforeEach.apply(this, arguments);
    }
  },

  afterEach() {
    this.container = null;
    this.registry = null;
    this.owner = null;
    if(typeof settings.afterEach === 'function') {
        return settings.afterEach.apply(this, arguments);
    }
  }
});

// Replace this with your real tests.
test('it works', function(assert) {  
  // this.registry.register('service:session', BattlePropertiesObject);
  // subject = this.container.lookup('service:session');
  assert.ok(subject);
});

test('it returns battle props', function(assert) {
  assert.expect(1);

  subject.set('battles', [
                        Ember.Object.create({
                          name: 'won', 
                          winnerEmail: "oskar@gmail.com",
                          loserEmail: "kacper@gmail.com"
                        }),
                        Ember.Object.create({
                          name: 'won', 
                          loserEmail: "oskar@gmail.com",
                          winnerEmail: "kacper@gmail.com"
                        })
                      ]
              );
  
  // should likely be an integration test!
  // this.registry.register('service:session', BattlePropertiesObject);
  // session = this.container.lookup('service:session');
  // // subject.set('currentUser', 'oskar@gmail.com');

  // assert.equal(subject.get('wonBattles'), 1);
  // assert.equal(subject.get('lostBattles'), 1);
  // assert.equal(subject.get('winPercent'), 50.00);
  assert.equal(subject.get('battles').length, 2);
});
