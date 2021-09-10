import { formatCurrency, formatDate } from '../utils.js';
export const updateHome = (InvoiceWrapper, jsonData) => {
  const mediaQuery = window.matchMedia('(min-width: 640px)');
  const totalInvoicesElement = InvoiceWrapper.querySelector(
    'article > hgroup > h4',
  );
  const totalInvoices = jsonData.length;
  const cardsWrapperElement = InvoiceWrapper.querySelector('.cards');
  const newInvoiceButton = InvoiceWrapper.querySelector('#new-invoice');
  const sideDrawer = document.querySelector('#new-invoice-sidebar');
  const overlay = document.querySelector('#overlay');
  const appRoot = document.querySelector('#app-root');
  totalInvoicesElement.textContent = `${totalInvoices} invoices`;

  if (mediaQuery.matches) {
    totalInvoicesElement.textContent = `There are ${totalInvoices} total invoices`;
    newInvoiceButton.addEventListener('click', () => {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          sideDrawer.innerHTML = this.responseText;
          const event = new Event('page-loaded');
          sideDrawer.classList.add('side-drawer__is-opened');
          appRoot.dispatchEvent(event);
          overlay.classList.add('is-visible');
          document.querySelector('#app-root').classList.add('no-scroll');
        }
      };
      xhttp.open('GET', 'views/new-invoice.html', true);
      xhttp.send();
    });
  } else {
    newInvoiceButton.parentElement.setAttribute('href', `#new-invoice`);
  }
  let innerHtml = '';
  jsonData.forEach((item) => {
    let chip = '';
    if (item.status === 'paid') {
      chip = '<h4 class="chip chip__success bold">Paid</h4>';
    } else if (item.status === 'pending') {
      chip = '<h4 class="chip chip__warn bold">Pending</h4>';
    } else if (item.status === 'draft') {
      chip = '<h4 class="chip chip__draft bold">Draft</h4>';
    }

    if (!mediaQuery.matches) {
      innerHtml += `
      <a href="#view-invoice?${item.id}">
        <article class="card">
            <section class="card__invoice">
              <hgroup>
                <h4 class="card__invoice--id bold">${item.id.toUpperCase()}</h4>
                <h4 class="card__invoice--name">${item.clientName}</h4>
              </hgroup>
              <article>
                <hgroup>
                  <h4 class="card__invoice--due-date">${formatDate(
                    item.paymentDue,
                  )}</h4>
                  <h3 class="card__invoice--total">${formatCurrency(
                    item.total,
                  )}</h3>
                </hgroup>
                ${chip}
              </article>
            </section>
            </article>
        </a>
      `;
    } else {
      innerHtml += `
      <a href="#view-invoice?${item.id}">
        <article class="card">
            <section class="card__invoice">
                <h4 class="card__invoice--id bold">${item.id.toUpperCase()}</h4>
                <h4 class="card__invoice--name">${item.clientName}</h4>
                <h4 class="card__invoice--due-date">${formatDate(
                  item.paymentDue,
                )}</h4>
                <h3 class="card__invoice--total">${formatCurrency(
                  item.total,
                )}</h3>
                ${chip}
            </section>
            </article>
            </a>
        `;
    }
  });
  cardsWrapperElement.innerHTML = innerHtml;
};
