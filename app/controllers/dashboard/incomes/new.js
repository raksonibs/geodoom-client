import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save(balanceChange) {
      const thisState = this;
      this.get('model').setProperties(balanceChange.getProperties('value', 'entryDate'));
      this.get('model').save().then((balanceChange) => {
        thisState.transitionToRoute('dashboard.incomes');
        this.send('refreshRoute');
      })
    },
  }
});
