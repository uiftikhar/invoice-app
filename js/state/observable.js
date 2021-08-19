import { tap, pipe, thrush } from "./operators";

export function Observable() {
  const cbs = [];
  return {
    subscribe: function(cb) {
      cbs.push(cb);
    },
    emit: function(x) {
      cbs.map(thrush(x));
    },
    pipe: function(...obs) {
      return obs.reduce((acc, currObs) => {
        // console.log(this);
        acc.subscribe(x => currObs.emit(x));
        return currObs;
      }, this)
    }
  }
}