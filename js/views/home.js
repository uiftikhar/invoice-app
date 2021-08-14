import { formatCurrency, formatDate } from '../utils.js'
export const updateHome = (InvoiceWrapper, jsonData) => {
  const mediaQuery = window.matchMedia( "(min-width: 640px)" );
  const totalInvoicesElement = InvoiceWrapper.querySelector('article > hgroup > h4')
  const totalInvoices = jsonData.length;
  const cardsWrapperElement = InvoiceWrapper.querySelector('.cards')
  totalInvoicesElement.innerHTML = `${totalInvoices} invoices`;
  if(mediaQuery.matches) {
    totalInvoicesElement.innerHTML = `There are ${totalInvoices} total invoices`;
  }
  let innerHtml = ''
  jsonData.forEach(item => {
    let chip = '';
    if(item.status === 'paid') {
      chip = '<h4 class="chip chip__success bold">Paid</h4>';
    } else if(item.status === 'pending') {
      chip = '<h4 class="chip chip__warn bold">Pending</h4>';
    } else if(item.status === 'draft') {
      chip = '<h4 class="chip chip__draft bold">Draft</h4>';
    }
    if(!mediaQuery.matches) {
      innerHtml += `
        <article class="card">
          <a href="#view-invoice?${item.id}">
            <section class="card__invoice">
              <hgroup>
                <h4 class="card__invoice--id bold">${item.id.toUpperCase()}</h4>
                <h4 class="card__invoice--name">${item.clientName}</h4>
              </hgroup>
              <article>
                <hgroup>
                  <h4 class="card__invoice--due-date">${formatDate(item.paymentDue)}</h4>
                  <h3 class="card__invoice--total">${formatCurrency(item.total)}</h3>
                </hgroup>
                ${chip}
              </article>
            </section>
          </a>
        </article>
      `
    } else {
      innerHtml += `
        <article class="card">
          <a href="#view-invoice?${item.id}">
            <section class="card__invoice">
                <h4 class="card__invoice--id bold">${item.id.toUpperCase()}</h4>
                <h4 class="card__invoice--name">${item.clientName}</h4>
                <h4 class="card__invoice--due-date">${formatDate(item.paymentDue)}</h4>
                <h3 class="card__invoice--total">${formatCurrency(item.total)}</h3>
                ${chip}
            </section>
          </a>
        </article>
        `
    }
  })
  cardsWrapperElement.innerHTML = innerHtml;
}