import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { ClientContext } from "graphql-hooks";
import { client } from "./services/datocmsService";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientContext.Provider value={client}>
        <CartProvider>
          <App />
        </CartProvider>
      </ClientContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
