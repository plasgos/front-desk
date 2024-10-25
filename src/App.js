import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import { useSelector } from "react-redux";
import "./scss/style.scss";
import "./scss/tailwind.css";
import "animate.css";
// import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const { logged_in } = useSelector((state) => state.login);

  if (!logged_in) {
    return (
      <BrowserRouter>
        <React.Suspense fallback={<CSpinner />}>
          <Switch>
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Redirect from="/" to="/login" />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<CSpinner />}>
          <Switch>
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
