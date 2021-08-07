const toggleThemeButton = document.querySelector('#toggle-theme');
const newInvoice = document.querySelector('#new-invoice');
const body = document.querySelector('body');

/*
    Copyright (c) 2020 - present, DITDOT Ltd.
    https://www.ditdot.hr/en
*/
// MediaQueryList object
toggleThemeButton.addEventListener('click', () => {
  // This code assumes a Light Mode default
  // if (
  //   /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
  //   localStorage.getItem('color-mode') === 'dark' ||
  //   (window.matchMedia('(prefers-color-scheme: dark)').matches &&
  //   !localStorage.getItem('color-mode'))
  // ) {
  //   // if true, set the site to Dark Mode
  //   document.documentElement.setAttribute('color-mode', 'dark')
  // }

  const isLightTheme = body.classList.contains('theme--light');
  const img = toggleThemeButton.querySelector('figure > img');
  if(isLightTheme) {
    body.classList.remove('theme--light');
    body.classList.add('theme--dark');
    img.setAttribute('src','./assets/icon-sun.svg')
  } else {
    body.classList.add('theme--light');
    body.classList.remove('theme--dark');
    img.setAttribute('src','./assets/icon-moon.svg')
  }
})

newInvoice.addEventListener('click', () => window.location.href = '/invoice.html' )