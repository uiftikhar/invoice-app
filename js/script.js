// DATA BINDING
// https://dev.to/phoinixi/one-way-data-binding-in-vanilla-js-poc-4dj7

import {
  updateHome,
  updateViewInvoice,
  updateEditInvoice,
} from './helpers.js'
const toggleThemeButton = document.querySelector('#toggle-theme');
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');

const jsonData = JSON.parse(localStorage.getItem('data'));
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
  const InvoiceWrapper = appRoot.querySelector('#home');
  const viewInvoiceWrapper = appRoot.querySelector('#view-invoice');
  const editInvoiceWrapper = appRoot.querySelector('#edit-invoice');
  if(InvoiceWrapper) updateHome(InvoiceWrapper, jsonData);
  if(viewInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find(item => item.id === queryString);
    updateViewInvoice(viewInvoiceWrapper, currentItem);
  }
  if(editInvoiceWrapper) {
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
