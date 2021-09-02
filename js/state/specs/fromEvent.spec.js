import { Rx } from '../namespace';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Observable FromEvent', () => {
  it('should emit values when event triggers on the source', (done) => {
    const {
      window: { MouseEvent, document },
    } = new JSDOM(`
    <!doctype html>
    <html>
      <body>
        <form>
          <button type="submit">
            <span>submit</span>
          </button>
        </form>
      </body>
    </html>
    `);

    const form = document.querySelector('form');
    const submit = document.querySelector('span');
    let calls = 0;

    const subscription = Rx.fromEvent(form, 'submit').subscribe((event) => {
      event.preventDefault();
      calls++;
      done();
    });

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    });
    submit.dispatchEvent(clickEvent);
    subscription.unsubscribe();
    expect(calls).toEqual(1);
  });
});
