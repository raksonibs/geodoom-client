import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 3,
  session: Ember.inject.service(),
  model(params) {    
    return this.findPaged('pet', params);
  }
});
