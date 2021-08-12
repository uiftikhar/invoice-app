// DATA BINDING
// https://dev.to/phoinixi/one-way-data-binding-in-vanilla-js-poc-4dj7

import {
  updateEditInvoice,
} from './views/edit-invoice.js'
import {
  updateHome
} from './views/home.js';
import {
  updateViewInvoice,
} from './views/view-invoice.js';
const toggleThemeButton = document.querySelector('#toggle-theme');
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');

(function () {
  function init() {
      new Router([
          new Route('home', 'home.html', true),            
          new Route('view-invoice', 'view-invoice.html'),
          new Route('edit-invoice', 'edit-invoice.html')
      ]);
  }
  init();
}());


appRoot.addEventListener('page-loaded', () => {
  const jsonData = JSON.parse(localStorage.getItem('data'));

  const InvoiceWrapper = appRoot.querySelector('#home');
  const viewInvoiceWrapper = appRoot.querySelector('#view-invoice');
  const editInvoiceWrapper = appRoot.querySelector('#edit-invoice');
  if(jsonData && InvoiceWrapper) {
    updateHome(InvoiceWrapper, jsonData)
  };
  if(jsonData && viewInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find(item => item.id === queryString);
    updateViewInvoice(viewInvoiceWrapper, currentItem);
  }
  if(jsonData && editInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find(item => item.id === queryString);
    updateEditInvoice(editInvoiceWrapper, currentItem)
  }
})




toggleThemeButton.addEventListener('click', () => {
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
  if(isLightTheme) {
    body.classList.remove('theme--light');
    body.classList.add('theme--dark');
    img.setAttribute('src','./assets/icon-sun.svg')
  } else {
    body.classList.add('theme--light');
    body.classList.remove('theme--dark');
    img.setAttribute('src','./assets/icon-moon.svg')
  }
})
