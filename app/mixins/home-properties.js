import Ember from 'ember';

export default Ember.Mixin.create({
  petsCount: Ember.computed('pets', function() {
    return this.get('pets').length;
  }),
  battlesCount: Ember.computed('battles', function() {
    return this.get('battles').length;
  }),
  usersCount: Ember.computed('users', function() {
    return this.get('users').length;
  })
});
