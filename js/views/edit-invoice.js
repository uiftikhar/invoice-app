
import { populateUpdateInvoiceFormOnInit } from '../helpers/populate-edit-invoice-oninit.js'

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

  const datePickerElement = editInvoiceWrapper.querySelector('.date-picker');
  const selectedDateElement = editInvoiceWrapper.querySelector('.date-picker > .selected-date');
  const datesElement = editInvoiceWrapper.querySelector('.date-picker > .dates');
  const monthElement = editInvoiceWrapper.querySelector('.date-picker > .dates > .month > .mth');
  const nextMonthElement = editInvoiceWrapper.querySelector('.date-picker > .dates > .month > .next-month');
  const prevMonthElement = editInvoiceWrapper.querySelector('.date-picker > .dates > .month > .prev-month');
  const daysElement = editInvoiceWrapper.querySelector('.date-picker .dates .days');
  const userSelectElement = editInvoiceWrapper.querySelector('.select');
  const selectElements = editInvoiceWrapper.querySelector('.select > .select__elements');
  const selectedElement = editInvoiceWrapper.querySelector('.select > .select__selected-item');
  const formElement = editInvoiceWrapper.querySelector('#edit-invoice-form');

  formElement.addEventListener('submit', e => e.preventDefault());
  
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data);

	selectedDateElement.innerHTML = `${date.getDate()} ${formatter.format(date)} ${date.getFullYear()}`;
  if(data.paymentTerms === 1) {
    selectedElement.innerHTML = 'Net 1 Day';
  }
  if(data.paymentTerms === 7) {
    selectedElement.innerHTML = 'Net 7 Days';
  }
  if(data.paymentTerms === 14) {
    selectedElement.innerHTML = 'Net 14 Days';
  }
  if(data.paymentTerms === 30) {
    selectedElement.innerHTML = 'Net 30 Days';
  }
  editInvoiceWrapper.querySelector('#submit-form-button').addEventListener('click', (e) => {
    e.preventDefault();
    const element = document.querySelector('#edit-invoice-form')
    const data = new FormData(element)
    const form = Array.from(data.entries());
    console.log(form, selectedElement.dataset.value, selectedDateElement.dataset.value);
    // updateItemsInLocalStorage(form);
  });

  datePickerElement.addEventListener('click', (e) => {
    if (!checkEventPathForClass(e.path, 'dates')) {
      populateDates(datesElement, daysElement,selectedDateElement , monthElement, date);
      datesElement.classList.toggle('active');
    }
  })
  
  userSelectElement.addEventListener('click', (e) => {
    if (!checkEventPathForClass(e.path, 'select-elements')) {
      selectElements.classList.toggle('active');
      updateSelectedItem(selectElements, selectedElement);
    }
  })


  prevMonthElement.addEventListener('click',  (e) => {
    date = new Date(date.setMonth(date.getMonth()-1));
    monthElement.innerHTML = `${formatter.format(date)} ${date.getFullYear()}`;
    populateDates(datesElement, daysElement,selectedDateElement , monthElement, date, false);
  })
  nextMonthElement.addEventListener('click',  (e) => {
    date = new Date(date.setMonth(date.getMonth()+1));
    monthElement.innerHTML = `${formatter.format(date)} ${date.getFullYear()}`;
    populateDates(datesElement, daysElement,selectedDateElement , monthElement, date, false);
  })
}

