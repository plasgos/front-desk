import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Checkout = React.lazy(() => import('./views/checkout/CheckoutPage'));
const PrintOut = React.lazy(() => import('./views/invoice/PrintOutPage'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/buyer', name: 'Buyer', component: Checkout, exact: true },
  { path: '/buyer/checkout', name: 'Checkout', component: Checkout },
  { path: '/buyer/invoice/print', name: 'PrintOut', component: PrintOut },
];

export default routes;
