import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  name: attr('string'),
  level: attr('number'),
  vertices: attr('number'),
  user: belongsTo('user', {async: true}),
  colour: attr('string'),
  stats: hasMany('stat', {async: true}),
  battles: hasMany('battle', {async: true}),
  petStates: hasMany('petState', {async: true}),
  items: attr(),
  remove: memberAction({ path: 'remove', type: 'post'}),
  suspend: memberAction({ path: 'suspend', type: 'patch' })
});
