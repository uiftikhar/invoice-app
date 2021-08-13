const formatDate = (value) => {
  const date = new Date(value);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });
  return `${day} ${month} ${year}`;
}

const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(value); 

const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

export {
  formatCurrency,
  formatDate,
  formatter
}