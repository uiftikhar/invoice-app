import { Observable } from '../observable';

export function Map(projFn, subscribe) {
  return new Observable((observer) => {
    return subscribe(
      (val) => observer.onNext(projFn(val)),
      (e) => observer.onError(e),
      () => observer.onCompleted(),
    );
  });
}
