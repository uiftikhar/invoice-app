export const userSelectElementListener = (
  event,
  datesElement,
  selectElements,
) => {
  event.preventDefault();
  if (datesElement.classList.contains('active')) {
    datesElement.classList.remove('active');
  }
  const path = event.path || (event.composedPath && event.composedPath());
  if (!checkEventPathForClass(path, 'select-elements')) {
    selectElements.classList.toggle('active');
  }
};

export const selectElementsListener = (
  event,
  selectElements,
  selectedElement,
) => {
  Array.from(selectElements.children).forEach((child) => {
    if (selectedElement.innerHTML === child.innerHTML) {
      child.classList.add('select__elements--selected');
    }
  });
  event.preventDefault();
  Array.from(selectElements.children).forEach((child) => {
    if (event.target.innerHTML === child.innerHTML) {
      child.classList.add('select__elements--selected');
      selectedElement.setAttribute('value', event.target.innerHTML);
      selectedElement.value = event.target.innerHTML;
    } else {
      child.className = '';
    }
  });
};
