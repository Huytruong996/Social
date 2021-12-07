import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "carbon-components/scss/globals/scss/styles.scss";
import { GlobalContextProvider } from "./context/GlobalContext";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <GlobalContextProvider>
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <App />
    </ToastProvider>
  </GlobalContextProvider>,
  document.getElementById("root")
);
