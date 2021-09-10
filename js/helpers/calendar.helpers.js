import { formatter } from '../utils.js';
import { checkEventPathForClass } from '../views/new-invoice.helpers.js';
const populateDates = (
  daysElement,
  monthElement,
  date,
  addSelectedClass = true,
) => {
  while (daysElement.hasChildNodes()) {
    daysElement.removeChild(daysElement.lastChild);
  }

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;
  let amountDays = 31;

  if (month % 2 !== 0) {
    amountDays = 30;
    if (month == 1) {
      amountDays = 28;
    }
    if (month == 7) {
      amountDays = 31;
    }
  }

  monthElement.setAttribute(
    'value',
    `${formatter.format(selectedDate)} ${selectedYear}`,
  );
  monthElement.textContent = `${formatter.format(
    selectedDate,
  )} ${selectedYear}`;
  for (let i = 0; i < amountDays; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = i + 1;

    if (addSelectedClass) {
      if (
        selectedDay == i + 1 &&
        selectedYear == year &&
        selectedMonth == month
      ) {
        dayElement.classList.add('selected');
      }
    }
    daysElement.appendChild(dayElement);
  }
};

export const datePickerElementListener = (
  event,
  selectElements,
  datesElement,
  daysElement,
  monthElement,
  date,
) => {
  const path = event.path || (event.composedPath && event.composedPath());
  if (selectElements.classList.contains('active')) {
    selectElements.classList.remove('active');
  }
  if (!checkEventPathForClass(path, 'dates')) {
    event.preventDefault();
    populateDates(daysElement, monthElement, date);
    datesElement.classList.toggle('active');
  }
};

export const daysElementListener = (
  event,
  date,
  selectedDateElement,
  datesElement,
) => {
  let selectedDay = Number(event.target.innerHTML);
  let selectedYear = date.getFullYear();

  selectedDateElement.setAttribute(
    'value',
    `${selectedDay} ${formatter.format(date)} ${selectedYear}`,
  );
  selectedDateElement.value = `${selectedDay} ${formatter.format(
    date,
  )} ${selectedYear}`;
  datesElement.classList.toggle('active');
};

export const prevMonthElementListener = (
  event,
  date,
  monthElement,
  daysElement,
) => {
  event.preventDefault();
  date = new Date(date.setMonth(date.getMonth() - 1));
  monthElement.setAttribute(
    'value',
    `${formatter.format(date)} ${date.getFullYear()}`,
  );
  populateDates(daysElement, monthElement, date, false);
};

export const nextMonthElementListener = (
  event,
  date,
  monthElement,
  daysElement,
) => {
  event.preventDefault();
  date = new Date(date.setMonth(date.getMonth() + 1));
  monthElement.setAttribute(
    'value',
    `${formatter.format(date)} ${date.getFullYear()}`,
  );
  populateDates(daysElement, monthElement, date, false);
};

export { populateDates };
