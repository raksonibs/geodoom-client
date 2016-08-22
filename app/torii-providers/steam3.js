import Provider from 'torii/providers/base';
import {configurable} from 'torii/configuration';
import QueryString from 'torii/lib/query-string';
import requiredProperty from 'torii/lib/required-property';
import randomUrlSafe from 'torii/lib/random-url-safe';

export default Ember.Object.extend({
  open: function(authentication) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';

    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    var state = result;

     var name        = 'steam',
        url         = 'http://localhost:3000/auth/steam',
        redirectUri = 'http://localhost:4200/oauth2callback',
        responseParams = ['code', 'state', 'user'],
        responseType = 'code',
        state = state,
        shouldCheckState = responseParams.indexOf('state') !== -1;

    debugger

    return this.get('popup').open(url, responseParams, options).then(function(authData){
      var missingResponseParams = [];
      
      debugger      

      return {
        authorizationCode: authData[responseType],
        provider: name,
        redirectUri: redirectUri
      };
    });
  }
});