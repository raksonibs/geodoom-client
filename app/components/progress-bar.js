import Ember from 'ember';

export default Ember.Component.extend({
  barStyle: Ember.computed('widthPercent', function() {
    const css = `width: ${this.get('widthPercent')}%`;
    return Ember.String.htmlSafe(css);
  }),

  didUpdateAttrs() {
    const css = `width: ${this.get('widthPercent')}%`;
    this.set('barStyle', Ember.String.htmlSafe(css));
  }
});
