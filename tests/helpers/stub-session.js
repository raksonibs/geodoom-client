import Ember from 'ember';

const sessionStub = Ember.Service.extend({
  currentUser: Ember.Object.create({
    email: "oskar@gmail.com"
  })
});

export default sessionStub;