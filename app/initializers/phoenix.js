export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('controller', 'phoenix', 'service:phoenix')
}

export default {
  name: 'socket',
  initialize
};
