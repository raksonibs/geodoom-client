import Ember from 'ember';
// we tell ember computed is array and should recompute on changes
import BalanceChangePropertiesMixin from 'red-green-client/mixins/balance-change-properties';
import BattlePropertiesMixin from 'red-green-client/mixins/battle-properties';
// we are injecting a controller hre. 
// Injecting implies sharing. State sharing is the responsibility of services, where the shared state and structures should live in. If we live by these rules, the transition from controllers to routable components will be much easier when routable components land into Ember later this year.
export default Ember.Controller.extend(BalanceChangePropertiesMixin, BattlePropertiesMixin, {  
  dashboard: Ember.inject.controller(),
  session: Ember.inject.service(),  
  period: Ember.computed.alias('dashboard.period'),
  avgWinRatioPerDay: Ember.computed('wonBattles', function() {
    const date = new Date();    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    return (this.get('wonBattles').length/daysInMonth).toFixed(2);
  }),

  actions: {
    delete(balanceChange) {
      if (confirm("Are you sure?")) {
        balanceChange.destroyRecord().then(() => {
          this.send('refreshRoute')
        })
      }
    }
  }
});

// array.@each.objectProject means properuty should update when any propery named value of balanceChange record changes in collection