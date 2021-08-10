import { data } from '../assets/data.js';
(async function () {
  localStorage.setItem('data', JSON.stringify(data));
}())