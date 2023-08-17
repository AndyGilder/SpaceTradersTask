import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import ShipDetails from "./components/shipDetails.tsx";
import Nav from "./components/Nav.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/shipDetails" element={<ShipDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
