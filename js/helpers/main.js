import { updateEditInvoice } from '../views/edit-invoice.js';
import { updateHome } from '../views/home.js';
import { updateNewInvoice } from '../views/new-invoice.js';
import { updateViewInvoice } from '../views/view-invoice.js';
import { loadData } from './utils/loadData.js';

const appRoot = document.querySelector('#app-root');

const activeContainer = () =>
  appRoot.querySelector('article').getAttribute('id');

const isSideDrawerOpen = () =>
  appRoot.querySelector('.side-drawer') &&
  appRoot
    .querySelector('.side-drawer')
    .classList.contains('side-drawer__is-opened');

const getActiveWrapper = () => appRoot.querySelector(`#${activeContainer()}`);

const queryString = () => window.location.hash.split('?')[1];

const currentItem = () => jsonData.find((item) => item.id === queryString());
let jsonData;
const setJsonData = async () => {
  jsonData = await loadData();
};

const updateAppRoot = (activeWrapper) => {
  const container = getActiveWrapper();
  const isSideNavOpen = isSideDrawerOpen();
  if (isSideNavOpen) {
    const _container = document.querySelector('.side-drawer > article');
    const activeWrapperId = _container.getAttribute('id');
    if (activeWrapperId === 'edit-invoice') {
      updateEditInvoice(_container, currentItem());
    } else if (activeWrapperId === 'create-new-invoice') {
      updateNewInvoice(_container);
    }
  } else {
    if (activeWrapper === 'home') {
      updateHome(container, jsonData);
    } else if (activeWrapper === 'view-invoice') {
      updateViewInvoice(container, currentItem());
    } else if (activeWrapper === 'create-new-invoice') {
      updateNewInvoice(container);
    } else if (activeWrapper === 'edit-invoice') {
      updateEditInvoice(container, currentItem());
    }
  }
};

const toggleThemeButtonListener = () => {
  const body = document.querySelector('body');
  const isLightTheme = body.classList.contains('theme--light');
  const img = document.querySelector('#toggle-theme > figure > img');
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

export {
  isSideDrawerOpen,
  updateAppRoot,
  toggleThemeButtonListener,
  activeContainer,
  setJsonData,
};
