import { From } from './from';
import { FromEvent } from './fromEvent';
import { Of } from './of';

export const Rx = {
  of: (...args) => new Of(...args),
  from: (iterable) => new From(iterable),
  fromEvent: (source, event) => new FromEvent(source, event),
};
