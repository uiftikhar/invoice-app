import { From, FromEvent, Of } from './operators';

export const Rx = {
  of: (...args) => new Of(...args),
  from: (iterable) => new From(iterable),
  fromEvent: (source, event) => new FromEvent(source, event),
};
