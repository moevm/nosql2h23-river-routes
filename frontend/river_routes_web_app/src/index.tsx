import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import RiverRoutesApp from "./RiverRoutesApp";
import { BrowserRouter } from "react-router-dom";
import { store } from "@src/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <RiverRoutesApp />
    </Provider>
  </BrowserRouter>,
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
