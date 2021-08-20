import { Observable } from '../observable';

export function Tap(func, subscribe) {
  return new Observable((observer) => {
    let executed = false;
    return subscribe(
      (val) => {
        if (!executed) {
          func();
          executed = true;
        }
        observer.onNext(val);
      },
      (e) => observer.onError(e),
      () => observer.onCompleted(),
    );
  });
}
