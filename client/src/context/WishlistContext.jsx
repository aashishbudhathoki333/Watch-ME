import { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist =
      localStorage.getItem("watchmeWishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  const toggleWishlist = (product) => {
    setWishlistItems((items) => {
      const exists = items.some(
        (item) => item.id === product.id
      );

      const updatedItems = exists
        ? items.filter(
            (item) => item.id !== product.id
          )
        : [...items, product];

      localStorage.setItem(
        "watchmeWishlist",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};