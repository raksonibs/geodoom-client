// jshint ignore: start
export default Ember.Object.extend({
  open: function(authentication){
    return new Ember.RSVP.Promise(function(resolve, reject){
      var authorizationCode = 'cat';
      var authWindow = window.open('http://localhost:3000/auth/steam', '', 'left=20,top=20,width=400,height=300,toolbar=0,resizable=1');

      $.ajax({
            url: 'http://localhost:3000/auth/steam',
            type: "POST",
            data: {'redirect_uri': "http://localhost:4200/oauth2callback"},
            crossDomain: true,
            xhrFields: {withCredentials: true}
            /*Since it's a jsfiddle, the echo is only for demo purposes */
        })
        .done(function (data) {
            /* This is where the magic happens, we simply redirec the popup to the new authorize URL that we received from the server */
            authWindow.location.replace(data.url);
        })
        .always(function () {
            /* You can poll if the window got closed here, and so a refresh on the main page, or another AJAX call for example */
        });
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
// jshint ignore: end