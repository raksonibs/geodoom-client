import Ember from 'ember';
import HomePropertiesMixin from 'red-green-client/mixins/home-properties';

export default Ember.Route.extend(HomePropertiesMixin, {
  model() {
    return Ember.RSVP.hash({
      battles: this.store.findAll('battle'),
      users: this.store.findAll('user'),
      pets: this.store.findAll('pet'),
    })
  },

  setupController(controller, models) {
    controller.set('battles', models.battles);
    controller.set('users', models.users);
    controller.set('pets', models.pets);
    // relationship not loading, hack
  },

});
