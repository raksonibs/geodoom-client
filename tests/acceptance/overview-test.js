import { test } from 'qunit';
import moduleForAcceptance from 'red-green-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | overview');

test('visiting /dashboard/overview without Login', function(assert) {
  visit('/dashboard/overview');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    // assert.equal(true, true);
  });
});

test('visiting /dashboard/overview with Login when user does not exit', function(assert) {
  login(); 

  andThen(function() {
    assert.equal(currentURL(), '/dashboard/overview');
    assert.equal(find('div.linked-account').text(), "Your Steam account is linked");    
  });
});

// test('visiting /dashboard/overview when user signsup', function(assert) {
//   signup(); 

//   andThen(function() {
//     assert.equal(currentURL(), '/dashboard/overview');
//   });
// });
