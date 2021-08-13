import { populateDates } from '../helpers/calendar.js';
import { renderItems, createNewInvoice } from '../helpers/populate-edit-invoice-oninit.js';
import { formatter } from '../utils.js';
const checkEventPathForClass = (path, selector) => {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}
export const updateNewInvoice = (newInvoiceWrapper) => {
  let date = new Date(Date.now());

  // ------------------------------ Query Selectors ----------------------------------------------
  const datePickerElement = newInvoiceWrapper.querySelector('#date-picker');
  const selectedDateElement = newInvoiceWrapper.querySelector('#date-picker > .selected-date');
  const datesElement = newInvoiceWrapper.querySelector('#date-picker > .dates');
  const monthElement = newInvoiceWrapper.querySelector('#date-picker > .dates > .month > .month-input');
  const nextMonthElement = newInvoiceWrapper.querySelector('#date-picker > .dates > .month > .next-month');
  const prevMonthElement = newInvoiceWrapper.querySelector('#date-picker > .dates > .month > .prev-month');
  const daysElement = newInvoiceWrapper.querySelector('#date-picker .dates .days');
  const userSelectElement = newInvoiceWrapper.querySelector('#select');
  const selectElements = newInvoiceWrapper.querySelector('#select > .select__elements');
  const selectedElement = newInvoiceWrapper.querySelector('#select > .select__selected-item');
  const formElement = newInvoiceWrapper.querySelector('#edit-invoice-form');
  const invoiceItemsWrapper = newInvoiceWrapper.querySelector('#edit-invoice-form--item-list');
  const addNewItemButton = newInvoiceWrapper.querySelector('#add-new-item');
  const submitFormButton = newInvoiceWrapper.querySelector('#submit-form-button');
  const appRoot = document.querySelector('#app-root');
  
  // ------------------------------ Listener Functions ----------------------------------------------
  const getCurrentInvoiceItems = () => {
    const allItems = invoiceItemsWrapper.querySelectorAll('ul > li')
    const newItems = [];
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
    return newItems;
  }

  const invoiceItemsWrapperListener = (event) => {
    event.preventDefault();
    const path = event.path || (event.composedPath && event.composedPath());
    if (checkEventPathForClass(path, 'delete-button')) {
      const indexToDelete = Number(event.target.getAttribute('data-key'))
      const items = getCurrentInvoiceItems();
      items.splice(indexToDelete, 1);
      renderItems(items);
    }
  };

  const appRootListener =  (event) => {
    event.preventDefault();
    console.log('removing all listeners');
    formElement.removeEventListener('submit', formSubmitListener, false);
    invoiceItemsWrapper.removeEventListener('click', invoiceItemsWrapperListener, false);
    addNewItemButton.removeEventListener('click', addNewItemButtonListener, false);
    submitFormButton.removeEventListener('click', newInvoiceWrapperListener, false);
    datePickerElement.removeEventListener('click', datePickerElementListener, false);
    userSelectElement.removeEventListener('click', userSelectElementListener, false);
    prevMonthElement.removeEventListener('click',  prevMonthElementListener, false);
    nextMonthElement.removeEventListener('click',  nextMonthElementListener, false);
    selectElements.removeEventListener('click', selectElementsListener, false);
    daysElement.removeEventListener('click', daysElementListener, false);
    console.log('page-routing event listener');
  };

 

  const addNewItemButtonListener = (event) => {
    event.preventDefault();
    const allItems = getCurrentInvoiceItems();
    allItems.push({
      name: '',
      quantity: "",
      price: 0,
      total: 0,
    });
    renderItems(allItems)
  };

  const newInvoiceWrapperListener = (event) => {
    event.preventDefault();
    const element = document.querySelector('#edit-invoice-form')
    const formData = new FormData(element)
    const form = Array.from(formData.entries());
    console.log(form);
    createNewInvoice(form);
    // updateItemsInLocalStorage(form, data);
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

  const daysElementListener =  (event) => {
    let selectedDay = Number(event.target.innerHTML);
    let selectedYear = date.getFullYear();

    selectedDateElement.setAttribute('value', `${selectedDay} ${formatter.format(date)} ${selectedYear}`)
    selectedDateElement.value =  `${selectedDay} ${formatter.format(date)} ${selectedYear}`;
    datesElement.classList.toggle('active');
  }
  

  const userSelectElementListener = (event) => {
    event.preventDefault();
    if(datesElement.classList.contains('active')) {
      datesElement.classList.remove('active')
    }
    const path = event.path || (event.composedPath && event.composedPath());
    if (!checkEventPathForClass(path, 'select-elements')) {
      selectElements.classList.toggle('active');
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

  const formSubmitListener = e => e.preventDefault();
  const selectElementsListener = (event) => {
    Array.from(selectElements.children).forEach(child => {
      if(selectedElement.innerHTML === child.innerHTML) {
        child.classList.add('select__elements--selected');
      }
    })
    event.preventDefault()
    Array.from(selectElements.children).forEach(child => {
      if(event.target.innerHTML === child.innerHTML) {
        child.classList.add('select__elements--selected');
        selectedElement.setAttribute('value',event.target.innerHTML);
        selectedElement.value = event.target.innerHTML;
      } else {
        child.className = ''
      }
    })
  };
  
  // ----------------------------------------------------------------------------------------------
  appRoot.addEventListener('on-page-route-started', appRootListener,{
    capture: false,
    once: true
   });
  formElement.addEventListener('submit', formSubmitListener, false);
  invoiceItemsWrapper.addEventListener('click', invoiceItemsWrapperListener)
  addNewItemButton.addEventListener('click', addNewItemButtonListener, false);
  submitFormButton.addEventListener('click', newInvoiceWrapperListener, false);
  datePickerElement.addEventListener('click', datePickerElementListener, false);
  userSelectElement.addEventListener('click', userSelectElementListener, false);
  prevMonthElement.addEventListener('click',  prevMonthElementListener, false);
  nextMonthElement.addEventListener('click',  nextMonthElementListener, false);
  daysElement.addEventListener('click', daysElementListener, false);
  selectElements.addEventListener('click', selectElementsListener, false);

}

