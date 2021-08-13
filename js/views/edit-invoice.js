
import { populateUpdateInvoiceFormOnInit, updateItemsInLocalStorage, renderItems } from '../helpers/populate-edit-invoice-oninit.js';
import { updateSelectedItem } from '../helpers/select.js';
import { populateDates } from '../helpers/calendar.js';
const eventListeners = [];
const checkEventPathForClass = (path, selector) => {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}
const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
export const updateEditInvoice = (editInvoiceWrapper, data) => {
  let date = new Date(data.paymentDue);

  // ------------------------------ Query Selectors ----------------------------------------------
  const datePickerElement = editInvoiceWrapper.querySelector('#date-picker');
  const selectedDateElement = editInvoiceWrapper.querySelector('#date-picker > .selected-date');
  const datesElement = editInvoiceWrapper.querySelector('#date-picker > .dates');
  const monthElement = editInvoiceWrapper.querySelector('#date-picker > .dates > .month > .month-input');
  const nextMonthElement = editInvoiceWrapper.querySelector('#date-picker > .dates > .month > .next-month');
  const prevMonthElement = editInvoiceWrapper.querySelector('#date-picker > .dates > .month > .prev-month');
  const daysElement = editInvoiceWrapper.querySelector('#date-picker .dates .days');
  const userSelectElement = editInvoiceWrapper.querySelector('#select');
  const selectElements = editInvoiceWrapper.querySelector('#select > .select__elements');
  const selectedElement = editInvoiceWrapper.querySelector('#select > .select__selected-item');
  const formElement = editInvoiceWrapper.querySelector('#edit-invoice-form');
  const invoiceItemsWrapper = editInvoiceWrapper.querySelector('#edit-invoice-form--item-list');
  const addNewItemButton = editInvoiceWrapper.querySelector('#add-new-item');
  const submitFormButton = editInvoiceWrapper.querySelector('#submit-form-button');
  const appRoot = document.querySelector('#app-root');
  
  // ------------------------------ Listener Functions ----------------------------------------------
  const invoiceItemsWrapperListener = (event) => {
    event.preventDefault();
    const path = event.path || (event.composedPath && event.composedPath());
    if (checkEventPathForClass(path, 'delete-button')) {
      const indexToDelete = event.target.getAttribute('data-key');
      const currentData = JSON.parse(localStorage.getItem('data'));
      currentData.find(item => item.id === data.id).items.splice(indexToDelete, 1);
      renderItems(currentData.find(item => item.id === data.id).items);
    }
  };

  const appRootListener =  (event) => {
    event.preventDefault();
    formElement.removeEventListener('submit', e => e.preventDefault());
    invoiceItemsWrapper.removeEventListener('click', invoiceItemsWrapperListener)
    addNewItemButton.removeEventListener('click', addNewItemButtonListener)
    submitFormButton.removeEventListener('click', editInvoiceWrapperListener);
    datePickerElement.removeEventListener('click', datePickerElementListener)
    userSelectElement.removeEventListener('click', userSelectElementListener)
    prevMonthElement.removeEventListener('click',  prevMonthElementListener)
    nextMonthElement.removeEventListener('click',  nextMonthElementListener);
    
    console.log('page-routing event listener');
  };

  const addNewItemButtonListener = (event) => {
    event.preventDefault();
    const allItems = invoiceItemsWrapper.querySelectorAll('ul > li')
    let newItems = [];
    allItems.forEach((item, index) => {
      const name = item.querySelector(`[name="${index}-item-list--name"]`).value;
      const quantity = Number(item.querySelector(`[name="${index}-item-list--quantity"]`).value.replace(/[^0-9.-]+/g,""));
      const price = Number(item.querySelector(`[name="${index}-item-list--price"]`).value.replace(/[^0-9.-]+/g,""))
      const total = (quantity * price )||Number(item.querySelector(`[name="${index}-item-list--total"]`).value.replace(/[^0-9.-]+/g,""));
      newItems.push({
        name,
        quantity,
        price,
        total,
      });
    })
    newItems.push({
      name: '',
      quantity: "",
      price: 0,
      total: 0,
    });
    renderItems(newItems)
  };

  const editInvoiceWrapperListener = (event) => {
    event.preventDefault();
    const element = document.querySelector('#edit-invoice-form')
    const formData = new FormData(element)
    const form = Array.from(formData.entries());
    updateItemsInLocalStorage(form);
  };

  const datePickerElementListener = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if(selectElements.classList.contains('active')) {
      selectElements.classList.remove('active')
    }
    if (!checkEventPathForClass(path, 'dates')) {
      event.preventDefault();
      populateDates(daysElement, monthElement, date);
      datesElement.classList.toggle('active');
    }
  }

  

  const userSelectElementListener = (event) => {
    event.preventDefault();
    if(datesElement.classList.contains('active')) {
      datesElement.classList.remove('active')
    }
    const path = event.path || (event.composedPath && event.composedPath());
    if (!checkEventPathForClass(path, 'select-elements')) {
      selectElements.classList.toggle('active');
      updateSelectedItem(selectElements, selectedElement);
    }
  };

  const prevMonthElementListener = (event) => {
    event.preventDefault();
    date = new Date(date.setMonth(date.getMonth()-1));
    monthElement.setAttribute('value', `${formatter.format(date)} ${date.getFullYear()}`)
    populateDates(daysElement, monthElement, date, false);
  };

  const nextMonthElementListener = (event) => {
    event.preventDefault();
    date = new Date(date.setMonth(date.getMonth()+1));
    monthElement.setAttribute('value', `${formatter.format(date)} ${date.getFullYear()}`)
    populateDates(daysElement, monthElement, date, false);
  }
  
  daysElement.addEventListener('click', function (event) {
    let selectedDay = Number(event.target.innerHTML);
    let selectedYear = date.getFullYear();


    selectedDateElement.setAttribute('value', `${selectedDay} ${formatter.format(date)} ${selectedYear}`)
    selectedDateElement.value =  `${selectedDay} ${formatter.format(date)} ${selectedYear}`;
    datesElement.classList.toggle('active');
  });

  // ----------------------------------------------------------------------------------------------
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data, date);
  appRoot.addEventListener('on-page-route-started', appRootListener, {
    capture: false,
    once: true
  })
  formElement.addEventListener('submit', e => e.preventDefault());
  invoiceItemsWrapper.addEventListener('click', invoiceItemsWrapperListener)
  addNewItemButton.addEventListener('click', addNewItemButtonListener)
  submitFormButton.addEventListener('click', editInvoiceWrapperListener);
  datePickerElement.addEventListener('click', datePickerElementListener)
  userSelectElement.addEventListener('click', userSelectElementListener)
  prevMonthElement.addEventListener('click',  prevMonthElementListener)
  nextMonthElement.addEventListener('click',  nextMonthElementListener);
}

