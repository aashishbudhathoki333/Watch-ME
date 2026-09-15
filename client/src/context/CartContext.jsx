import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("watchmeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ================= ADD TO CART =================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      const stock = Number(product.stock ?? 0);

      // Product is out of stock
      if (stock <= 0) {
        return currentItems;
      }

      // Already in cart
      if (existingItem) {
        // Prevent quantity from exceeding stock
        if (existingItem.quantity >= stock) {
          return currentItems;
        }

        const updatedItems = currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                stock: stock,
              }
            : item
        );

        localStorage.setItem(
          "watchmeCart",
          JSON.stringify(updatedItems)
        );

        return updatedItems;
      }

      // Add new product
      const updatedItems = [
        ...currentItems,
        {
          ...product,
          quantity: 1,
          stock: stock,
        },
      ];

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  // ================= REMOVE FROM CART =================

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

  // ================= UPDATE QUANTITY =================

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCartItems((items) => {
      const updatedItems = items.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const stock = Number(item.stock ?? 0);

        // Do not allow quantity above available stock
        const limitedQuantity = Math.min(
          quantity,
          stock
        );

        return {
          ...item,
          quantity: limitedQuantity,
        };
      });

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  // ================= CLEAR CART =================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("watchmeCart");
  };

  // ================= CART COUNT =================

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ================= CART TOTAL =================

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
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