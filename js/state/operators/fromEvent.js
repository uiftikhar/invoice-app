import { Observable } from "../observable";

export function FromEvent(node, eventType) {
  const observable = new Observable();
  let listener;
  return {
    subscribe: function(cb) {
      observable.subscribe(cb)
    },
    emit: function() {
      listener = node.addEventListener(eventType, observable.emit.bind(observable), true);
      return observable;
    },
    unsubscribe: function(cb) {
      node.removeEventListener(eventType, cb, true)
    }
  }
}