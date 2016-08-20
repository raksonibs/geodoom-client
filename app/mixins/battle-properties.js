import Ember from 'ember';
import moment from 'moment';

export default Ember.Mixin.create({
  battles: Ember.computed.alias('model'),
  session: Ember.inject.service(),
  wonBattles: Ember.computed('battles.[]', 'session', function() {
    return this.get('battles').filter((item, index) => {
      return item.get('winnerEmail') === this.get('session.currentUser.email')
    })
  }),
  lostBattles: Ember.computed('battles.[]', 'session', function() {
    return this.get('battles').filter((item, index) => {
      return item.get('loserEmail') === this.get('session.currentUser.email')
    })
  }),
  totalBattles: Ember.computed('wonBattles', 'lostBattles', function() {
    return this.get('wonBattles').length + this.get('lostBattles').length
  }),
  winPercent: Ember.computed('wonBattles', function() {
    return (this.get('wonBattles').length / this.get('totalBattles')) * 100;
  }),
  lossPercent: Ember.computed('lostBattles', function() {
    return (this.get('lostBattles').length / this.get('totalBattles')) * 100;
  }),
});
