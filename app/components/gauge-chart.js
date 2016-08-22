import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['gauge-chart', 'chart'],
  renderChart() {
    console.log(this.get('labelsPassed'));
    var data = {
      labels: JSON.parse(this.get('labelsPassed')),
      series: [this.get('two'), this.get('one')]
    };

    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,        
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {        
        chartPadding: 20
      }]
    ];

    new Chartist.Pie(`.${this.get('targetClass')}`, data, options, responsiveOptions);
  },
  didRender() {
    this.renderChart();
  }
});
