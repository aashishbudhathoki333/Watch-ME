import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart =
      localStorage.getItem("watchmeCart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // ================= GET LATEST PRODUCTS =================

  const getLatestProducts = () => {
    const savedProducts =
      localStorage.getItem("watchmeProducts");

    if (!savedProducts) {
      return [];
    }

    try {
      return JSON.parse(savedProducts);
    } catch (error) {
      console.error(
        "Failed to load latest products:",
        error
      );

      return [];
    }
  };

  // ================= ADD TO CART =================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const latestProducts =
        getLatestProducts();

      const latestProduct =
        latestProducts.find(
          (item) => item.id === product.id
        );

      // Use latest product information
      const productToAdd =
        latestProduct || product;

      const stock = Number(
        productToAdd.stock ?? 0
      );

      // Out of stock
      if (stock <= 0) {
        return currentItems;
      }

      const existingItem =
        currentItems.find(
          (item) =>
            item.id === productToAdd.id
        );

      // ================= EXISTING ITEM =================

      if (existingItem) {
        if (
          existingItem.quantity >= stock
        ) {
          return currentItems;
        }

        const updatedItems =
          currentItems.map((item) =>
            item.id === productToAdd.id
              ? {
                  ...item,
                  ...productToAdd,
                  quantity:
                    item.quantity + 1,
                  stock,
                }
              : item
          );

        localStorage.setItem(
          "watchmeCart",
          JSON.stringify(updatedItems)
        );

        return updatedItems;
      }

      // ================= NEW ITEM =================

      const updatedItems = [
        ...currentItems,
        {
          ...productToAdd,
          quantity: 1,
          stock,
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
      const updatedItems =
        items.filter(
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

  const updateQuantity = (
    id,
    quantity
  ) => {
    if (quantity < 1) return;

    setCartItems((items) => {
      const latestProducts =
        getLatestProducts();

      const updatedItems =
        items.map((item) => {
          if (item.id !== id) {
            return item;
          }

          const latestProduct =
            latestProducts.find(
              (product) =>
                product.id === item.id
            );

          const stock = Number(
            latestProduct?.stock ??
              item.stock ??
              0
          );

          // If product is now out of stock
          if (stock <= 0) {
            return {
              ...item,
              stock: 0,
              quantity: 0,
            };
          }

          const limitedQuantity =
            Math.min(
              quantity,
              stock
            );

          return {
            ...item,
            ...(latestProduct || {}),
            quantity:
              limitedQuantity,
            stock,
          };
        });

      // Remove products that became
      // completely unavailable
      const cleanedItems =
        updatedItems.filter(
          (item) => item.quantity > 0
        );

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(
          cleanedItems
        )
      );

      return cleanedItems;
    });
  };

  // ================= REFRESH CART STOCK =================

  const refreshCartStock = () => {
    setCartItems((items) => {
      const latestProducts =
        getLatestProducts();

      const updatedItems =
        items
          .map((item) => {
            const latestProduct =
              latestProducts.find(
                (product) =>
                  product.id === item.id
              );

            if (!latestProduct) {
              return null;
            }

            const stock = Number(
              latestProduct.stock ?? 0
            );

            if (stock <= 0) {
              return null;
            }

            return {
              ...item,
              ...latestProduct,
              quantity: Math.min(
                item.quantity,
                stock
              ),
              stock,
            };
          })
          .filter(Boolean);

      localStorage.setItem(
        "watchmeCart",
        JSON.stringify(
          updatedItems
        )
      );

      return updatedItems;
    });
  };

  // ================= CLEAR CART =================

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem(
      "watchmeCart"
    );
  };

  // ================= CART COUNT =================

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  // ================= CART TOTAL =================

  const cartTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

  // ================= PROVIDER =================

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCartStock,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};