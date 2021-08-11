

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 

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
              <img src="./../../assets/icon-delete.svg" alt="filters" />
            </figure>
          </a>
        </button>
      </div>
    </div>
    `
  });
  itemListWrapper.innerHTML = items;
}


const checkEventPathForClass = (path, selector) => {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	return false;
}


const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
let date;

const updateEditInvoice = (editInvoiceWrapper, data) => {
  date = new Date(data.paymentDue);
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
  const formElement = editInvoiceWrapper.querySelector('#edit-invoice-form');


  formElement.addEventListener('submit', e => e.preventDefault());
  
  populateUpdateInvoiceFormOnInit(editInvoiceWrapper, data);



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
    console.log(form, selectedElement.dataset.value, selectedDateElement.dataset.value);
    updateItemsInLocalStorage(form);
  });

  datePickerElement.addEventListener('click', (e) => {
    if (!checkEventPathForClass(e.path, 'dates')) {
      populateDates(datesElement, daysElement,selectedDateElement , monthElement);
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
    date = new Date(date.setMonth(date.getMonth()-1));
    monthElement.innerHTML = `${formatter.format(date)} ${date.getFullYear()}`;
    populateDates(datesElement, daysElement,selectedDateElement , monthElement, false);
  })
  nextMonthElement.addEventListener('click',  (e) => {
    date = new Date(date.setMonth(date.getMonth()+1));
    monthElement.innerHTML = `${formatter.format(date)} ${date.getFullYear()}`;
    populateDates(datesElement, daysElement,selectedDateElement , monthElement, false);
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
        if(e.target.innerHTML === 'Net 1 Day') {
          selectedElement.dataset.value = 1;
        }
        if(e.target.innerHTML === 'Net 7 Days') {
          selectedElement.dataset.value = 7;
        }
        if(e.target.innerHTML === 'Net 14 Days') {
          selectedElement.dataset.value = 14;
        }
        if(e.target.innerHTML === 'Net 30 Days') {
          selectedElement.dataset.value = 30;
        }
      } else {
        child.className = ''
      }
    })
  })
}

const  populateDates = (datesElement, daysElement, selectedDateElement, monthElement, addSelectedClass = true) => {
  daysElement.innerHTML = '';
  
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
			date = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			// selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

  
			selectedDateElement.innerHTML = `${selectedDay} ${formatter.format(date)} ${selectedYear}`;
			selectedDateElement.dataset.value = date;
      console.log(selectedDateElement.dataset);
      datesElement.classList.toggle('active');
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





export {
  updateEditInvoice,
  checkEventPathForClass
}