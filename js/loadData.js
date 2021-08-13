import { data } from '../assets/data.js';
(async function () {
  const _data = localStorage.getItem('data');
  if(!JSON.parse(_data)) {
    localStorage.setItem('data', JSON.stringify(data));
  }
}())