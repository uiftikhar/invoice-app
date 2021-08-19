// DATA BINDING
import '../styles/styles.css'
import {
  updateEditInvoice,
} from './views/edit-invoice.js'
import {
  updateHome
} from './views/home.js';
import {
  updateViewInvoice,
} from './views/view-invoice.js';
import {
  updateNewInvoice,
} from './views/new-invoice.js';
import { Router } from './router.js';
import { Route } from './route.js';
import { loadData } from './loadData.js';
import { Observable } from './state/observable';
import { pipe, tap } from './state/operators';
import { Map } from './state/operators/map';
import { Rx } from './state/operators/namespace';
const toggleThemeButton = document.querySelector('#toggle-theme');
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');

(function () {
  loadData();
}());

(function () {
  function init() {
      new Router([
          new Route('home', 'home.html', true),            
          new Route('view-invoice', 'view-invoice.html'),
          new Route('edit-invoice', 'edit-invoice.html'),
          new Route('new-invoice', 'new-invoice.html')
      ]);
  }
  init();
}());


const obs = new Observable();
const mult2 = x => x * 100;
const filter = x => x > 0;
const toStr = x => `the number is ${x}`;
setTimeout(() => {
  console.log('time out done!');
  
}, 1000)
const _InvoiceWrapper = appRoot.querySelector('.theme--light');
console.log(_InvoiceWrapper);
const abc = obs.pipe(Rx.fromEvent(_InvoiceWrapper, 'click'));
abc.subscribe(console.log);


const appRootListener =  () => {
  const jsonData = JSON.parse(localStorage.getItem('data'));
  const InvoiceWrapper = appRoot.querySelector('#home');
  const viewInvoiceWrapper = appRoot.querySelector('#view-invoice');
  const editInvoiceWrapper = appRoot.querySelector('#edit-invoice');
  const newInvoiceWrapper = appRoot.querySelector('#create-new-invoice');
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
  if(jsonData && newInvoiceWrapper) {
    updateNewInvoice(newInvoiceWrapper);
    
    // const queryString = window.location.hash.split('?')[1];
    // const currentItem = jsonData.find(item => item.id === queryString);
    // updateEditInvoice(newInvoiceWrapper, currentItem)
  }
}

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
  if(isLightTheme) {
    body.classList.remove('theme--light');
    body.classList.add('theme--dark');
    img.setAttribute('src','./assets/icon-sun.svg')
  } else {
    body.classList.add('theme--light');
    body.classList.remove('theme--dark');
    img.setAttribute('src','./assets/icon-moon.svg')
  }
}
appRoot.addEventListener('page-loaded', appRootListener)
toggleThemeButton.addEventListener('click', toggleThemeButtonListener)
