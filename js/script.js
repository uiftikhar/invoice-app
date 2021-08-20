// DATA BINDING
import '../styles/styles.css';

import { Route } from './route.js';
import { Router } from './router.js';
import { Observable } from './state/observable';
import { updateEditInvoice } from './views/edit-invoice.js';
import { updateHome } from './views/home.js';
import { updateNewInvoice } from './views/new-invoice.js';
import { updateViewInvoice } from './views/view-invoice.js';
import { Rx } from './state/operators/namespace';
import { loadData } from './loadData';
const toggleThemeButton = document.querySelector('#toggle-theme');
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');

function init() {
  new Router([
    new Route('home', 'home.html', true),
    new Route('view-invoice', 'view-invoice.html'),
    new Route('edit-invoice', 'edit-invoice.html'),
    new Route('new-invoice', 'new-invoice.html'),
  ]);
}

const getData = () => JSON.parse(localStorage.getItem('data'));
const getWrappers = () => {
  const InvoiceWrapper = appRoot.querySelector('#home');
  const viewInvoiceWrapper = appRoot.querySelector('#view-invoice');
  const editInvoiceWrapper = appRoot.querySelector('#edit-invoice');
  const newInvoiceWrapper = appRoot.querySelector('#create-new-invoice');
  return [
    InvoiceWrapper,
    viewInvoiceWrapper,
    editInvoiceWrapper,
    newInvoiceWrapper,
  ];
};
const appRootListener = (temp) => {
  const jsonData = getData();

  const [
    InvoiceWrapper,
    viewInvoiceWrapper,
    editInvoiceWrapper,
    newInvoiceWrapper,
  ] = getWrappers();

  if (jsonData && InvoiceWrapper) {
    updateHome(InvoiceWrapper, jsonData);
  }

  if (jsonData && viewInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find((item) => item.id === queryString);
    updateViewInvoice(viewInvoiceWrapper, currentItem);
  }
  if (jsonData && editInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find((item) => item.id === queryString);
    updateEditInvoice(editInvoiceWrapper, currentItem);
  }
  if (jsonData && newInvoiceWrapper) {
    updateNewInvoice(newInvoiceWrapper);
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

// onInit$.pipe(Rx.filter((data) => data > 5)).subscribe(console.log);

// appRoot$.subscribe(appRootListener);
toggleThemeButton.addEventListener('click', toggleThemeButtonListener);
// window.onunload = () => {
//   onInit$.unsubscribe();
//   appRoot$.unsubscribe();
// };

// ------------------------------------------------------------------------------
Rx.of(1, 2, 3)
  .map((item) => item * 2)
  .tap(() => {
    console.log('Tapping');
  })
  .filter((item) => item > 5)
  .mergeMap((val) => {
    console.log(123);
    const newVal = val + 1;
    return Rx.of(newVal);
  })
  .subscribe((res) => {
    console.log(res);
  });
// ------------------------------------------------------------------------------
const onInit$ = Rx.fromEvent(window, 'load').subscribe(
  async () => {
    init();
    await loadData();
  },
  () => {},
);
// ------------------------------------------------------------------------------

setTimeout(() => {
  onInit$.unsubscribe();
}, 1500);
window.onunload = () => {};
// onInit$.emit(10);
// _onInit$.emit(10);
// appRoot$.emit(100);
