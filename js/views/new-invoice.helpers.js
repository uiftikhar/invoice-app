import {
  createNewInvoice,
  renderItems,
} from '../helpers/populate-edit-invoice-oninit';
import { toggleSideDrawer } from '../helpers/side-drawer.helpers';

export const newInvoiceSelectors = (newInvoiceWrapper) => {
  const datePickerElement = newInvoiceWrapper.querySelector('#date-picker');
  const selectedDateElement = newInvoiceWrapper.querySelector(
    '#date-picker > .selected-date',
  );
  const datesElement = newInvoiceWrapper.querySelector('#date-picker > .dates');
  const monthElement = newInvoiceWrapper.querySelector(
    '#date-picker > .dates > .month > .month-input',
  );
  const nextMonthElement = newInvoiceWrapper.querySelector(
    '#date-picker > .dates > .month > .next-month',
  );
  const prevMonthElement = newInvoiceWrapper.querySelector(
    '#date-picker > .dates > .month > .prev-month',
  );
  const daysElement = newInvoiceWrapper.querySelector(
    '#date-picker .dates .days',
  );
  const userSelectElement = newInvoiceWrapper.querySelector('#select');
  const selectElements = newInvoiceWrapper.querySelector(
    '#select > .select__elements',
  );
  const selectedElement = newInvoiceWrapper.querySelector(
    '#select > .select__selected-item',
  );
  const formElement = newInvoiceWrapper.querySelector('#new-invoice-form');
  const invoiceItemsWrapper = newInvoiceWrapper.querySelector(
    '#edit-invoice-form--item-list',
  );
  const addNewItemButton = newInvoiceWrapper.querySelector('#add-new-item');
  const submitFormButton = newInvoiceWrapper.querySelector(
    '#submit-form-button',
  );
  const saveAsDraftButton = newInvoiceWrapper.querySelector(
    '#submit-form-button-draft',
  );
  const discardButton = newInvoiceWrapper.querySelector('#discard-new-invoice');
  const appRoot = document.querySelector('#app-root');

  return {
    datePickerElement,
    selectedDateElement,
    datesElement,
    monthElement,
    nextMonthElement,
    prevMonthElement,
    daysElement,
    userSelectElement,
    selectElements,
    selectedElement,
    formElement,
    invoiceItemsWrapper,
    addNewItemButton,
    submitFormButton,
    saveAsDraftButton,
    discardButton,
    appRoot,
  };
};

export const checkEventPathForClass = (path, selector) => {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
};

// ------------------------------ Listener Functions ----------------------------------------------
export const getCurrentInvoiceItems = (invoiceItemsWrapper) => {
  const allItems = invoiceItemsWrapper.querySelectorAll('ul > li');
  const newItems = [];
  allItems.forEach((item, index) => {
    const name = item.querySelector(`[name="${index}-item-list--name"]`).value;
    const quantity = Number(
      item
        .querySelector(`[name="${index}-item-list--quantity"]`)
        .value.replace(/[^0-9.-]+/g, ''),
    );
    const price = Number(
      item
        .querySelector(`[name="${index}-item-list--price"]`)
        .value.replace(/[^0-9.-]+/g, ''),
    );
    const total =
      quantity * price ||
      Number(
        item
          .querySelector(`[name="${index}-item-list--total"]`)
          .value.replace(/[^0-9.-]+/g, ''),
      );
    newItems.push({
      name,
      quantity,
      price,
      total,
    });
  });
  return newItems;
};

export const discardButtonListener = (event, mediaQuery) => {
  event.preventDefault();
  if (mediaQuery.matches) {
    toggleSideDrawer(true);
  } else {
    window.history.back();
  }
};

export const invoiceItemsWrapperListener = (event, invoiceWrapper) => {
  event.preventDefault();
  const path = event.path || (event.composedPath && event.composedPath());
  if (checkEventPathForClass(path, 'delete-button')) {
    const indexToDelete = Number(event.target.getAttribute('data-key'));
    const items = getCurrentInvoiceItems(invoiceWrapper);
    items.splice(indexToDelete, 1);
    renderItems(items);
  }
};

export const addNewItemButtonListener = (event, invoiceWrapper) => {
  event.preventDefault();
  const allItems = getCurrentInvoiceItems(invoiceWrapper);
  allItems.push({
    name: '',
    quantity: '',
    price: 0,
    total: 0,
  });
  renderItems(allItems);
};

export const newInvoiceWrapperListener = (event, mediaQuery) => {
  event.preventDefault();
  const element = document.querySelector('#new-invoice-form');
  const requiredFields = [...element.querySelectorAll('[required]')];

  const isFormInvalid = requiredFields.some(
    (field) => field.validity.valid === false,
  );
  if (!isFormInvalid) {
    const formData = new FormData(element);
    const form = Array.from(formData.entries());
    createNewInvoice(form);
    if (!mediaQuery.matches) {
      window.history.back();
    } else {
      const sideDrawer = document.querySelector('#new-invoice-sidebar');
      const overlay = document.querySelector('#overlay');
      if (sideDrawer.classList.contains('side-drawer__is-opened')) {
        sideDrawer.classList.remove('side-drawer__is-opened');
        // TODO: This is the slow way to remove HTML nodes. Use while loop instead
        sideDrawer.textContent = '';
      }
      if (overlay.classList.contains('is-visible')) {
        overlay.classList.remove('is-visible');
      }
      document.querySelector('#app-root').classList.remove('no-scroll');
    }
  } else {
    requiredFields.forEach((field) => {
      if (!field.validity.valid) {
        if (
          field.classList.contains('selected-date') ||
          field.classList.contains('select__selected-item')
        ) {
          field.parentElement.parentElement.classList.add('error');
        } else {
          field.parentElement.classList.add('error');
        }
      }
    });
    requiredFields[0].parentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
};

export const saveAsDraftButtonListener = (event, mediaQuery) => {
  event.preventDefault();
  const element = document.querySelector('#new-invoice-form');
  const formData = new FormData(element);
  const form = Array.from(formData.entries());
  createNewInvoice(form, true);
  if (!mediaQuery.matches) {
    window.history.back();
  } else {
    toggleSideDrawer(true);
  }
};

// ----------------------------------------------------------------------------------------------
