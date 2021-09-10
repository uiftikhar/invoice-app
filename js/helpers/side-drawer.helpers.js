export const toggleSideDrawer = (isNewInvoice = false) => {
  const sideDrawer = isNewInvoice
    ? document.querySelector('#new-invoice-sidebar')
    : document.querySelector('#edit-invoice-sidebar');
  const overlay = document.querySelector('#overlay');

  if (sideDrawer.classList.contains('side-drawer__is-opened')) {
    sideDrawer.classList.remove('side-drawer__is-opened');
    while (sideDrawer.hasChildNodes()) {
      sideDrawer.removeChild(sideDrawer.lastChild);
    }
  } else {
    sideDrawer.classList.add('side-drawer__is-opened');
  }

  if (overlay.classList.contains('is-visible')) {
    overlay.classList.remove('is-visible');
  } else {
    overlay.classList.add('is-visible');
  }

  if (document.querySelector('#app-root').classList.contains('no-scroll')) {
    document.querySelector('#app-root').classList.remove('no-scroll');
  } else {
    document.querySelector('#app-root').classList.add('no-scroll');
  }
};
