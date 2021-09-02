import { Observable } from '../observable';

export function FromEvent(source, event) {
  return new Observable((observer) => {
    const listener = (e) => observer.onNext(e);

    source.addEventListener(event, listener, false);

    return {
      unsubscribe: () => {
        source.removeEventListener(event, listener, false);
        return observer.onCompleted();
      },
    };
  });
}
