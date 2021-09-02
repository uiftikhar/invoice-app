import { Rx } from '../namespace';

describe('Observable from', () => {
  it('should consume and complete', (done) => {
    const input = [1, 2, 3];
    const expected = [1, 2, 3];
    let count = 0;
    Rx.from(input).subscribe(
      (val) => {
        expect(val).toBe(expected[count++]);
      },
      (err) => {
        done(new Error(err));
      },
      () => {
        done();
      },
    );
  });
});
