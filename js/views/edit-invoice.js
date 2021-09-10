import {
  addNewItemButtonEditInvoiceListener,
  editInvoiceItemsWrapperListener,
  editInvoiceSelectors,
  editInvoiceWrapperListener,
} from '../helpers/edit-invoice.helpers.js';
import {
  datePickerElementListener,
  daysElementListener,
  discardButtonListener,
  nextMonthElementListener,
  prevMonthElementListener,
  selectElementsListener,
  userSelectElementListener,
} from '../helpers/new-invoice.helpers.js';
import { populateUpdateInvoiceFormOnInit } from '../helpers/populate-edit-invoice-oninit.js';
import { Rx } from '../state/namespace.js';
import { formatDateSaveValue } from '../utils.js';

export const updateEditInvoice = (editInvoiceWrapper, data) => {
  const mediaQuery = window.matchMedia('(min-width: 640px)');
  let date =
    // TODO: fix the NAN issue
    data.paymentDue && !data.paymentDue.includes('NaN')
      ? new Date(data.paymentDue)
      : new Date(formatDateSaveValue(Date.now()));

  // ------------------------------ Query Selectors ----------------------------------------------
  const {
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
  } = editInvoiceSelectors(editInvoiceWrapper);

  if (mediaQuery.matches) {
    submitFormButton.innerHTML = 'Save Changes';
  } else {
    discardButton.parentElement.setAttribute(
      'href',
      'javascript:history.go(-1)',
    );
    goBackButton.setAttribute('href', 'javascript:history.go(-1)');
  }
  // ----------------------------------------------------------------------------------------------
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data);
  const formSubmitListener = (e) => e.preventDefault();
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

  formElement.addEventListener('submit', formSubmitListener, false);
  const unsubscribe = [];
  const invoiceItems$ = Rx.fromEvent(invoiceItemsWrapper, 'click')
    .tap((event) => {
      editInvoiceItemsWrapperListener(event, data);
    })
    .subscribe(() => void 0);

  const addNewItems$ = Rx.fromEvent(addNewItemButton, 'click')
    .tap((event) => {
      addNewItemButtonEditInvoiceListener(event, invoiceItemsWrapper, data);
    })
    .subscribe(() => void 0);

  const saveInvoice$ = Rx.fromEvent(submitFormButton, 'click')
    .tap((event) => {
      editInvoiceWrapperListener(event, mediaQuery, data);
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
      discardButtonListener(event, mediaQuery, true);
      unsubscribe.forEach((subscription$) => {
        subscription$.unsubscribe();
      });
    })
    .subscribe(() => void 0);

  unsubscribe.push(
    invoiceItems$,
    addNewItems$,
    saveInvoice$,
    datePickerElement$,
    userSelectElement$,
    prevMonthElement$,
    nextMonthElement$,
    daysElement$,
    selectElements$,
    discardButton$,
  );
};
