import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['money-sliders'],
  wagerAmount: Ember.computed('wagerStart', 'wagerEnd', function() {
    return parseFloat((this.get('wagerEnd') - this.get('wagerStart')) * 2).toFixed(2);
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


    var slider = document.getElementById('ui-slider');

    noUiSlider.create(slider, {
      start: [this.get('wagerStart'), this.get('wagerEnd')],
      connect: true,
      range: {
        'min': this.get('wagerStart'),
        'max': this.get('wagerEnd')
      }
    });

    let thisState = this;

    slider.noUiSlider.on('change', function(args) {      
      thisState.set('wagerStart', parseFloat(args[0]));
      thisState.set('wagerEnd', parseFloat(args[1]));
      // should be wager amount and active carousel slide
      thisState.set('clickedAmount', thisState.get('wagerAmount'));
    });
  },

  actions: {
    changeClickedAmount(amount) {      
      this.set('clickedAmount', amount.target.textContent);
    }
  }
});
