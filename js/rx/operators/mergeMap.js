import { Observable } from '../observable';

export function MergeMap(otherObservable, subscribe) {
  return new Observable((observer) => {
    let innerSubscription;
    return subscribe(
      (val) => {
        innerSubscription = otherObservable(val).subscribe(
          (innerVal) => {
            return observer.onNext(innerVal);
          },
          (e) => observer.onError(e),
          () => {
            // innerSubscription?.unsubscribe();
            return observer.onCompleted();
          },
        );

        return innerSubscription;
      },
      (e) => observer.onError(e),
      () => {
        innerSubscription?.unsubscribe();
        return observer.onCompleted();
      },
    );
  });
}
