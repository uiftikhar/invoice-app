const thrush = (x) => (f) => f(x);
const tap = (f) => (x) => {
  f(x);
  return x;
};
const pipe =
  (...fs) =>
  (x) =>
    fs.reduce((acc, currFunc) => currFunc(acc), x);

export { tap, thrush, pipe };
