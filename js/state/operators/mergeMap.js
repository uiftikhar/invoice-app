import { Observable } from '../observable';

export function MergeMap(otherObservable, subscribe) {
  return new Observable((observer) => {
    console.log(observer);
    return subscribe(
      (val) => {
        return otherObservable(val).subscribe(
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
