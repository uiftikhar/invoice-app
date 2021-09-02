import {
  formatCurrency,
  formatDate,
  getChip,
  getChipInnerHtml,
} from '../utils.js';

export const updateViewInvoice = (viewInvoiceWrapper, data) => {
  const mediaQuery = window.matchMedia('(min-width: 640px)');
  const appRoot = document.querySelector('#app-root');
  let listenersAttached = false;
  appRoot.addEventListener(
    'on-page-route-started',
    () => {
      viewInvoiceWrapper
        .querySelector('#redirect-to-edit-invoice')
        .removeEventListener('click', redirectToEditListener);
      viewInvoiceWrapper
        .querySelector('#mark-as-paid')
        .removeEventListener('click', markAsPaidButtonListener, false);
      deleteInvoiceButton.removeEventListener(
        'click',
        openDateInvoiceModalListener,
        false,
      );
      closeDeleteModalButton.removeEventListener(
        'click',
        closeDateModalListener,
        false,
      );
      confirmDeleteModalButton.removeEventListener(
        'click',
        confirmDeleteModalButtonListener,
        false,
      );
      observer.disconnect();
    },
    {
      capture: false,
      once: true,
    },
  );

  const statusWrapper = viewInvoiceWrapper.querySelector(
    '.view-invoice__status-wrapper > hgroup',
  );
  const detailsWrapper = viewInvoiceWrapper.querySelector(
    '.view-invoice__details-wrapper',
  );
  const invoiceItemsWrapper =
    viewInvoiceWrapper.querySelector('#invoice-items');
  const detailsHeaders = detailsWrapper.querySelectorAll(
    'section > h4, section > h2, hgroup > h4',
  );
  const detailsPaymentHeaders = detailsWrapper.querySelectorAll('hgroup > h3');
  const deleteInvoiceButton =
    viewInvoiceWrapper.querySelector('#delete-invoice');
  const closeDeleteModalButton = document.querySelector(
    '#modal > div > button:first-of-type',
  );
  const confirmDeleteModalButton = document.querySelector(
    '#modal > div > button:nth-of-type(2)',
  );
  const sideDrawer = document.querySelector('#edit-invoice-sidebar');
  const overlay = document.querySelector('#overlay');
  // ------------------------------------------------------------------------------------------------
  const redirectToEditListener = () => {
    if (!mediaQuery.matches) {
      viewInvoiceWrapper
        .querySelector('#redirect-to-edit-invoice')
        .setAttribute('href', `#edit-invoice?${data.id}`);
    } else {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          sideDrawer.innerHTML = this.responseText;
          const event = new Event('page-loaded');
          sideDrawer.classList.add('side-drawer__is-opened');
          overlay.classList.add('is-visible');
          document.querySelector('#app-root').classList.add('no-scroll');
          appRoot.dispatchEvent(event);
        }
      };
      xhttp.open('GET', 'views/edit-invoice.html', true);
      xhttp.send();
    }
  };

  const markAsPaidButtonListener = () => {
    data.status = 'paid';
    const prevChip = statusWrapper.querySelector('h4.chip');
    const status = statusWrapper.querySelector('h4:first-of-type');
    prevChip.parentElement.removeChild(prevChip);
    status.insertAdjacentHTML('afterend', getChip('paid'));
    viewInvoiceWrapper.querySelector('#mark-as-paid').disabled = true;

    // Update current data
    const currentData = JSON.parse(localStorage.getItem('data'));
    currentData.find((item) => item.id === data.id).status = 'paid';
    localStorage.setItem('data', JSON.stringify(currentData));
  };

  const openDateInvoiceModalListener = () => {
    overlay.classList.add('is-visible');
    document.querySelector('#modal').classList.add('is-visible');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    document.querySelector(
      '#modal > h4',
    ).innerHTML = `Are you sure you want to delete invoice #${data.id.toUpperCase()}? This action cannot be undone.`;
    document.querySelector('#app-root').classList.add('no-scroll');
  };

  const closeDateModalListener = () => {
    overlay.classList.remove('is-visible');
    document.querySelector('#modal').classList.remove('is-visible');
    document.querySelector('#app-root').classList.remove('no-scroll');
  };

  const confirmDeleteModalButtonListener = () => {
    const currentData = JSON.parse(localStorage.getItem('data'));
    const newData = currentData.filter((item) => item.id !== data.id);
    localStorage.setItem('data', JSON.stringify(newData));
    window.history.back();
  };
  // ------------------------------------------------------------------------------------------------
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };
  const statusWrapperButtonsMutationObserverListener = function (
    mutationsList,
  ) {
    for (const mutation of mutationsList) {
      // TODO Remove this
      if (!listenersAttached) {
        if (mutation.type === 'childList') {
          viewInvoiceWrapper
            .querySelector('#mark-as-paid')
            .addEventListener('click', markAsPaidButtonListener, {
              capture: false,
              once: true,
            });
          viewInvoiceWrapper
            .querySelector('#delete-invoice')
            .addEventListener('click', openDateInvoiceModalListener, false);
          data.status === 'paid'
            ? (viewInvoiceWrapper.querySelector(
                '#mark-as-paid',
              ).disabled = true)
            : void 0;
          viewInvoiceWrapper
            .querySelector('#redirect-to-edit-invoice')
            .addEventListener('click', redirectToEditListener);
        }
        listenersAttached = true;
      }
    }
  };

  // ------------------------------------------------------------------------------------------------
  const observer = new MutationObserver(
    statusWrapperButtonsMutationObserverListener,
  );
  closeDeleteModalButton.addEventListener(
    'click',
    closeDateModalListener,
    false,
  );
  confirmDeleteModalButton.addEventListener(
    'click',
    confirmDeleteModalButtonListener,
    false,
  );
  observer.observe(statusWrapper, config);
  // ------------------------------------------------------------------------------------------------

  statusWrapper.innerHTML = getChipInnerHtml(data.status, mediaQuery);
  detailsHeaders[0].innerHTML = data.id.toUpperCase();
  detailsHeaders[1].innerHTML = data.description;
  detailsHeaders[2].innerHTML = data.senderAddress.street;
  detailsHeaders[3].innerHTML = data.senderAddress.city;
  detailsHeaders[4].innerHTML = data.senderAddress.postCode;
  detailsHeaders[5].innerHTML = data.senderAddress.country;
  detailsHeaders[9].innerHTML = data.clientAddress.street;
  detailsHeaders[10].innerHTML = data.clientAddress.city;
  detailsHeaders[11].innerHTML = data.clientAddress.postCode;
  detailsHeaders[12].innerHTML = data.clientAddress.country;
  detailsHeaders[detailsHeaders.length - 1].innerHTML = `£ ${formatCurrency(
    data.total,
  )}`;
  detailsPaymentHeaders[0].innerHTML = formatDate(data.createdAt);
  detailsPaymentHeaders[1].innerHTML = formatDate(data.paymentDue);
  detailsPaymentHeaders[2].innerHTML = data.clientName;
  detailsPaymentHeaders[3].innerHTML = data.clientEmail;
  let items = '';
  if (!mediaQuery.matches) {
    data.items.forEach((item) => {
      items += `
      <section class="flex flex__jc-sb flex__ai-c only-for-mobile" >
        <hgroup>
          <h4 class="view-invoice__themed-heading">${item.name}</h4>
          <h4>${item.quantity} x £ ${formatCurrency(item.price)}</h4>
        </hgroup>
        <h4 class="view-invoice__themed-heading">£ ${formatCurrency(
          item.total,
        )}</h4>
      </section>
      `;
    });
  } else {
    items += `
      <h4 class="mb-1 div1">Item Name</h4>
      <h4 class="mb-1 div2">Qty</h4>
      <h4 class="mb-1 div3">Price</h4>
      <h4 class="mb-1 div4">Total</h4>
    `;
    data.items.forEach((item) => {
      items += `
        <h4 class="mb-1 view-invoice__themed-heading div1">${item.name}</h4>
        <h4 class="mb-1 div2">${item.quantity}</h4>
        <h4 class="mb-1 div3">£ ${formatCurrency(item.price)}</h4>
        <h4 class="mb-1 view-invoice__themed-heading div4">£ ${formatCurrency(
          item.total,
        )}</h4>
      `;
    });
  }
  invoiceItemsWrapper.innerHTML = items;
};
