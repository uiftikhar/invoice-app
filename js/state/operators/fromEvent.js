import { Observable } from '../observable';

export function FromEvent(node, eventType) {
  const observable = new Observable();
  let listener;
  return {
    subscribe: function (cb) {
      listener = cb;
      observable.subscribe(cb);
    },
    emit: function () {
      node.addEventListener(eventType, listener, true);
      return observable;
    },
    unsubscribe: function () {
      node.removeEventListener(eventType, listener, true);
    },
    pipe: function (...obs) {
      return obs.reduce((acc, currObs) => {
        acc.subscribe((x) => currObs.emit(x));
        return currObs;
      }, this);
    },
  };
}
