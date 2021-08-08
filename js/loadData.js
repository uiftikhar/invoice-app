(async function () {
  const res = await fetch('../data.json');
  const jsonRes = await res.json();
  window.jsonData = jsonRes;
}())