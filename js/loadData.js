(async function () {
  const res = await fetch('/assets/data.js');
  const jsonRes = await res.json();
  localStorage.setItem('data', JSON.stringify(jsonRes));
}())