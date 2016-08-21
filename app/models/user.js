import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import currencies from 'red-green-client/constants/currencies'

export default Model.extend({
  currency: attr('string'),
  email: attr('string'),
  email: attr('uid'),
  nickname: attr('nickname'),
  image: attr('image'),
  currencySymbol: Ember.computed('currency', function() {
    return currencies[this.get('currency')].symbol
  }),
  pets: hasMany('pet', {async: true}),
  battles: hasMany('battle', {async: true}),
  online: attr('boolean')
});
