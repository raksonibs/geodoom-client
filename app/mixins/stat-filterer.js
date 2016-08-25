// jshint ignore: start
import Ember from 'ember';

export default Ember.Mixin.create({
  getName(name) {
    return this.get('stats').findBy('name', name).toJSON().value
  },
  percentFormer(num, denom) {
    return (num / denom * 100).toFixed(2);
  },
  stats: Ember.computed.alias('model'),
  test: Ember.computed('stats', function() {
    return this.get('stats').toArray().length
  }),
  test2: Ember.computed('stats.[]', function() {
    return this.get('stats').toArray().length
  }),
  test3: Ember.computed('model', function() {
    return this.get('stats').toArray().length
  }),
  wins: Ember.computed('stats', function() {
    // return this.get('stats').find((item) => item.toJSON().name === "total_wins").toJSON().value;
    return this.getName('total_wins');
  }),
  total: Ember.computed('wins', function() {
    return this.get('wins') * 2;
  }),
  deaths: Ember.computed('stats.[]', function() {
    // return this.get('stats').filter((item) => item.name === "total_deaths");
    // return this.get('stats').filterBy('name', 'total_wins')
    return this.getName('total_deaths');
  }),
  wins2: Ember.computed('stats', function() {
    // return this.get('stats').mapBy('name', 'value').find((item) => item === "total_wins");
    return 0;
  }),
  kills: Ember.computed('stats.[]', function() {
    return this.getName('total_kills');
  }),
  totalMoneyEarned: Ember.computed('stats.[]', function() {
    return this.getName('total_money_earned');
  }),
  totalShots: Ember.computed('stats.[]', function() {
    return this.getName('total_shots_fired');
  }),
  totalShotsHit: Ember.computed('stats.[]', function() {
    return this.getName('total_shots_hit');
  }),
  totalShotsMissed: Ember.computed('totalShots', 'totalShotsHit', function() {
    return (this.get('totalShots') - this.getName('total_shots_hit'));
  }),
  hitPercent: Ember.computed('totalShotsHit', 'totalShots', function() {
    return this.percentFormer(this.get('totalShotsHit'), this.get('totalShots'))
  }),
  winRatio: Ember.computed('wins', 'total', function() {
    return this.percentFormer(this.get('wins'), this.get('total'))
  }),
  kdRatio: Ember.computed('kills', 'deaths', function() {
    return this.percentFormer(this.get('kills'), this.get('deaths'))
  }),
});
// jshint ignore: end