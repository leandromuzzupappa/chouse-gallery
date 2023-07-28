import { useState, useEffect } from "react";

export const useCartContext = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const persistCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };

    const loadCart = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        setCart(JSON.parse(cart));
      }
    };

    if (cart.length === 0) {
      loadCart();
    } else {
      persistCart();
    }
  }, [cart]);

  const addItem = (item, quantity) => {
    const itemIndex = cart.findIndex((i) => i.item.id === item.id);

    if (itemIndex > -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { item, quantity }]);
    }
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter((i) => i.item.id !== itemId);
    setCart(newCart);
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((i) => i.item.id === id);
  };

  const getTotal = () => {
    return cart.reduce((acc, i) => acc + i.item.price * i.quantity, 0);
  };

  const getQuantity = () => {
    return cart.reduce((acc, i) => acc + i.quantity, 0);
  };

  return {
    cart,
    addItem,
    removeItem,
    clear,
    isInCart,
    getTotal,
    getQuantity,
  };
};
