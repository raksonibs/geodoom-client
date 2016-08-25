// jshint ignore: start
import Ember from 'ember';

export default Ember.Mixin.create({
  balanceChanges: Ember.computed.alias('model'),
  expenses: Ember.computed('balanceChanges.[]', function() {
    return this.get('balanceChanges').filterBy('changeType', 'expense')
  }),
  incomes: Ember.computed('balanceChanges.[]', function() {
    // could i subtract the expense values and get them here
    return this.get('balanceChanges').filterBy('changeType', 'income')
  }),
  incomeValues: Ember.computed('incomes.[]', 'incomes.@each.value', function() {
    return this.get('incomes').mapBy('value');
  }),
  expenseValues: Ember.computed('expenses.[]', 'expenses.@each.value', function() {
    return this.get('expenses').mapBy('value');
  }),
  incomeSum: Ember.computed.sum('incomeValues'),
  expenseSum: Ember.computed.sum('expenseValues'),
  sumDifference: Ember.computed('incomeSum', 'expenseSum', function() {
    return this.get('incomeSum') - this.get('expenseSum')
  }),
  incomePercent: Ember.computed('incomeSum', 'expenseSum', function() {
    const sumBoth = this.get('incomeSum') + this.get('expenseSum')
    return this.get('incomeSum')* 100 / (sumBoth);
  }),
  expensePercent: Ember.computed('incomeSum', 'expenseSum', function() {
    const sumBoth = this.get('incomeSum') + this.get('expenseSum')
    return this.get('expenseSum')* 100 / (sumBoth);
  })
});
// jshint ignore: end