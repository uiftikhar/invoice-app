import { Observable } from '../observable';

export function From(iterable) {
  return new Observable((observer) => {
    for (let item of iterable) {
      observer.onNext(item);
    }
    observer.onCompleted();

    return {
      unsubscribe: () => {
        observer = {
          onNext: () => {},
          onError: () => {},
          onCompleted: () => {},
        };
      },
    };
  });
}
