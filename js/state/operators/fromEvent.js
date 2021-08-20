import { Observable } from '../observable';

export function FromEvent(source, event) {
  return new Observable((observer) => {
    const listener = (e) => observer.onNext(e);

    source.addEventListener(event, listener);

    return {
      unsubscribe: () => {
        console.log('unsubscribing');
        return source.removeEventListener(event, listener);
      },
    };
  });
}
