import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['item-display'],
  tagName: 'div',
  actions: {
    destroy(item, pet) {
      Ember.$(`.item_${item.id}`)[0].style.display = 'none';
      this.get('destroy')(item, pet);
    }
  }
});
