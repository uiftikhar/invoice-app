import { Filter } from './filter';
import { FromEvent } from './fromEvent';
import { Map } from './map';

export const Rx = {
  map: (f) => new Map(f),
  filter: (f) => new Filter(f),
  fromEvent: (node, eventType) => new FromEvent(node, eventType),
};
