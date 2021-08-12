
export const updateSelectedItem = (selectElements, selectedElement) => {
  Array.from(selectElements.children).forEach(child => {
    if(selectedElement.innerHTML === child.innerHTML) {
      child.classList.add('select__elements--selected');
    }
  })
  selectElements.addEventListener('click', (e) => {
    Array.from(selectElements.children).forEach(child => {
      if(e.target.innerHTML === child.innerHTML) {
        child.classList.add('select__elements--selected');
        selectedElement.setAttribute('value',e.target.innerHTML);
        selectedElement.value = e.target.innerHTML;
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
