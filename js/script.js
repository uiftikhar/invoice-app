import '../styles/styles.css';
// needed polyfill for async await use
import regeneratorRuntime from 'regenerator-runtime';

import { Rx } from './rx/namespace';

import { initRouter } from './router/routes';
import {
  activeContainer,
  setJsonData,
  toggleThemeButtonListener,
  updateAppRoot,
} from './helpers/main';

const toggleThemeButton = document.querySelector('#toggle-theme');
const appRoot = document.querySelector('#app-root');

let onInit$ = Rx.fromEvent(appRoot, 'page-loaded').tap(() => {
  updateAppRoot(activeContainer());
});

const toggleTheme$ = Rx.fromEvent(toggleThemeButton, 'click')
  .tap(() => toggleThemeButtonListener())
  .subscribe(() => void 0);

window.onload = async () => {
  await setJsonData();
  initRouter();
  onInit$ = onInit$.subscribe(() => void 0);
};

window.onunload = () => {
  onInit$.unsubscribe();
  toggleTheme$.unsubscribe();
};
