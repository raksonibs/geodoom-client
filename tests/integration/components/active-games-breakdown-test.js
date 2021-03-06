import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('active-games-breakdown', 'Integration | Component | active games breakdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{active-games-breakdown}}`);

  assert.equal(this.$().text().trim(), '');

  this.set('text', "Recent Games Played");

  // Template block usage:
  this.render(hbs`
    {{#active-games-breakdown}}
      text='Recent Games Played'
    {{/active-games-breakdown}}
  `);

  assert.equal(this.$('.earned-text').text().trim(), "");
});
