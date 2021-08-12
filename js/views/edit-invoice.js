
import { populateUpdateInvoiceFormOnInit, updateItemsInLocalStorage, renderItems } from '../helpers/populate-edit-invoice-oninit.js';
import { addToLocalStorage } from '../helpers.js';
import { updateSelectedItem } from '../helpers/select.js';
import { populateDates } from '../helpers/calendar.js';
export const updateEditInvoice = (editInvoiceWrapper, data) => {
  
  let date = new Date(data.paymentDue);
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

  const checkEventPathForClass = (path, selector) => {
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
    }
    return false;
  }

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
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data, date);
  formElement.addEventListener('submit', e => e.preventDefault());
  
  invoiceItemsWrapper.addEventListener('click', (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (checkEventPathForClass(path, 'delete-button')) {
      const indexToDelete = event.target.getAttribute('data-key');
      const currentData = JSON.parse(localStorage.getItem('data'));
      currentData.find(item => item.id === data.id).items.splice(indexToDelete, 1);
      addToLocalStorage(currentData,data.id);
    }
  })
  
  
  addNewItemButton.addEventListener('click', (e) => {
    // let runningTotal = 0;
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
    // const currentData = JSON.parse(localStorage.getItem('data'));
    // currentData.find(item => item.id === data.id).items = newItems;
    // currentData.find(item => item.id === data.id).total = runningTotal;
    // addToLocalStorage(currentData, data.id);
  })
  
  
  editInvoiceWrapper.querySelector('#submit-form-button').addEventListener('click', (e) => {
    e.preventDefault();
    const element = document.querySelector('#edit-invoice-form')
    const formData = new FormData(element)
    const form = Array.from(formData.entries());
    updateItemsInLocalStorage(form);
  });

  datePickerElement.addEventListener('click', (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if(selectElements.classList.contains('active')) {
      selectElements.classList.remove('active')
    }
    if (!checkEventPathForClass(path, 'dates')) {
      populateDates(datesElement, daysElement, selectedDateElement , monthElement, date);
      datesElement.classList.toggle('active');
    }
  })
  
  userSelectElement.addEventListener('click', (event) => {
    if(datesElement.classList.contains('active')) {
      datesElement.classList.remove('active')
    }
    const path = event.path || (event.composedPath && event.composedPath());
    if (!checkEventPathForClass(path, 'select-elements')) {
      selectElements.classList.toggle('active');
      updateSelectedItem(selectElements, selectedElement);
    }
  })

  prevMonthElement.addEventListener('click',  (e) => {
    date = new Date(date.setMonth(date.getMonth()-1));
    monthElement.setAttribute('value', `${formatter.format(date)} ${date.getFullYear()}`)
    populateDates(datesElement, daysElement,selectedDateElement , monthElement, date, false);
  })

  nextMonthElement.addEventListener('click',  (e) => {
    date = new Date(date.setMonth(date.getMonth()+1));
    monthElement.setAttribute('value', `${formatter.format(date)} ${date.getFullYear()}`)
    populateDates(datesElement, daysElement,selectedDateElement , monthElement, date, false);
  });
}

