import { populateUpdateInvoiceFormOnInit, formatCurrency } from './helpers/update-invoice.js'

const checkEventPathForClass = (path, selector) => {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	return false;
}


const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

const updateEditInvoice = (editInvoiceWrapper, data) => {
  const datePickerElement = editInvoiceWrapper.querySelector('.date-picker');
  const selectedDateElement = editInvoiceWrapper.querySelector('.date-picker > .selected-date');
  const datesElement = editInvoiceWrapper.querySelector('.date-picker > .dates');
  const monthElement = editInvoiceWrapper.querySelector('.date-picker > .dates > .month > .mth');
  const nextMonthElement = editInvoiceWrapper.querySelector('.date-picker > .dates > .month > .next-month');
  const prevMonthElement = editInvoiceWrapper.querySelector('.date-picker > .dates > .month > .prev-month');
  const daysElement = editInvoiceWrapper.querySelector('.date-picker .dates .days');
  const userSelectElement = editInvoiceWrapper.querySelector('.select');
  const selectElements = editInvoiceWrapper.querySelector('.select > .select__elements');
  const selectedElement = editInvoiceWrapper.querySelector('.select > .select__selected-item');
  


  
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data);

  let date = new Date(data.paymentDue);


	selectedDateElement.innerHTML = `${date.getDate()} ${formatter.format(date)} ${date.getFullYear()}`;
  if(data.paymentTerms === 1) {
    selectedElement.innerHTML = 'Net 1 Day';
  }
  if(data.paymentTerms === 7) {
    selectedElement.innerHTML = 'Net 7 Days';
  }
  if(data.paymentTerms === 14) {
    selectedElement.innerHTML = 'Net 14 Days';
  }
  if(data.paymentTerms === 30) {
    selectedElement.innerHTML = 'Net 30 Days';
  }
  editInvoiceWrapper.querySelector('#submit-form-button').addEventListener('click', (e) => {
    e.preventDefault();
    const element = document.querySelector('#edit-invoice-form')
    const data = new FormData(element)
    const form = Array.from(data.entries());
    console.log(form);

    updateItemsInLocalStorage(form);
  });

  datePickerElement.addEventListener('click', (e) => {
    if (!checkEventPathForClass(e.path, 'dates')) {
      populateDates(datesElement, daysElement,selectedDateElement , monthElement,data, data.paymentDue);
      datesElement.classList.toggle('active');
    }
  })
  
  userSelectElement.addEventListener('click', (e) => {
    if (!checkEventPathForClass(e.path, 'select-elements')) {
      selectElements.classList.toggle('active');
      updateSelectedItem(selectElements, selectedElement);
    }
  })


  prevMonthElement.addEventListener('click',  (e) => {
    const newDate = new Date(date.setMonth(date.getMonth()-1));
    monthElement.innerHTML = `${formatter.format(newDate)} ${newDate.getFullYear()}`;
    populateDates(datesElement, daysElement,selectedDateElement , monthElement,data, newDate, false);

  })
  nextMonthElement.addEventListener('click',  (e) => {
    const newDate = new Date(date.setMonth(date.getMonth()+1));
    monthElement.innerHTML = `${formatter.format(newDate)} ${newDate.getFullYear()}`;
    populateDates(datesElement, daysElement,selectedDateElement , monthElement,data, newDate, false);
  })
}

const updateSelectedItem = (selectElements, selectedElement) => {
  Array.from(selectElements.children).forEach(child => {
    if(selectedElement.innerHTML === child.innerHTML) {
      child.classList.add('select__elements--selected');
    }
  })
  selectElements.addEventListener('click', (e) => {
    Array.from(selectElements.children).forEach(child => {
      if(e.target.innerHTML === child.innerHTML) {
        child.classList.add('select__elements--selected');
        selectedElement.innerHTML = e.target.innerHTML;
      } else {
        child.className = ''
      }
    })
  })
}

const  populateDates = (datesElement, daysElement, selectedDateElement, monthElement, data, userDate, addSelectedClass = true) => {
  daysElement.innerHTML = '';
  
  let date = new Date(userDate);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;
	let amountDays = 31;

  if(month % 2 !== 0) {
    amountDays = 30;
    if (month == 1) {
      amountDays = 28;
    }
    if (month == 7) {
      amountDays = 31;
    }
  }

  monthElement.innerHTML = `${formatter.format(selectedDate)} ${selectedYear}`;
	for (let i = 0; i < amountDays; i++) {
		const dayElement = document.createElement('div');
		dayElement.classList.add('day');
		dayElement.textContent = i + 1;

    if(addSelectedClass) {
      if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
        dayElement.classList.add('selected');
      }
    }

		dayElement.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

  
			selectedDateElement.innerHTML = `${selectedDay} ${formatter.format(selectedDate)} ${selectedYear}`;
			selectedDateElement.dataset.value = selectedDate;

      // TODO potentially figure out a wya to get rid of this
			populateDates(datesElement, daysElement, selectedDateElement, monthElement ,data, selectedDate);
      // datesElement.classList.toggle('active');
		});

		daysElement.appendChild(dayElement);
	}
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

const updateHome = (InvoiceWrapper, jsonData) => {
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

export {
  updateHome,
  updateViewInvoice,
  updateEditInvoice,
  checkEventPathForClass
}