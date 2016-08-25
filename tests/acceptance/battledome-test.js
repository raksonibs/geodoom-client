import { test } from 'qunit';
import moduleForAcceptance from 'red-green-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | battledome');

test('testing battledome creation and fighting path', function(assert) {  
  login(); 

  andThen(function() {
    assert.equal(currentURL(), '/dashboard/overview');
    assert.equal(find('div.linked-account').text(), "Your Steam account is linked");    
  });

  visit('/dashboard/battles');

  andThen(function() {
    assert.equal(currentURL(), '/dashboard/battles');
  });

  click('.14');

  andThen(function() {
    // already visited battle
    assert.equal(currentURL(), '/dashboard/battles/14/battledome');
    assert.equal(find('.modal-text').text().trim(), "This Battle is done!");
  });

  visit('/dashboard/battles');
  click('.new-battle');

  andThen(function() {
    // already visited battle
    assert.equal(currentURL(), '/dashboard/battles/new');    
  });
  
  fillIn('.select-opt', 'kacper@gmail.com');
  click('.submit');
  let num;

  andThen(function() {
    num = currentURL().match(/\d+/);
    assert.equal(currentURL(), '/dashboard/battles/' + num + '/show');
  });

  click('.start');
  andThen(function() {
    assert.equal(currentURL(), '/dashboard/battles/' + num + '/battledome');
  });
});
