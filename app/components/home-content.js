import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['home-content separate'],
  didInsertElement() {
    Ember.$('.test-slick').slick({      
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      adaptiveHeight: true
    });
        
  }
});
