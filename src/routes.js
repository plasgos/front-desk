import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Checkout = React.lazy(() => import("./views/checkout/CheckoutPage"));
const PrintOut = React.lazy(() => import("./views/invoice/PrintOutPage"));
const PackageHistory = React.lazy(() =>
  import("./views/package-history/LayoutPackageHistory")
);
const PackageHistoryPending = React.lazy(() =>
  import("./views/package-history/pending/PendingPage")
);
const PackageHistoryDone = React.lazy(() =>
  import("./views/package-history/done/DonePackage")
);
const PackageHistoryShipping = React.lazy(() =>
  import("./views/package-history/shipping/ShippingPackage")
);
const PackageHistoryReturn = React.lazy(() =>
  import("./views/package-history/return/ReturnPackage")
);
const PackageHistoryCancel = React.lazy(() =>
  import("./views/package-history/cancel/CancelPackage")
);
const ShippingCost = React.lazy(() =>
  import("./views/shipping-cost/ShippingCost")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/buyer", name: "Buyer", component: Checkout, exact: true },
  { path: "/buyer/checkout", name: "Checkout", component: Checkout },
  { path: "/buyer/invoice/print", name: "Print out", component: PrintOut },
  {
    path: "/buyer/package-history/cancel",
    name: "Package-history-cancel",
    component: PackageHistoryCancel,
  },
  {
    path: "/buyer/package-history/return",
    name: "Package-history-return",
    component: PackageHistoryReturn,
  },
  {
    path: "/buyer/package-history/shipping",
    name: "Package-history-shipping",
    component: PackageHistoryShipping,
  },
  {
    path: "/buyer/package-history/done",
    name: "Package-history-done",
    component: PackageHistoryDone,
  },
  {
    path: "/buyer/package-history/pending",
    name: "Package-history-pending",
    component: PackageHistoryPending,
  },
  {
    path: "/buyer/package-history",
    name: "Package-history",
    component: PackageHistory,
  },
  {
    path: "/shipping-cost",
    name: "Shipping Cost",
    component: ShippingCost,
  },
];

export default routes;
