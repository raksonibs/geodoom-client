import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['active-games-breakdown'],
  renderChart() {
    let labelsSet = [1,2,3,4,5,6,7,8,9,10];
    let wins = labelsSet.map((label) => { return label * 2})
    let losses = labelsSet.map((label) => { return label * 3})
    const { labels, series } = { labels: labelsSet.map((item) => {return `${item}`}), series: [wins, losses]}

    new Chartist.Line('.breakdown', {
      labels: labels,
      series: series,
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
  },
  didRender() {
    this.renderChart()
  }
});
