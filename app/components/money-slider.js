import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['money-sliders'],
  wagerAmount: Ember.computed('wagerStart', 'wagerEnd', function() {
    return (this.get('wagerEnd') - this.get('wagerStart')) * 2;
  }),
  clickedAmount: Ember.computed('wagerAmount', function() {
    return this.get('wagerAmount');
  }),

  didRender() {
    Ember.$('.money-containers').slick({      
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  },

  actions: {
    changeClickedAmount(amount) {
      debugger
      this.set('clickedAmount', amount);
    }
  }
});
