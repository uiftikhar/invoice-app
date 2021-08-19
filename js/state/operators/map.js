import { Observable } from "../observable";

export function Map(f) {
  const observable = new Observable();
  const func = f;
  return {
    subscribe: function(cb) {
      observable.subscribe(cb)
    },
    emit: function(x) {
      observable.emit(func(x));
    }
  }
}