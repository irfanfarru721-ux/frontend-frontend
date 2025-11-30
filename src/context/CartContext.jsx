import React, { createContext, useContext, useEffect, useState } from "react";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    if (raw) setCart(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.productId === product._id);
      if (exists) {
        return prev.map((p) => (p.productId === product._id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { productId: product._id, name: product.name, price: product.price, image: product.image || "", qty }];
    });
  };

  const removeFromCart = (productId) => setCart((prev) => prev.filter((p) => p.productId !== productId));
  const clearCart = () => setCart([]);

  const updateQty = (productId, qty) =>
    setCart((prev) => prev.map((p) => (p.productId === productId ? { ...p, qty } : p)));

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQty }}>{children}</CartContext.Provider>;
};
