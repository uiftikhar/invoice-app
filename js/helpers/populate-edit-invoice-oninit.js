import { formatCurrency, formatDate, formatDateSaveValue, getPaymentTermsInnerHTML, getPaymentTermsValue  } from '../utils.js'

const idGen = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  ).substring(0,6);
}


export const populateUpdateInvoiceFormOnInit = (editInvoiceWrapper, data) => {
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
      case 'bill-to--project':
        item.value = data.description;
        break;
      case 'payment-date':
        item.value = formatDate(data.paymentDue)
        item.setAttribute('value', data.paymentDue);
        break;
      case 'payment-terms':
        item.value = getPaymentTermsInnerHTML(data.paymentTerms)
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
    <div class="flex flex__col pb-1 w-100 item-list-form__items--name">
      <label>Item Name</label>
      <input type="text" name="${index}-item-list--name" value="${item.name}">
    </div>
    <div class="item-list-form__items--quantity">
      <label>Qty</label>
      <input type="number" name="${index}-item-list--quantity" value="${item.quantity}">
    </div>
    <div class="item-list-form__items--price">
      <label>Price</label>
      <input type="number" name="${index}-item-list--price" value="${item.price}">
    </div>
    <div class="item-list-form__items--total">
      <label>Total</label>
      <input class="disabled" type="string" name="${index}-item-list--total" value="£ ${formatCurrency(item.total)}">
    </div>
    <div class="flex flex__col ml-auto">
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
export const createNewDataObject = (newInvoice = false) => {
  return {
    id: newInvoice ? idGen() : "",
    createdAt: newInvoice ? formatDateSaveValue(new Date(Date.now())) : "",
    paymentDue: "",
    description: "",
    paymentTerms: 1,
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    items: [],
    total: 0
  };
}

export const createNewInvoice = (entries, isDraft = false) => {
  const newItem = createNewDataObject(true);
  populateInvoice(newItem, entries, []);
  newItem.status = 'paid';
  if(isDraft) {
    newItem.status = 'draft';
  }
  newItem.paymentDue = '';
  const currentData = JSON.parse(localStorage.getItem('data'));
  currentData.push(newItem);
  localStorage.setItem('data', JSON.stringify(currentData));
}

export const updateItemsInLocalStorage = (entries, currentItem) => {
  let invoiceItems = [];
  const newItem = createNewDataObject();
  populateInvoice(newItem, entries, invoiceItems);
  let total = 0;
  invoiceItems.forEach(item => total += item.total);
  newItem.id = currentItem.id;
  newItem.status = currentItem.status;
  newItem.createdAt = currentItem.createdAt;
  newItem.items = invoiceItems;
  newItem.total = total;
  const currentData = JSON.parse(localStorage.getItem('data'));
  const indexToUpdate = currentData.findIndex(item => item.id === newItem.id);
  currentData[indexToUpdate] = newItem;
  localStorage.setItem('data', JSON.stringify(currentData));
};


const populateInvoice = (invoiceItem, entries, invoiceItems) => {
  entries.forEach(item => {
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
        invoiceItem.senderAddress.street = item[1];
        break;
      case 'bill-from--city':
        invoiceItem.senderAddress.city = item[1];
        break;
      case 'bill-from--post_code':
        invoiceItem.senderAddress.postCode = item[1];
        break;
      case 'bill-from--country':
        invoiceItem.senderAddress.country = item[1];
        break;
      case 'bill-to--client-name':
        invoiceItem.clientName = item[1];
        break;
      case 'bill-to--client-email':
        invoiceItem.clientEmail = item[1];
        break;
      case 'bill-to--street_address':
        invoiceItem.clientAddress.street = item[1];
        break;
      case 'bill-to--city':
        invoiceItem.clientAddress.city = item[1];
        break;
      case 'bill-to--post_code':
        invoiceItem.clientAddress.postCode = item[1];
        break;
      case 'bill-to--country':
        invoiceItem.clientAddress.country = item[1];
        break;
      case 'bill-to--project':
        invoiceItem.description = item[1];
        break;
      case 'payment-terms':
        invoiceItem.paymentTerms = getPaymentTermsValue(item[1]);
        break;
      case 'payment-date':
        invoiceItem.paymentDue = formatDateSaveValue(item[1]);
        break;
      default:
        break;
    }
  });
}