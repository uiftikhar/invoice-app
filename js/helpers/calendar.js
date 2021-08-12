
const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
const  populateDates = (datesElement, daysElement, selectedDateElement, monthElement, date, addSelectedClass = true) => {
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

  // monthElement.setAttribute('value', `${formatter.format(selectedDate)} ${selectedYear}`)
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
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

  
      selectedDateElement.setAttribute('value', `${selectedDay} ${formatter.format(date)} ${selectedYear}`)
      selectedDateElement.value =  `${selectedDay} ${formatter.format(date)} ${selectedYear}`;
      datesElement.classList.toggle('active');
		});

		daysElement.appendChild(dayElement);
	}
}

export {
  populateDates
}