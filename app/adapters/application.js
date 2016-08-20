import ENV from "../config/environment";
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  host: ENV.serverURL,
  namespace: ENV.apiNamespace,
  pathForType(type) {
    let underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  }
});
