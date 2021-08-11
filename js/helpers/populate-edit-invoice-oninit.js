export const populateUpdateInvoiceFormOnInit = (editInvoiceWrapper, data) => {
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 

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
      default:
        break;
    }
  })
  const itemListWrapper = editInvoiceWrapper.querySelector('#edit-invoice-form--item-list')
  let items = `
    <h2>Item List</h2>
  `;
  data.items.forEach(item => {
    items += `
    <div class="flex flex__col pb-1">
      <label>Item Name</label>
      <input type="text" name="item-list--name" value="${item.name}">
    </div>
    <div class="item-list-form__items">
      <div class="flex flex__col item-list-form__items--quantity">
        <label>Qty</label>
        <input type="text" name="item-list--quantity" value="${item.quantity}">
      </div>
      <div class="flex flex__col item-list-form__items--price">
        <label>Price</label>
        <input type="text" name="item-list--price" value="${formatCurrency(item.price)}">
      </div>
      <div class="flex flex__col item-list-form__items--total">
        <label>Total</label>
        <input type="text" name="item-list--total" value="${formatCurrency(item.total)}">
      </div>
      <div class="flex flex__col flex__jc-end ml-auto">
        <button class="icon-button icon-button__mini" >
          <a href="#" class="flex flex__ai-c">
            <figure>
              <img src="./assets/icon-delete.svg" alt="filters" />
            </figure>
          </a>
        </button>
      </div>
    </div>
    `
  });
  itemListWrapper.innerHTML = items;
}
