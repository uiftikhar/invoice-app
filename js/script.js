// DATA BINDING
// https://dev.to/phoinixi/one-way-data-binding-in-vanilla-js-poc-4dj7

const toggleThemeButton = document.querySelector('#toggle-theme');
const newInvoice = document.querySelector('#new-invoice');
const homeWrapper = document.querySelector('#home')
const editWrapper = document.querySelector('#edit')
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');

const jsonData = JSON.parse(localStorage.getItem('data'));
(function () {
  function init() {
      new Router([
          new Route('home', 'home.html', true),            
          new Route('view-invoice', 'view-invoice.html'),
          new Route('edit-invoice', 'edit-invoice.html')
      ]);
  }
  init();
}());

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 

appRoot.addEventListener('page-loaded', () => {
  const InvoiceWrapper = appRoot.querySelector('#home');
  const viewInvoiceWrapper = appRoot.querySelector('#view-invoice');
  const editInvoiceWrapper = appRoot.querySelector('#edit-invoice');
  if(InvoiceWrapper) updateHome(InvoiceWrapper);
  if(viewInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find(item => item.id === queryString);
    updateViewInvoice(viewInvoiceWrapper, currentItem);
  }
  if(editInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = jsonData.find(item => item.id === queryString);
    updateEditInvoice(editInvoiceWrapper, currentItem)
  }
})

const updateEditInvoice = (editInvoiceWrapper, data) => {
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data);
  editInvoiceWrapper.querySelector('#submit-form-button').addEventListener('click', (e) => {
    e.preventDefault();
    const element = document.querySelector('#edit-invoice-form')
    const data = new FormData(element)
    const form = Array.from(data.entries());
    updateItemsInLocalStorage(form);
  });
}

const updateItemsInLocalStorage = (entries) => {
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

const populateUpdateInvoiceFormOnInit = (editInvoiceWrapper, data) => {
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


const updateViewInvoice = (viewInvoiceWrapper, data) => {
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
    redirectToEdit.setAttribute('href',`/#edit-invoice?${data.id}`)
    window.location.assign = `/#edit-invoice?${data.id}`;
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


const formatDate = (value) => {
  const date = new Date(value);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  return `${day} ${month} ${year}`;
}

const updateHome = (InvoiceWrapper) => {
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


toggleThemeButton.addEventListener('click', () => {
  // This code assumes a Light Mode default
  // if (
  //   /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
  //   localStorage.getItem('color-mode') === 'dark' ||
  //   (window.matchMedia('(prefers-color-scheme: dark)').matches &&
  //   !localStorage.getItem('color-mode'))
  // ) {
  //   // if true, set the site to Dark Mode
  //   document.documentElement.setAttribute('color-mode', 'dark')
  // }

  const isLightTheme = body.classList.contains('theme--light');
  const img = toggleThemeButton.querySelector('figure > img');
  if(isLightTheme) {
    body.classList.remove('theme--light');
    body.classList.add('theme--dark');
    img.setAttribute('src','./assets/icon-sun.svg')
  } else {
    body.classList.add('theme--light');
    body.classList.remove('theme--dark');
    img.setAttribute('src','./assets/icon-moon.svg')
  }
})
