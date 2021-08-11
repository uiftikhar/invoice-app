export const updateHome = (InvoiceWrapper, jsonData) => {
  const formatDate = (value) => {
    const date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${day} ${month} ${year}`;
  }

  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 
  

  const totalInvoicesElement = InvoiceWrapper.querySelector('article > hgroup > h4')
  const totalInvoices = jsonData.length;
  const cardsWrapperElement = InvoiceWrapper.querySelector('.cards')
  totalInvoicesElement.innerHTML = `${totalInvoices} invoices`;
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
    innerHtml += `
      <article class="card">
        <a href="#view-invoice?${item.id}">
          <section class="card__invoice">
            <hgroup>
              <h4 class="card__invoice--id bold">${item.id}</h4>
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
  })
  cardsWrapperElement.innerHTML = innerHtml;
}