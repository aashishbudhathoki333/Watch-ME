import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("watchmeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      const updatedItems = existingItem
        ? currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentItems, { ...product, quantity: 1 }];

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((items) => {
      const updatedItems = items.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCartItems((items) => {
      const updatedItems = items.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      );

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("watchmeCart");
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};