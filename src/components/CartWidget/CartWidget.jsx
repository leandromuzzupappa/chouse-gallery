import "./CartWidget.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export const CartWidget = () => {
  const { getQuantity } = useContext(CartContext);

  return (
    <button className="cart">
      [ <span className="cart--count">{getQuantity()}</span> ]
    </button>
  );
};
