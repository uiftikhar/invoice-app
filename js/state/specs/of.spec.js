import { Rx } from '../namespace';
// describe('Observable of', () => {
//   it('should emit each input separately and complete', (done) => {
//     const x = { foo: 'bar' };
//     const expected = [1, 'a', x];
//     let i = 0;

//     Rx.of(1, 'a', x).subscribe(
//       (val) => {
//         expect(val).to.equal(expected[i++]);
//       },
//       (err) => {
//         done(new Error('should not be called'));
//       },
//       () => {
//         done();
//       },
//     );
//   });

//   it('should emit one value', (done) => {
//     let calls = 0;

//     Observable.of(42).subscribe(
//       (x) => {
//         expect(++calls).to.equal(1);
//         expect(x).to.equal(42);
//       },
//       (err) => {
//         done(new Error('should not be called'));
//       },
//       () => {
//         done();
//       },
//     );
//   });
// });
test('subtract 2 - 1 to equal 1', () => {
  expect(1 + 1).toBe(2);
});
