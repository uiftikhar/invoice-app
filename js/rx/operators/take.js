import { Observable } from '../observable';

export function Take(count, subscribe) {
  return new Observable((observer) => {
    let currentCount = 0;
    return subscribe(
      (val) => {
        if (currentCount < count) {
          observer.onNext(val);
          currentCount++;
        } else if (currentCount === count) {
          observer.onCompleted();
          currentCount++;
        }
      },
      (e) => observer.onError(e),
      () => observer.onCompleted(),
    );
  });
}
