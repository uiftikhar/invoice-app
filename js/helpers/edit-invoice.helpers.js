import {
  checkEventPathForClass,
  getCurrentInvoiceItems,
} from './new-invoice.helpers';
import {
  renderItems,
  updateItemsInLocalStorage,
} from './populate-edit-invoice-oninit';

export const editInvoiceSelectors = (editInvoiceWrapper) => {
  const datePickerElement = editInvoiceWrapper.querySelector('#date-picker');
  const selectedDateElement = editInvoiceWrapper.querySelector(
    '#date-picker > .selected-date',
  );
  const datesElement = editInvoiceWrapper.querySelector(
    '#date-picker > .dates',
  );
  const monthElement = editInvoiceWrapper.querySelector(
    '#date-picker > .dates > .month > .month-input',
  );
  const nextMonthElement = editInvoiceWrapper.querySelector(
    '#date-picker > .dates > .month > .next-month',
  );
  const prevMonthElement = editInvoiceWrapper.querySelector(
    '#date-picker > .dates > .month > .prev-month',
  );
  const daysElement = editInvoiceWrapper.querySelector(
    '#date-picker .dates .days',
  );
  const userSelectElement = editInvoiceWrapper.querySelector('#select');
  const selectElements = editInvoiceWrapper.querySelector(
    '#select > .select__elements',
  );
  const selectedElement = editInvoiceWrapper.querySelector(
    '#select > .select__selected-item',
  );
  const formElement = editInvoiceWrapper.querySelector('#edit-invoice-form');
  const invoiceItemsWrapper = editInvoiceWrapper.querySelector(
    '#edit-invoice-form--item-list',
  );
  const addNewItemButton = editInvoiceWrapper.querySelector('#add-new-item');
  const submitFormButton = editInvoiceWrapper.querySelector(
    '#submit-form-button',
  );
  const discardButton = editInvoiceWrapper.querySelector('#discard');
  const goBackButton = document.querySelector(
    '#edit-invoice > section.container__px > button.icon-button > a',
  );

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
    discardButton,
    goBackButton,
    appRoot,
  };
};

export const editInvoiceItemsWrapperListener = (event, data) => {
  event.preventDefault();
  const path = event.path || (event.composedPath && event.composedPath());
  if (checkEventPathForClass(path, 'delete-button')) {
    const indexToDelete = Number(event.target.getAttribute('data-key'));
    const currentData = JSON.parse(localStorage.getItem('data'));
    const items = currentData.find((item) => item.id === data.id).items;
    items.splice(indexToDelete, 1);
    renderItems(items);
    localStorage.setItem('data', JSON.stringify(currentData));
  }
};

export const addNewItemButtonEditInvoiceListener = (
  event,
  invoiceItemsWrapper,
  data,
) => {
  event.preventDefault();
  const allItems = getCurrentInvoiceItems(invoiceItemsWrapper);
  allItems.push({
    name: '',
    quantity: '',
    price: 0,
    total: 0,
  });
  renderItems(allItems);
  const currentData = JSON.parse(localStorage.getItem('data'));
  const currentItem = currentData.find((item) => item.id === data.id);
  currentItem.items = allItems;
  localStorage.setItem('data', JSON.stringify(currentData));
};

export const editInvoiceWrapperListener = (event, mediaQuery, data) => {
  event.preventDefault();
  const element = document.querySelector('#edit-invoice-form');
  const requiredFields = [...element.querySelectorAll('[required]')];

  const isFormInvalid = requiredFields.some(
    (field) => field.validity.valid === false,
  );
  if (!isFormInvalid) {
    const formData = new FormData(element);
    const form = Array.from(formData.entries());
    const allItems = getCurrentInvoiceItems(element);
    console.log(form, allItems);
    data.status = 'pending';
    updateItemsInLocalStorage(form, data, allItems);
    if (!mediaQuery.matches) {
      window.history.back();
    } else {
      const sideDrawer = document.querySelector('#edit-invoice-sidebar');
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
      // const event = new Event('page-loaded');
      // appRoot.dispatchEvent(event);
    }
  } else {
    // TODO: create a helper function?
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
