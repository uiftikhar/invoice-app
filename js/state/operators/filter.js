import { Observable } from '../observable';

export function Filter(f) {
  const observable = new Observable();
  const func = f;
  return {
    subscribe: function (cb) {
      observable.subscribe(cb);
    },
    emit: function (x) {
      if (func(x)) {
        observable.emit(x);
      }
    },
  };
}
