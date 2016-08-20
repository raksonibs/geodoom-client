import Ember from 'ember';
// we tell ember computed is array and should recompute on changes
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';
// we are injecting a controller hre. 
// Injecting implies sharing. State sharing is the responsibility of services, where the shared state and structures should live in. If we live by these rules, the transition from controllers to routable components will be much easier when routable components land into Ember later this year.
export default Ember.Controller.extend(BalanceChangePropertiesMixin, {  
  session: Ember.inject.service()
});

// array.@each.objectProject means properuty should update when any propery named value of balanceChange record changes in collection