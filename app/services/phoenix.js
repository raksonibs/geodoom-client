import Ember from 'ember';
import {Socket} from "../utils/phoenix";

export default Ember.Service.extend({
  isServiceFactory: true,
  socket() {
    let s = new Socket("ws://localhost:4000/socket");
    s.connect();
    return s;
  }
});
