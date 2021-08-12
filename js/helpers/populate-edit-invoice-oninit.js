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
const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 


export const populateUpdateInvoiceFormOnInit = (editInvoiceWrapper, data, date) => {
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
  const itemsHTML = document.querySelector('#edit-invoice-form--item-list > ul');
  itemsHTML.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-key', index);
    li.innerHTML = `
    <div class="flex flex__col pb-1 w-100">
      <label>Item Name</label>
      <input type="text" name="${index}-item-list--name" value="${item.name}">
    </div>
    <div class="item-list-form__items--quantity">
      <label>Qty</label>
      <input type="text" name="${index}-item-list--quantity" value="${item.quantity}">
    </div>
    <div class="item-list-form__items--price">
      <label>Price</label>
      <input type="text" name="${index}-item-list--price" value="${formatCurrency(item.price)}">
    </div>
    <div class="item-list-form__items--total">
      <label>Total</label>
      <input class="disabled" type="text" name="${index}-item-list--total" value="${formatCurrency(item.total)}">
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

export const updateItemsInLocalStorage = (entries) => {
  let invoiceItems = [];
  entries.forEach(item => {
    console.log(item);
    if(item[0].includes('item-list--')) {
      let key = item[0].split('--')[1];
      let index = item[0][0];
      let value = key === 'name' ? item[1] : Number(item[1].replace(/[^0-9.-]+/g,""));
      let currentObj = invoiceItems[index];
      if(key === 'total') {
        value = invoiceItems[index]["quantity"] * invoiceItems[index]["price"] 
      }
      const obj = {
        [key]: value,
        ...currentObj
      }
      invoiceItems[index] = obj;
    }
    switch (item[0]) {
      case 'bill-from--street_address':
        console.log(item[0], item[1]);
        break;
      case 'bill-from--city':
        console.log(item[0], item[1]);
        break;
      case 'bill-from--post_code':
        console.log(item[0], item[1]);
        break;
      case 'bill-from--country':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--client-name':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--client-email':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--street_address':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--city':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--post_code':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--country':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--invoice-date':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--terms':
        console.log(item[0], item[1]);
        break;
      case 'bill-to--project':
        console.log(item[0], item[1]);
        break;
      case 'payment-terms':
        console.log(item[0], item[1]);
        break;
      case 'payment-date':
        console.log(item[0], item[1]);
        break;
      default:
        break;
    }
  })
  console.log(invoiceItems);
};
