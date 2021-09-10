import { Filter } from './operators/filter';
import { Map } from './operators/map';
import { MergeMap } from './operators/mergeMap';
import { Tap } from './operators/tap';

export function Observable(subscribe) {
  const _subscribe = subscribe;
  return {
    subscribe: function (onNext, onError, onCompleted) {
      if (typeof onNext === 'function') {
        return _subscribe({
          onNext: onNext,
          onError: onError || (() => {}),
          onCompleted: onCompleted || (() => {}),
        });
      } else {
        return _subscribe(onNext);
      }
    },
    map: function (projFn) {
      return new Map(projFn, this.subscribe);
    },
    tap: function (func) {
      return new Tap(func, this.subscribe);
    },
    filter: function (predicateFn) {
      return new Filter(predicateFn, this.subscribe);
    },
    mergeMap: function (otherObservable) {
      return new MergeMap(otherObservable, this.subscribe);
    },
  };
}
