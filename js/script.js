

const toggleThemeButton = document.querySelector('#toggle-theme');
const newInvoice = document.querySelector('#new-invoice');
const homeWrapper = document.querySelector('#home')
const editWrapper = document.querySelector('#edit')
const body = document.querySelector('body');
const appRoot = document.querySelector('#app-root');




(function () {
  function init() {
      new Router([
          new Route('home', 'home.html', true),            
          new Route('view-invoice', 'view-invoice.html')
      ]);
  }
  init();
}());

appRoot.addEventListener('page-loaded', () => {
  const data = window.jsonData;
  const InvoiceWrapper = appRoot.querySelector('#home');
  const viewInvoiceWrapper = appRoot.querySelector('#view-invoice');
  if(InvoiceWrapper) updateHome(InvoiceWrapper, data);
  if(viewInvoiceWrapper) {
    const queryString = window.location.hash.split('?')[1];
    const currentItem = data.find(item => item.id === queryString);
    updateViewInvoice(viewInvoiceWrapper, currentItem);
  }
})

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
  statusWrapper.innerHTML = chip;
  console.log(statusWrapper, data, detailsWrapper);
}


const formatDate = (value) => {
  const date = new Date(value);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  return `${day} ${month} ${year}`;
}

const updateHome = (InvoiceWrapper, data) => {
  const totalInvoicesElement = InvoiceWrapper.querySelector('article > hgroup > h4')
  const totalInvoices = data.length;
  const cardsWrapperElement = InvoiceWrapper.querySelector('.cards')
  totalInvoicesElement.innerHTML = `${totalInvoices} invoices`;
  let innerHtml = ''
  data.forEach(item => {
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
                <h3 class="card__invoice--total">${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(item.total)}</h3>
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
