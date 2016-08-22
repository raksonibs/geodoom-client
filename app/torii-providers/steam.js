function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

export default Ember.Object.extend({
  open: function(authentication){
    return new Ember.RSVP.Promise(function(resolve, reject){
      var authorizationCode = 'cat';
      var authWindow = window.open('http://localhost:3000/auth/steam', '', 'left=20,top=20,width=400,height=300,toolbar=0,resizable=1');

      var url = 'http://localhost:3000/auth/steam';

      var xhr = createCORSRequest('GET', url);
      if (!xhr) {
        console.log('CORS not supported');
        return;
      }

      // Response handlers.
      xhr.onload = function() {
        var text = xhr.responseText;
        var title = getTitle(text);
        console.log('Response from CORS request to ' + url + ': ' + title);
      };

      xhr.onerror = function() {
        console.log('Woops, there was an error making the request.');
      };

      xhr.send();
      }).then(function(user){
      // The returned object is merged onto the session (basically). Here
      // you may also want to persist the new session with cookies or via
      // localStorage.
      return {
        currentUser: user
      };
    });
    
  }
});