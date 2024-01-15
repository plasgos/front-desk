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
