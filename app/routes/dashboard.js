import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    period: {
      refreshModel: true
    }
  },
  model() {
    // return this.store.query('balance-change', { filter: { period: params.period } });
    return this.store.query('battle', {filter: {range: 'overview'}});
  },
  actions: {
    refreshRoute() {
      this.refresh(); //refreses model
    }
  }
});
