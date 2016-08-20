export default function() { 
  this.transition(
    this.fromRoute('dashboard.expenses.index'),
    this.toRoute('dashboard.expenses.new'),
    this.use('toLeft'),
    this.reverse('toRight')
  ); 
  this.transition(
    this.fromRoute('dashboard.incomes.index'),
    this.toRoute('dashboard.incomes.new'),
    this.use('toLeft'),
    this.reverse('toRight')
  ); 
}