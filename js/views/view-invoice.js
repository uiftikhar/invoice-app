
export const updateViewInvoice = (viewInvoiceWrapper, data) => {
  const appRoot = document.querySelector('#app-root');
  appRoot.addEventListener('on-page-route-started', () => {
    console.log('on-page-route-started:view');
  }, {
    capture: false,
    once: true
  })
  const formatDate = (value) => {
    const date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${day} ${month} ${year}`;
  }

  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 
  
  let chip = ''
  if(data.status === 'paid') {
    chip = `
      <h4>Status</h4>
      <h4 class="chip chip__success bold">Paid</h4>
    `;
  } else if(data.status === 'pending') {
    chip = `
      <h4>Status</h4>
      <h4 class="chip chip__warn bold">Pending</h4>
    `;
  } else if(data.status === 'draft') {
    chip = `
    <h4>Status</h4>
    <h4 class="chip chip__draft bold">Draft</h4>
    `;
  }
  const statusWrapper = viewInvoiceWrapper.querySelector('.view-invoice__status-wrapper > hgroup');
  const detailsWrapper = viewInvoiceWrapper.querySelector('.view-invoice__details-wrapper');
  const invoiceItemsWrapper = viewInvoiceWrapper.querySelector('#invoice-items');
  const redirectToEdit = viewInvoiceWrapper.querySelector('#redirect-to-edit-invoice');
  
  const detailsHeaders = detailsWrapper.querySelectorAll('section > h4, section > h2, hgroup > h4');
  const detailsPaymentHeaders = detailsWrapper.querySelectorAll('hgroup > h3');
  
  redirectToEdit.addEventListener('click', () => {
    redirectToEdit.setAttribute('href',`#edit-invoice?${data.id}`)
  })

  statusWrapper.innerHTML = chip;
  detailsHeaders[0].innerHTML = data.id;
  detailsHeaders[1].innerHTML = data.description;
  detailsHeaders[2].innerHTML = data.senderAddress.street;
  detailsHeaders[3].innerHTML = data.senderAddress.city;
  detailsHeaders[4].innerHTML = data.senderAddress.postCode;
  detailsHeaders[5].innerHTML = data.senderAddress.country;
  detailsHeaders[9].innerHTML =  data.clientAddress.street;
  detailsHeaders[10].innerHTML = data.clientAddress.city;
  detailsHeaders[11].innerHTML = data.clientAddress.postCode;
  detailsHeaders[12].innerHTML = data.clientAddress.country;
  detailsHeaders[detailsHeaders.length - 1].innerHTML = `£ ${formatCurrency(data.total)}`;
  detailsPaymentHeaders[0].innerHTML = formatDate(data.createdAt);
  detailsPaymentHeaders[1].innerHTML = formatDate(data.paymentDue);
  detailsPaymentHeaders[2].innerHTML = data.clientName;
  detailsPaymentHeaders[3].innerHTML = data.clientEmail;
  let items = '';
  data.items.forEach(item => {
    items += `
    <section class="flex flex__jc-sb flex__ai-c">
      <hgroup>
        <h4 class="view-invoice__themed-heading">${item.name}</h4>
        <h4>${item.quantity} x £ ${formatCurrency(item.price)}</h4>
      </hgroup>
      <h4 class="view-invoice__themed-heading">£ ${formatCurrency(item.total)}</h4>
    </section>
    `
  })
  invoiceItemsWrapper.innerHTML = items;
}
