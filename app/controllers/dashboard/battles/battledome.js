// jshint ignore: start
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  state: Ember.computed.alias('battle.state'),
  winnerFound: Ember.computed('battle.status', function() {
    return this.get('battle.status') === "completed";
  }),
  notWinnerFound: Ember.computed.not('winnerFound'),
  messages: [],
  channel: null,
  pets: null,
  init() {
    let socket = this.get('phoenix').socket();  
    let room = socket.channel("room:lobby", {});
    this.set('channel', room);
    room.join().receive("ok", () => {
      console.log("Welcome to Phoenix Chat!");
    });
    room.on("new:message", msg => this.renderMessage(msg) );
    room.on("new:refresh", msg => this.refreshModel(msg) );
    room.on("new:error", msg => console.log(msg) );
    room.on("new:winner", msg => this.refreshModel(msg) );

    this.set('pets', this.get('battle.pets'));
  },
  renderMessage: function (msg) {
    this.messages.pushObject(msg.body);
  },
  refreshModel: function (msg) {
    this.send('refresh');
  },
  actions: {
    sendMessage(event) {
      let val = this.get('newMessage');
      
      this.get('channel').push("new:message", {
                                                body: this.get('battle'),
                                                action: event,
                                                currentUser: this.get('session.currentUser')
                                              }
                                            )
      this.set('newMessage', null);
      // event.preventDefault();
      return false;
    }
  },
  
});

// jshint ignore: end