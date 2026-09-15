import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

import defaultProducts from "../data/products";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { ReviewsContext } from "../context/ReviewsContext";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const {
    toggleWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const { user, isLoggedIn } = useContext(AuthContext);

  const {
    getProductReviews,
    addReview,
    deleteReview,
  } = useContext(ReviewsContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  // ================= LOAD PRODUCT =================

  useEffect(() => {
    const savedProducts =
      localStorage.getItem("watchmeProducts");

    let productList = defaultProducts;

    if (savedProducts) {
      try {
        productList = JSON.parse(savedProducts);
      } catch (error) {
        console.error(
          "Failed to load saved products:",
          error
        );
      }
    }

    const foundProduct = productList.find(
      (item) => item.id === Number(id)
    );

    setProduct(foundProduct || null);

    // Reset quantity whenever product changes
    setQuantity(1);
  }, [id]);

  // ================= PRODUCT NOT FOUND =================

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product Not Found</h1>

        <p>
          Sorry, the watch you're looking for does not
          exist.
        </p>

        <Link to="/shop" className="btn btn-dark">
          Back to Shop
        </Link>
      </main>
    );
  }

  // ================= STOCK =================

  const stock = Number(product.stock ?? 0);

  const isOutOfStock = stock <= 0;

  const isLowStock =
    stock > 0 && stock <= 5;

  const isMaxQuantity =
    quantity >= stock;

  // ================= DISCOUNT =================

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : 0;

  // ================= REVIEWS =================

  const productReviews =
    getProductReviews(product.id);

  // ================= ADD TO CART =================

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    const safeQuantity = Math.min(
      quantity,
      stock
    );

    for (let i = 0; i < safeQuantity; i++) {
      addToCart(product);
    }

    navigate("/cart");
  };

  // ================= WISHLIST =================

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  // ================= REVIEW =================

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: `/products/${product.id}`,
        },
      });

      return;
    }

    if (!reviewComment.trim()) {
      setReviewMessage(
        "Please write a review before submitting."
      );

      return;
    }

    const alreadyReviewed =
      productReviews.some(
        (review) =>
          review.email === user?.email
      );

    if (alreadyReviewed) {
      setReviewMessage(
        "You have already reviewed this product."
      );

      return;
    }

    addReview({
      productId: product.id,
      name:
        user?.name ||
        user?.email ||
        "Customer",
      email: user?.email || "",
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString(),
    });

    setReviewComment("");
    setReviewRating(5);
    setReviewMessage(
      "Review submitted successfully."
    );
  };

  // ================= DELETE REVIEW =================

  const handleDeleteReview = (review) => {
    if (review.email !== user?.email) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your review?"
    );

    if (!confirmed) {
      return;
    }

    deleteReview(review.id);

    setReviewMessage(
      "Review deleted successfully."
    );
  };

  return (
    <main className="product-details-page">

      <div className="product-details-container">

        {/* ================= BACK ================= */}

        <Link
          to="/shop"
          className="back-to-shop"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>

        {/* ================= PRODUCT ================= */}

        <section className="product-details">

          {/* IMAGE */}

          <div className="product-details-image">

            {product.badge && (
              <span className="product-details-badge">
                {product.badge}
              </span>
            )}

            <span className="product-details-discount">
              -{discount}%
            </span>

            <img
              src={product.image}
              alt={product.name}
            />

          </div>

          {/* INFO */}

          <div className="product-details-info">

            <p className="product-details-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            {/* RATING */}

            <div className="product-details-rating">

              <div className="rating-stars">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={
                        star <=
                        Math.round(
                          product.rating
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />
                  )
                )}

              </div>

              <span>
                {product.rating}
              </span>

              <small>
                ({product.reviews} reviews)
              </small>

            </div>

            {/* PRICE */}

            <div className="product-details-price">

              <strong>
                Rs.{" "}
                {product.price.toLocaleString()}
              </strong>

              {product.oldPrice && (
                <del>
                  Rs.{" "}
                  {product.oldPrice.toLocaleString()}
                </del>
              )}

            </div>

            {/* DESCRIPTION */}

            <p className="product-details-description">
              {product.description}
            </p>

            {/* ================= STOCK ================= */}

            <div
              className={`product-stock-status ${
                isOutOfStock
                  ? "out-of-stock"
                  : isLowStock
                  ? "low-stock"
                  : "in-stock"
              }`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isLowStock
                ? `Only ${stock} left in stock`
                : `${stock} available in stock`}
            </div>

            {/* ================= QUANTITY ================= */}

            <div className="product-quantity">

              <span>Quantity</span>

              <div className="quantity-controls">

                {/* MINUS */}

                <button
                  type="button"
                  disabled={
                    isOutOfStock ||
                    quantity <= 1
                  }
                  onClick={() =>
                    setQuantity(
                      (prev) =>
                        Math.max(
                          1,
                          prev - 1
                        )
                    )
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                {/* NUMBER */}

                <span>{quantity}</span>

                {/* PLUS */}

                <button
                  type="button"
                  disabled={
                    isOutOfStock ||
                    isMaxQuantity
                  }
                  onClick={() => {
                    if (
                      quantity < stock
                    ) {
                      setQuantity(
                        (prev) =>
                          prev + 1
                      );
                    }
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="product-details-actions">

              {/* ADD TO CART */}

              <button
                type="button"
                className="product-add-cart"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={19} />

                {isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              {/* WISHLIST */}

              <button
                type="button"
                className={`product-wishlist-button ${
                  isInWishlist(
                    product.id
                  )
                    ? "active"
                    : ""
                }`}
                onClick={handleWishlist}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  fill={
                    isInWishlist(
                      product.id
                    )
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            {/* ================= FEATURES ================= */}

            <div className="product-details-features">

              <div>
                <strong>
                  Premium Quality
                </strong>

                <span>
                  Carefully selected materials
                </span>
              </div>

              <div>
                <strong>
                  Fast Delivery
                </strong>

                <span>
                  Quick delivery across Nepal
                </span>
              </div>

              <div>
                <strong>
                  Easy Returns
                </strong>

                <span>
                  Simple return policy
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= REVIEWS ================= */}

        <section className="product-reviews-section">

          <div className="reviews-header">

            <div>
              <p className="section-label">
                CUSTOMER FEEDBACK
              </p>

              <h2>
                Customer Reviews
              </h2>
            </div>

            <div className="overall-rating">

              <strong>
                {product.rating}
              </strong>

              <div>

                <div className="rating-stars">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={15}
                        fill={
                          star <=
                          Math.round(
                            product.rating
                          )
                            ? "currentColor"
                            : "none"
                        }
                      />
                    )
                  )}

                </div>

                <span>
                  {productReviews.length}{" "}
                  customer reviews
                </span>

              </div>

            </div>

          </div>

          {/* ================= REVIEW FORM ================= */}

          <div className="review-form-container">

            <h3>
              {isLoggedIn
                ? "Write a Review"
                : "Login to Write a Review"}
            </h3>

            {!isLoggedIn ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={() =>
                  navigate("/login", {
                    state: {
                      from: `/products/${product.id}`,
                    },
                  })
                }
              >
                Login to Review
              </button>
            ) : (
              <form
                className="review-form"
                onSubmit={
                  handleReviewSubmit
                }
              >

                <div className="review-rating-input">

                  <label>
                    Rating
                  </label>

                  <div className="review-stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setReviewRating(
                              star
                            )
                          }
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            size={21}
                            fill={
                              star <=
                              reviewRating
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      )
                    )}

                  </div>

                </div>

                <textarea
                  value={reviewComment}
                  onChange={(e) =>
                    setReviewComment(
                      e.target.value
                    )
                  }
                  placeholder="Share your experience with this watch..."
                  rows={4}
                />

                <button
                  type="submit"
                  className="btn btn-dark"
                >
                  Submit Review
                </button>

              </form>
            )}

            {reviewMessage && (
              <p className="review-message">
                {reviewMessage}
              </p>
            )}

          </div>

          {/* ================= REVIEW LIST ================= */}

          <div className="reviews-list">

            {productReviews.length ===
            0 ? (
              <div className="no-reviews">

                <p>
                  No reviews yet.
                </p>

                <span>
                  Be the first to review
                  this watch.
                </span>

              </div>
            ) : (
              productReviews.map(
                (review) => (
                  <article
                    className="review-card"
                    key={review.id}
                  >

                    <div className="review-card-header">

                      <div>

                        <strong>
                          {review.name}
                        </strong>

                        <div className="review-stars">

                          {[1, 2, 3, 4, 5].map(
                            (star) => (
                              <Star
                                key={star}
                                size={14}
                                fill={
                                  star <=
                                  review.rating
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            )
                          )}

                        </div>

                      </div>

                      <small>
                        {review.date}
                      </small>

                    </div>

                    <p>
                      {review.comment}
                    </p>

                    {review.email ===
                      user?.email && (
                      <button
                        type="button"
                        className="delete-review"
                        onClick={() =>
                          handleDeleteReview(
                            review
                          )
                        }
                      >
                        Delete Review
                      </button>
                    )}

                  </article>
                )
              )
            )}

          </div>

        </section>

      </div>

    </main>
  );
};

export default ProductDetails;