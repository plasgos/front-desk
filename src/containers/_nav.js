export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Buyer"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Checkout",
    to: "/buyer/checkout",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Print out",
    to: "/buyer/invoice/print",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Package History",
    to: "/buyer/package-history",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Shipping Cost",
    to: "/shipping-cost",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Send Package",
    to: "/send-package",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Process Packages",
    to: "/buyer/process-packages",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Invoice Seller",
    to: "/invoice-seller",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Product Detail",
    to: "/product-detail",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Mutation",
    to: "/mutation",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Invoice Label Setting",
    to: "/invoice-label-setting",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Extras"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Login",
        to: "/login",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register",
        to: "/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 404",
        to: "/404",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 500",
        to: "/500",
      },
    ],
  },
];
