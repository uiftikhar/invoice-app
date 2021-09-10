import {
  addNewItemButtonListener,
  discardButtonListener,
  invoiceItemsWrapperListener,
  newInvoiceSelectors,
  newInvoiceWrapperListener,
  saveAsDraftButtonListener,
} from './new-invoice.helpers.js';

import {
  datePickerElementListener,
  daysElementListener,
  nextMonthElementListener,
  prevMonthElementListener,
} from '../helpers/calendar.helpers';

import {
  selectElementsListener,
  userSelectElementListener,
} from '../helpers/dropdown-select.helpers';

import { Rx } from '../rx/namespace.js';

export const updateNewInvoice = (newInvoiceWrapper) => {
  const mediaQuery = window.matchMedia('(min-width: 640px)');

  // ------------------------------ Query Selectors ----------------------------------------------
  const {
    datePickerElement,
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
    datesElement,
    selectedDateElement,
    monthElement,
  } = newInvoiceSelectors(newInvoiceWrapper);

  if (!mediaQuery.matches) {
    discardButton.parentElement.setAttribute(
      'href',
      'javascript:history.go(-1)',
    );
  }

  let date = new Date(Date.now());
  const appRootListener = (event) => {
    event.preventDefault();
    unsubscribe.forEach((subscription$) => {
      subscription$.unsubscribe();
    });
  };

  appRoot.addEventListener('on-page-route-started', appRootListener, {
    capture: false,
    once: true,
  });

  const formSubmitListener = (e) => e.preventDefault();
  formElement.addEventListener('submit', formSubmitListener, false);
  const unsubscribe = [];
  const invoiceItems$ = Rx.fromEvent(invoiceItemsWrapper, 'click')
    .tap((event) => {
      invoiceItemsWrapperListener(event, invoiceItemsWrapper);
    })
    .subscribe(() => void 0);

  const addNewItems$ = Rx.fromEvent(addNewItemButton, 'click')
    .tap((event) => {
      addNewItemButtonListener(event, invoiceItemsWrapper);
    })
    .subscribe(() => void 0);

  const saveNewInvoice$ = Rx.fromEvent(submitFormButton, 'click')
    .tap((event) => {
      newInvoiceWrapperListener(event, mediaQuery);
      if (!mediaQuery.matches) {
        unsubscribe.forEach((subscription$) => {
          subscription$.unsubscribe();
        });
      }
    })
    .subscribe(() => void 0);

  const saveAsDraftButton$ = Rx.fromEvent(saveAsDraftButton, 'click')
    .tap((event) => {
      saveAsDraftButtonListener(event, mediaQuery);
      if (!mediaQuery.matches) {
        unsubscribe.forEach((subscription$) => {
          subscription$.unsubscribe();
        });
      }
    })
    .subscribe(() => void 0);

  const datePickerElement$ = Rx.fromEvent(datePickerElement, 'click')
    .tap((event) => {
      datePickerElementListener(
        event,
        selectElements,
        datesElement,
        daysElement,
        monthElement,
        date,
      );
    })
    .subscribe(() => void 0);

  const userSelectElement$ = Rx.fromEvent(userSelectElement, 'click')
    .tap((event) => {
      userSelectElementListener(event, datesElement, selectElements);
    })
    .subscribe(() => void 0);

  const prevMonthElement$ = Rx.fromEvent(prevMonthElement, 'click')
    .tap((event) => {
      prevMonthElementListener(event, date, monthElement, daysElement);
    })
    .subscribe(() => void 0);

  const nextMonthElement$ = Rx.fromEvent(nextMonthElement, 'click')
    .tap((event) => {
      nextMonthElementListener(event, date, monthElement, daysElement);
    })
    .subscribe(() => void 0);

  const daysElement$ = Rx.fromEvent(daysElement, 'click')
    .tap((event) => {
      daysElementListener(event, date, selectedDateElement, datesElement);
    })
    .subscribe(() => void 0);

  const selectElements$ = Rx.fromEvent(selectElements, 'click')
    .tap((event) => {
      selectElementsListener(event, selectElements, selectedElement);
    })
    .subscribe(() => void 0);

  const discardButton$ = Rx.fromEvent(discardButton, 'click')
    .tap((event) => {
      discardButtonListener(event, mediaQuery);
      unsubscribe.forEach((subscription$) => {
        subscription$.unsubscribe();
      });
    })
    .subscribe(() => void 0);

  unsubscribe.push(
    invoiceItems$,
    addNewItems$,
    saveNewInvoice$,
    saveAsDraftButton$,
    datePickerElement$,
    userSelectElement$,
    prevMonthElement$,
    nextMonthElement$,
    daysElement$,
    selectElements$,
    discardButton$,
  );
};
