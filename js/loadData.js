import { data } from '../assets/data.js';
(async function () {
  console.log(data);
  localStorage.setItem('data', JSON.stringify(data));
}())