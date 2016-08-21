/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'red-green-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiNamespace: 'api/v1',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.serverURL = 'http://localhost:3000';
    ENV.contentSecurityPolicy = {
      "connect-src": "'self' ws://localhost:4000"
    }
    // ENV.serverURL = 'http://red-green-api.herokuapp.com';
  }


  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.serverURL = 'https://desolate-woodland-60847.herokuapp.com';
    ENV.contentSecurityPolicy = {
      "connect-src": "'self' ws://protected-garden-47773.herokuapp.com"
    }
  }

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'dashboard',
    routeIfAlreadyAuthenticated: 'dashboard'
  }

  ENV.torii = {
      // a 'session' property will be injected on routes and controllers
    sessionServiceName: 'sessionTorii',
    providers: {
      'steam': {
        apiKey:      'cat',
        redirectUri: "http://localhost:4200/oauth2callback"
      },
      'steam-oauth2': {
        apiKey:      'cat',
        redirectUri: "http://localhost:4200/oauth2callback"
      },
      'google-oauth2': {
        apiKey: "161580081432-v9mnjust9nhchrf30ri81mtbr8mecje3.apps.googleusercontent.com",
        redirectUri: "http://localhost:4200/oauth2callback"
      }
    }
  }

  ENV.apiBaseURL = ENV.serverURL + '/' + ENV.apiNamespace;

  return ENV;
};
