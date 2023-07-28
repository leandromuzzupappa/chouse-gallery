import { useState, useEffect } from "react";

function loadCart() {
  const _cart = localStorage.getItem("cart");
  return _cart ? JSON.parse(_cart) : [];
}

function persistCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const useCartContext = () => {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    persistCart(cart);
  }, [cart]);

  const addItem = (product, quantity) => {
    const productIndex = cart.findIndex((i) => i.product.id === product.id);

    if (productIndex > -1) {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeItem = (productId) => {
    const newCart = cart.filter((i) => i.product.id !== productId);
    setCart(newCart);
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((i) => i.product.id === id);
  };

  const increaseOne = (id) => {
    const newCart = [...cart];
    const productIndex = cart.findIndex((i) => i.product.id === id);
    newCart[productIndex].quantity += 1;
    setCart(newCart);
  };

  const decreaseOne = (id) => {
    const newCart = [...cart];
    const productIndex = cart.findIndex((i) => i.product.id === id);

    if (newCart[productIndex].quantity === 1) {
      removeItem(id);
      return;
    }

    newCart[productIndex].quantity -= 1;
    setCart(newCart);
  };

  const getTotal = () => {
    return cart
      .reduce((acc, i) => acc + i.product.price * i.quantity, 0)
      .toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
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
    increaseOne,
    decreaseOne,
    getTotal,
    getQuantity,
  };
};
