import { Observable } from '../observable';

export function Of(...args) {
  return new Observable((observer) => {
    args.forEach((val) => observer.onNext(val));
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
