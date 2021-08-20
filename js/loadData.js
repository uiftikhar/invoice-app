import { data } from '../dist/assets/data';
export async function loadData() {
  console.log('load data called');
  const _data = localStorage.getItem('data');
  if (!JSON.parse(_data)) {
    localStorage.setItem('data', JSON.stringify(data));
  }
}
