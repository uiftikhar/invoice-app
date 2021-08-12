export const populateUpdateInvoiceFormOnInit = (editInvoiceWrapper, data, date) => {
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const formatDate = (value) => {
    const date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${day} ${month} ${year}`;
  }
  const getPaymentTermsInnerHTM = (terms) => {
    let response = '';
    if(terms === 1) {
        response = 'Net 1 Day';
      }
      if(terms === 7) {
        response = 'Net 7 Days';
      }
      if(terms === 14) {
        response = 'Net 14 Days';
      }
      if(terms === 30) {
        response = 'Net 30 Days';
      }
      return response;
  }
  // const selectedDateElement = editInvoiceWrapper.querySelector('#date-picker > .selected-date');
  // selectedDateElement.dataset.value = new Date(data.paymentDue);
  // const selectedElement = editInvoiceWrapper.querySelector('#select > .select__selected-item');
  // selectedElement.dataset.value = data.paymentTerms;
	// selectedDateElement.innerHTML = `${date.getDate()} ${formatter.format(date)} ${date.getFullYear()}`;
  // if(data.paymentTerms === 1) {
  //   selectedElement.innerHTML = 'Net 1 Day';
  // }
  // if(data.paymentTerms === 7) {
  //   selectedElement.innerHTML = 'Net 7 Days';
  // }
  // if(data.paymentTerms === 14) {
  //   selectedElement.innerHTML = 'Net 14 Days';
  // }
  // if(data.paymentTerms === 30) {
  //   selectedElement.innerHTML = 'Net 30 Days';
  // }
  const formElements = editInvoiceWrapper.querySelectorAll('#edit-invoice-form input')
  formElements.forEach(item => {
    switch (item.name) {
      case 'bill-from--street_address':
        item.value = data.senderAddress.street;
        break;
      case 'bill-from--city':
        item.value = data.senderAddress.city;
        break;
      case 'bill-from--post_code':
        item.value = data.senderAddress.postCode;
        break;
      case 'bill-from--country':
        item.value = data.senderAddress.country;
        break;
      case 'bill-to--client-name':
        item.value = data.clientName;
        break;
      case 'bill-to--client-email':
        item.value = data.clientEmail;
        break;
      case 'bill-to--street_address':
        item.value = data.clientAddress.street;
        break;
      case 'bill-to--city':
        item.value = data.clientAddress.city;
        break;
      case 'bill-to--post_code':
        item.value = data.clientAddress.postCode;
        break;
      case 'bill-to--country':
        item.value = data.clientAddress.country;
        break;
      case 'payment-date':
        item.value = formatDate(data.paymentDue)
        item.setAttribute('value', data.paymentDue);
        break;
      case 'payment-terms':
        item.value = getPaymentTermsInnerHTM(data.paymentTerms)
        item.setAttribute('value', data.paymentTerms);
        break;
      default:
        break;
    }
  })

  renderItems(data.items);
}

export const renderItems = (items) => {
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 
  const itemsHTML = document.querySelector('#edit-invoice-form--item-list > ul');
  itemsHTML.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-key', index);
    li.innerHTML = `
    <div class="flex flex__col pb-1 w-100">
      <label>Item Name</label>
      <input type="text" name="item-list--name" value="${item.name}">
    </div>
    <div class="item-list-form__items--quantity">
      <label>Qty</label>
      <input type="text" name="item-list--quantity" value="${item.quantity}">
    </div>
    <div class="item-list-form__items--price">
      <label>Price</label>
      <input type="text" name="item-list--price" value="${formatCurrency(item.price)}">
    </div>
    <div class="item-list-form__items--total">
      <label>Total</label>
      <input readonly type="text" name="item-list--total" value="${formatCurrency(item.total)}">
    </div>
    <div class="flex flex__col flex__jc-end ml-auto">
      <button data-key=${index} class="icon-button icon-button__mini delete-button" >
        <figure>
          <img src="./assets/icon-delete.svg" alt="filters" />
        </figure>
      </button>
    </div>
    `
    itemsHTML.append(li)
  });
}

export const updateItemsInLocalStorage = (entries, id, terms, date) => {
  const currentInvoice = JSON.parse(localStorage.getItem('data')).find(item => item.id === id);

  console.log(entries,currentInvoice.items , terms, date);
  entries.forEach(item => {
    switch (item[0]) {
      case 'bill-from--street_address':
        break;
      case 'bill-from--city':
        break;
      case 'bill-from--post_code':
        break;
      case 'bill-from--country':
        break;
      case 'bill-to--client-name':
        break;
      case 'bill-to--client-email':
        break;
      case 'bill-to--street_address':
        break;
      case 'bill-to--city':
        break;
      case 'bill-to--post_code':
        break;
      case 'bill-to--country':
        break;
      case 'bill-to--invoice-date':
        break;
      case 'bill-to--terms':
        break;
      case 'bill-to--project':
        break;
      default:
        break;
    }
  })
};
