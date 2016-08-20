/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'bower_components/materialize/sass'
      ]
    }
  });

  app.import('vendor/chartist.js')
  app.import('vendor/chartist.css')
  app.import('vendor/slick.js')
  app.import('vendor/slick.css')
  app.import('vendor/slick-theme.css')

  return app.toTree();
};
