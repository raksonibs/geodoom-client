import Ember from 'ember';
import StatFilterer from 'red-green-client/mixins/stat-filterer';

export default Ember.Controller.extend(StatFilterer, {
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser')
});
