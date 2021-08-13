const formatDate = (value) => {
  if(value) {
    const date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${day} ${month} ${year}`;
  }
  return '';
}

const formatDateSaveValue = (value) => {
    let d = new Date(value);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const getPaymentTermsInnerHTML = (terms) => {
  let response = 'Net 1 Day';
  switch (terms) {
    case 1:
      response = 'Net 1 Day';
      return response;
    case 7:
      response = 'Net 7 Days';
      return response;
    case  4:
      response = 'Net 14 Days';
      return response;
    case  0:
      response = 'Net 30 Days';
      return response;
    default:
      return response;
  }
}

const getPaymentTermsValue = (terms) => {
  let response;
  switch (terms) {
    case 'Net 1 Day':
      response = 1;
      return response;
    case 'Net 7 Days':
      response = 7;
      return response;
    case  'Net 14 Days':
      response = 14;
      return response;
    case  'Net 30 Days':
      response = 30;
      return response;
    default:
      return response;
  }
}

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 

const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

export {
  formatCurrency,
  formatDate,
  formatter,
  formatDateSaveValue,
  getPaymentTermsInnerHTML,
  getPaymentTermsValue
}