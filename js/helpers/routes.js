import { Router } from './router';
import { Route } from './route';
export function initRouter() {
  new Router([
    new Route('home', 'home.html', true),
    new Route('view-invoice', 'view-invoice.html'),
    new Route('edit-invoice', 'edit-invoice.html'),
    new Route('new-invoice', 'new-invoice.html'),
  ]);
}
