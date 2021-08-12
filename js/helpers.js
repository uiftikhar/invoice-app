import { renderItems } from './helpers/populate-edit-invoice-oninit.js';

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