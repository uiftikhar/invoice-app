import { Rx } from '../namespace';

describe('Observable of', () => {
  it('should emit each input separately and complete', (done) => {
    const x = { foo: 'bar' };
    const expected = [1, 'a', x];
    let i = 0;

    Rx.of(1, 'a', x).subscribe(
      (val) => {
        expect(val).toBe(expected[i++]);
      },
      (err) => {
        done(new Error('should not be called'));
      },
      () => {
        done();
      },
    );
  });

  it('should emit one value', (done) => {
    let calls = 0;

    Rx.of(42).subscribe(
      (x) => {
        expect(++calls).toBe(1);
        expect(x).toBe(42);
      },
      (err) => {
        done(new Error('should not be called'));
      },
      () => {
        done();
      },
    );
  });
});
