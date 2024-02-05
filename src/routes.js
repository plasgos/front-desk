import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Checkout = React.lazy(() => import("./views/checkout/CheckoutPage"));
const PrintOut = React.lazy(() => import("./views/invoice/PrintOutPage"));
const PackageHistory = React.lazy(() =>
  import("./views/package-history/LayoutPackageHistory")
);
const PackageHistoryPending = React.lazy(() =>
  import("./views/package-history/waiting/WaitingPage")
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
const SendPackage = React.lazy(() =>
  import("./views/send-package/SendPackagePage")
);
const processPackages = React.lazy(() =>
  import("./views/process-packages/LayoutProcessPackage")
);
const newProcessPackages = React.lazy(() =>
  import("./views/process-packages/new/NewPackagePage")
);

const resiProcessPackages = React.lazy(() =>
  import("./views/process-packages/resi/ResiPage")
);
const paymentProcessPackages = React.lazy(() =>
  import("./views/process-packages/payment/PaymentPage")
);

const Package = React.lazy(() => import("./views/package/add"));

const InvoiceSeller = React.lazy(() =>
  import("./views/invoice-seller/InvoiceSeller")
);

const ProductDetail = React.lazy(() =>
  import("./views/product-detail/ProductDetail")
);

const routes = [
  { path: "/", exact: true, name: "Dashboard", component: Dashboard },
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
    path: "/buyer/package-history/waiting",
    name: "Package-history-waiting",
    component: PackageHistoryPending,
  },

  {
    path: "/shipping-cost",
    name: "Shipping Cost",
    component: ShippingCost,
  },
  {
    path: "/send-package",
    name: "Send Package",
    component: Package,
  },

  {
    path: "/buyer/process-packages/new",
    name: "New",
    component: newProcessPackages,
  },
  {
    path: "/buyer/process-packages/resi",
    name: "Resi",
    component: resiProcessPackages,
  },
  {
    path: "/buyer/process-packages/pembayaran",
    name: "Payment",
    component: paymentProcessPackages,
  },
  {
    path: "/buyer/package-history",
    name: "Package-history",
    component: PackageHistory,
  },
  {
    path: "/buyer/process-packages",
    name: "Process Package",
    component: processPackages,
  },
  {
    path: "/invoice-seller",
    name: "Invoice Seller",
    component: InvoiceSeller,
  },
  {
    path: "/product-detail",
    name: "Product Detail",
    component: ProductDetail,
  },
];

export default routes;
