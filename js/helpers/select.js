
export const updateSelectedItem = (selectElements, selectedElement) => {
  Array.from(selectElements.children).forEach(child => {
    if(selectedElement.innerHTML === child.innerHTML) {
      child.classList.add('select__elements--selected');
    }
  })
}
