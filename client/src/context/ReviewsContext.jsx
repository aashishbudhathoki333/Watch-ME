import { createContext, useState } from "react";

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("watchmeReviews");

    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const addReview = (productId, reviewData) => {
    const newReview = {
      id: Date.now(),
      productId: Number(productId),
      ...reviewData,
      date: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);

    localStorage.setItem(
      "watchmeReviews",
      JSON.stringify(updatedReviews)
    );
  };

  const getProductReviews = (productId) => {
    return reviews.filter(
      (review) => review.productId === Number(productId)
    );
  };

  const deleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewId
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      "watchmeReviews",
      JSON.stringify(updatedReviews)
    );
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        deleteReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};