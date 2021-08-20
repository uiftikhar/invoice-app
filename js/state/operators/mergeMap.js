import { Observable } from '../observable';

export function MergeMap(otherObservable, subscribe) {
  return new Observable((observer) => {
    return subscribe(
      (val) => {
        otherObservable(val).subscribe(
          (val) => {
            observer.onNext(val);
          },
          (e) => observer.onError(e),
          () => observer.onCompleted(),
        );
      },
      (e) => observer.onError(e),
      () => observer.onCompleted(),
    );
  });
}
