import { renderItems } from './helpers/populate-edit-invoice-oninit.js';

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

export const addToLocalStorage = (data, id) => {
  localStorage.setItem('data', JSON.stringify(data));
  const currentInvoice = data.find(item => item.id === id);
  console.log(currentInvoice.items);
  renderItems(currentInvoice.items);
}

export const getFromLocalStorage = () => {
  const reference = localStorage.getItem('data');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    const items = JSON.parse(reference);
    renderItems(items);
  }
}