import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('monthly-overview-chart', 'Integration | Component | monthly overview chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{monthly-overview-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#monthly-overview-chart}}
      template block text
    {{/monthly-overview-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
