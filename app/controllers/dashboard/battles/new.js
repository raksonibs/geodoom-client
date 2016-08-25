import Ember from 'ember';

export default Ember.Controller.extend({
  selectedUser: null,
  session: Ember.inject.service(),
  actions: {
    updateSelectedUser(value) {
      this.set('selectedUser', value);
    },

    save() {
      const battle = this.get('battle');
      battle.set('challengedEmail', this.get('selectedUser'));

      battle.save({}).then((battle) => {
        this.transitionToRoute('dashboard.battles.show', battle);
        this.send('refreshRoute');
      });
    }
  }
});
