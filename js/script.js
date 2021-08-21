// DATA BINDING
import '../styles/styles.css';
// needed polyfill for async await use
import regeneratorRuntime from 'regenerator-runtime';

import { loadData } from './loadData';
import { Route } from './route.js';
import { Router } from './router.js';
import { Rx } from './state/namespace';
import { updateEditInvoice } from './views/edit-invoice.js';
import { updateHome } from './views/home.js';
import { updateNewInvoice } from './views/new-invoice.js';
import { updateViewInvoice } from './views/view-invoice.js';

const toggleThemeButton = document.querySelector('#toggle-theme');
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');

function initRouter() {
  new Router([
    new Route('home', 'home.html', true),
    new Route('view-invoice', 'view-invoice.html'),
    new Route('edit-invoice', 'edit-invoice.html'),
    new Route('new-invoice', 'new-invoice.html'),
  ]);
}

const activeContainer = () =>
  appRoot.querySelector('article').getAttribute('id');

const isSideDrawerOpen = () =>
  appRoot
    .querySelector('.side-drawer')
    .classList.contains('side-drawer__is-opened');

const getActiveWrapper = () => appRoot.querySelector(`#${activeContainer()}`);

const queryString = () => window.location.hash.split('?')[1];

const currentItem = () => jsonData.find((item) => item.id === queryString());

const updateAppRoot = (activeWrapper, isSideDrawerOpen) => {
  const container = getActiveWrapper();
  if (isSideDrawerOpen) {
    if (activeWrapper === 'edit-invoice') {
      updateEditInvoice(container, currentItem());
    } else if (activeWrapper === 'new-invoice') {
      updateNewInvoice(container);
    }
  } else {
    if (activeWrapper === 'home') {
      updateHome(container, jsonData);
    } else if (activeWrapper === 'view-invoice') {
      updateViewInvoice(container, currentItem());
    }
  }
};

const toggleThemeButtonListener = () => {
  // This code assumes a Light Mode default
  // if (
  //   /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
  //   localStorage.getItem('color-mode') === 'dark' ||
  //   (window.matchMedia('(prefers-color-scheme: dark)').matches &&
  //   !localStorage.getItem('color-mode'))
  // ) {
  //   // if true, set the site to Dark Mode
  //   document.documentElement.setAttribute('color-mode', 'dark')
  // }

  const isLightTheme = body.classList.contains('theme--light');
  const img = toggleThemeButton.querySelector('figure > img');
  if (isLightTheme) {
    body.classList.remove('theme--light');
    body.classList.add('theme--dark');
    img.setAttribute('src', './assets/icon-sun.svg');
  } else {
    body.classList.add('theme--light');
    body.classList.remove('theme--dark');
    img.setAttribute('src', './assets/icon-moon.svg');
  }
};

toggleThemeButton.addEventListener('click', toggleThemeButtonListener);

let jsonData;
const onInit$ = Rx.fromEvent(window, 'load')
  .tap(async () => {
    initRouter();
    jsonData = JSON.parse(await loadData());
  })
  .mergeMap(() => Rx.fromEvent(appRoot, 'page-loaded'))
  // .tap(() => {
  //   updateAppRoot(activeContainer(), isSideDrawerOpen());
  // })
  .mergeMap(() => Rx.fromEvent(appRoot, 'click'))
  // .tap((event) => console.log(event))
  .subscribe(
    (event) => console.log(event),
    () => {},
  );
// ------------------------------------------------------------------------------
setTimeout(() => {
  console.log('timeout');
  const abc = onInit$.unsubscribe();
  console.log(abc);
}, 1500);
window.onunload = () => {
  // onInit$.unsubscribe();
};
// onInit$.emit(10);
// _onInit$.emit(10);
// appRoot$.emit(100);
