import Ember from 'ember';
import shapes from 'red-green-client/constants/shapes';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ["pet-picture"],
  shape: null,

  didUpdateAttrs() {
    this.set('shape', shapes[this.get('vertices')]["name"]);
  }
});
