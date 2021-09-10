import { Observable } from '../observable';

export function Filter(predicateFn, subscribe) {
  return new Observable((observer) => {
    return subscribe(
      (val) => {
        if (predicateFn(val)) {
          observer.onNext(val);
        }
      },
      (e) => observer.onError(e),
      () => observer.onCompleted(),
    );
  });
}
