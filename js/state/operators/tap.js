import { Observable } from '../observable';

export function Tap(f) {
  const observable = new Observable();
  const func = f;
  return {
    subscribe: function (cb) {
      observable.subscribe(cb);
    },
    emit: function (x) {
      func();
      observable.emit(x);
    },
  };
}
