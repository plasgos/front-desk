import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/navbar/Navbar";
import PrintOutPage from "./components/invoice/PrintOutPage";
import { PendingPackagePage } from "./components/package-history/pending/PendingPage";
import LayoutPackageHistory from "./components/package-history/LayoutPackageHistory";
import { ShippingPackagePage } from "./components/package-history/shipping/ShippingPackage";
import { DonePackagePage } from "./components/package-history/done/DonePackage";
import { ReturnPackagePage } from "./components/package-history/return/ReturnPackage";
import { CancelPackagePage } from "./components/package-history/cancel/CancelPackage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const CheckoutPage = React.lazy(() =>
  import("./components/checkout-page/CheckoutPage")
);

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Navbar />
            <Switch>
              <Route
                path="/checkout"
                name="Checkout"
                render={(props) => <CheckoutPage {...props} />}
              />
              <Route
                path="/invoice"
                name="Invoice"
                render={(props) => <PrintOutPage {...props} />}
              />
              <Route
                path="/package-history/pending"
                name="Package-history pending"
                render={(props) => <PendingPackagePage {...props} />}
              />
              <Route
                path="/package-history/shipping"
                name="shipping"
                render={(props) => <ShippingPackagePage {...props} />}
              />
              <Route
                path="/package-history/done"
                name="done"
                render={(props) => <DonePackagePage {...props} />}
              />
              <Route
                path="/package-history/return"
                name="return"
                render={(props) => <ReturnPackagePage {...props} />}
              />
              <Route
                path="/package-history/cancel"
                name="shipping"
                render={(props) => <CancelPackagePage {...props} />}
              />
              <Route
                path="/package-history"
                name="Package-history"
                render={(props) => <LayoutPackageHistory {...props} />}
              />

              <Route
                path="/"
                name="Home"
                render={(props) => <HomePage {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
