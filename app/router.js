import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('dashboard', { path: '/dashboard' }, function() {
    this.route('overview');
    this.route('incomes', function() {
      this.route('new');
      this.route('edit', { path: ':balance_change_id/edit'});
    });
    this.route('expenses', function() {
      this.route('new');
      this.route('edit', { path: ':balance_change_id/edit'});
    });
    this.route('settings');
    this.route('battles', function() {
      this.route('new');
      this.route('show', {path: ':battle_id/show'});
      this.route('battledome', {path: ':battle_id/battledome'});
      this.route('pet-states');
    });
    this.route('pets');
    this.route('stats');
  });
  this.route('logout');
  this.route('home', { path: '/'});
});

export default Router;
