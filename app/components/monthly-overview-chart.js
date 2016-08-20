import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  padWithZero(value) {
    if (String(value).length === 1) {
      return `0${value}`;
    } else {
      return value;
    }
  },

  getSeriesData() {
    const date = new Date();
    const battles = this.get('battles').toArray()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    let labels = [], wins =[], losses = [];

    for (let day =1; day <= daysInMonth; day++) {
      const dateString = `${year}-${this.padWithZero(month)}-${this.padWithZero(day)}`;
      const battlesForDay = battles.filterBy('createdAt', dateString);      
      const winsForDay = battlesForDay.filterBy('winnerEmail', this.get('session.currentUser.email')).length //.mapBy('value').reduce(((prev, curr) => prev + curr), 0);
      const lossesForDay = battlesForDay.filterBy('loserEmail', this.get('session.currentUser.email')).length //.mapBy('value').reduce(((prev, curr) => prev + curr), 0);

      labels.push(day);
      wins.push(winsForDay);
      losses.push(lossesForDay);
    }
    
    return { labels: labels, series: [losses, wins]}
  },

  renderChart() {
    const { labels, series } = this.getSeriesData();

    new Chartist.Bar('.monthly-overview-chart', {
      labels: labels,
      series: series
    }, {
      seriesBarDistance: 7,
      axisX: {
        offset: 60
      },
      axisY: {
        offset: 50,
        labelInterpolationFnc: (value) => {
          return `${value}`;
        },
        scaleMinSpace: 45
      }
    })
  },

  didRender() {
    this.renderChart();
  }
});
