export async function loadData() {
  const _data = localStorage.getItem('data');
  if (_data === null) {
    let data = await fetch('./data.json');
    data = await data.json();
    localStorage.setItem('data', JSON.stringify(data));
    return data;
  }
  return JSON.parse(_data);
}
