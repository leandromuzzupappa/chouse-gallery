/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useCartContext } from "../hooks/useCartContext";

export const CartContext = createContext({});
const { Provider } = CartContext;

export const CartProvider = ({ children }) => {
  const cartContextProps = useCartContext();

  return <Provider value={cartContextProps}>{children}</Provider>;
};
