(async function () {
  const res = await fetch('../data.json');
  const jsonRes = await res.json();
  localStorage.setItem('data', JSON.stringify(jsonRes));
}())