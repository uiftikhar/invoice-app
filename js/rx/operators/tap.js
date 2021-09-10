import { Observable } from '../observable';

export function Tap(func, subscribe) {
  return new Observable((observer) => {
    return subscribe(
      (val) => {
        func(val);
        observer.onNext(val);
      },
      (e) => observer.onError(e),
      () => observer.onCompleted(),
    );
  });
}
