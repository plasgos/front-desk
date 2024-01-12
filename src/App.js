import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/navbar/Navbar";
import PrintOutPage from "./components/invoice/PrintOutPage";

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
