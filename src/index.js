import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

// import { Auth0Provider } from "@auth0/auth0-react";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Dashboard from "./pages/dashboard/dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain="dev-2uyhq6sjao4v7jkq.us.auth0.com"
      clientId="tZKMPE5IG9URApcdneOFovhXT1QaGpVs"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
    </Auth0Provider> */}
    <App />
  </React.StrictMode>
);

reportWebVitals();
