import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";

import products from "../data/products";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import ProductGrid from "../components/ProductGrid";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ================= PRODUCT =================

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("watchmeProducts");

    const productList = savedProducts
      ? JSON.parse(savedProducts)
      : [];

    const foundProduct = productList.find(
      (item) => item.id === Number(id)
    );

    setProduct(foundProduct);
  }, [id]);

  // ================= CONTEXTS =================

  const { addToCart } = useContext(CartContext);

  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const { user } = useContext(AuthContext);

  // ================= CART / WISHLIST =================

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // ================= REVIEWS =================

  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Load reviews for this product
  useEffect(() => {
    if (!product) return;

    const savedReviews =
      JSON.parse(localStorage.getItem("watchmeReviews")) || {};

    setReviews(savedReviews[product.id] || []);
  }, [product]);

  // ================= SUBMIT REVIEW =================

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!reviewText.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: user.name || user.email || "Customer",
      rating: reviewRating,
      text: reviewText.trim(),
      date: new Date().toISOString(),
    };

    const allReviews =
      JSON.parse(localStorage.getItem("watchmeReviews")) || {};

    const updatedReviews = [
      ...(allReviews[product.id] || []),
      newReview,
    ];

    allReviews[product.id] = updatedReviews;

    localStorage.setItem(
      "watchmeReviews",
      JSON.stringify(allReviews)
    );

    setReviews(updatedReviews);
    setReviewText("");
    setReviewRating(5);
    setReviewSubmitted(true);

    setTimeout(() => {
      setReviewSubmitted(false);
    }, 2500);
  };

  // ================= PRODUCT NOT FOUND =================

  // IMPORTANT:
  // This comes AFTER all hooks.
  if (!product) {
    return (
      <main className="product-not-found">
        <div>
          <h1>Product Not Found</h1>

          <p>
            Sorry, we couldn't find the watch you're looking for.
          </p>

          <Link to="/shop" className="details-back-button">
            <ArrowLeft size={17} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  // ================= CART =================

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  // ================= BUY NOW =================

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  // ================= RATING =================

  const reviewAverage =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : product.rating;

  // ================= RELATED PRODUCTS =================

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  // ================= DISCOUNT =================

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const wishlistActive = isInWishlist(product.id);

  return (
    <main className="product-details-page">

      {/* ================= BREADCRUMB ================= */}

      <div className="details-breadcrumb">
        <Link to="/shop">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <span>/</span>

        <span>{product.category}</span>

        <span>/</span>

        <strong>{product.name}</strong>
      </div>

      {/* ================= PRODUCT ================= */}

      <section className="product-details-container">

        {/* IMAGE AREA */}

        <div className="details-image-section">

          <div className="details-image">

            {product.badge && (
              <span className="details-badge">
                {product.badge}
              </span>
            )}

       {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="product-details-real-image"
  />
) : (
  <div className="large-watch">

    <div className="large-watch-strap top"></div>

    <div className="large-watch-case">

      <div className="large-watch-face">

        <span className="large-number twelve">
          12
        </span>

        <span className="large-number three">
          3
        </span>

        <span className="large-number six">
          6
        </span>

        <span className="large-number nine">
          9
        </span>

        <div className="large-watch-hand hour"></div>

        <div className="large-watch-hand minute"></div>

        <div className="large-watch-hand second"></div>

        <div className="large-watch-center"></div>

        <span className="watch-brand">
          WATCHME
        </span>

      </div>

    </div>

    <div className="large-watch-strap bottom"></div>

  </div>
)}
          </div>

        </div>

        {/* PRODUCT INFORMATION */}

        <div className="details-content">

          <span className="details-category">
            {product.category} · {product.collection}
          </span>

          <h1>{product.name}</h1>

          {/* RATING */}

          <div className="details-rating">

            <div className="rating-stars">
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
            </div>

            <strong>{product.rating}</strong>

            <span>
              {product.reviews} customer reviews
            </span>

          </div>

          {/* PRICE */}

          <div className="details-price">

            <div className="current-price">
              Rs. {product.price.toLocaleString()}
            </div>

            <del>
              Rs. {product.oldPrice.toLocaleString()}
            </del>

            <span className="discount">
              {discount}% OFF
            </span>

          </div>

          <div className="details-divider"></div>

          {/* DESCRIPTION */}

          <p className="details-description">
            {product.description}
          </p>

          {/* FEATURES */}

          <div className="product-features">

            <div>
              <Check size={16} />
              Premium quality design
            </div>

            <div>
              <Check size={16} />
              Comfortable everyday wear
            </div>

            <div>
              <Check size={16} />
              Carefully selected by WatchMe
            </div>

          </div>

          {/* QUANTITY */}

          <div className="quantity-section">

            <span>Quantity</span>

            <div className="quantity-control">

              <button
                type="button"
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="details-actions">

            <button
              type="button"
              className={`details-add-cart ${
                addedToCart ? "added" : ""
              }`}
              onClick={handleAddToCart}
            >
              {addedToCart ? (
                <>
                  <Check size={19} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={19} />
                  Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              className={`details-wishlist ${
                wishlistActive ? "active" : ""
              }`}
              onClick={() => toggleWishlist(product)}
              aria-label="Add to wishlist"
            >
              <Heart
                size={21}
                fill={
                  wishlistActive
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

          {/* BUY NOW */}

          <button
            type="button"
            className="buy-now-button"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

          {/* META */}

          <div className="product-meta">

            <div>
              <span>Category</span>
              <strong>{product.category}</strong>
            </div>

            <div>
              <span>Collection</span>
              <strong>{product.collection}</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong className="in-stock">
                In Stock
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* ================= SERVICE BENEFITS ================= */}

      <section className="details-benefits">

        <div className="details-benefit">

          <div className="benefit-symbol">
            <Truck size={21} />
          </div>

          <div>
            <strong>Fast Delivery</strong>
            <span>
              Delivered safely to your doorstep
            </span>
          </div>

        </div>

        <div className="details-benefit">

          <div className="benefit-symbol">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>Quality Guaranteed</strong>
            <span>
              Carefully selected products
            </span>
          </div>

        </div>

        <div className="details-benefit">

          <div className="benefit-symbol">
            <RotateCcw size={21} />
          </div>

          <div>
            <strong>Easy Returns</strong>
            <span>
              Simple and convenient returns
            </span>
          </div>

        </div>

      </section>

      {/* ================= CUSTOMER REVIEWS ================= */}

      <section className="product-reviews-section">

        <div className="reviews-heading">

          <div>
            <span className="section-label">
              CUSTOMER FEEDBACK
            </span>

            <h2>Reviews & Ratings</h2>
          </div>

          <div className="reviews-summary">

            <strong>{reviewAverage}</strong>

            <div className="summary-stars">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={17}
                  fill={
                    star <=
                    Math.round(Number(reviewAverage))
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}

            </div>

            <span>
              {reviews.length} customer review
              {reviews.length !== 1 ? "s" : ""}
            </span>

          </div>

        </div>

        <div className="reviews-layout">

          {/* REVIEWS LIST */}

          <div className="reviews-list">

            {reviews.length === 0 ? (

              <div className="no-reviews">

                <Star size={28} />

                <h3>No reviews yet</h3>

                <p>
                  Be the first customer to review this watch.
                </p>

              </div>

            ) : (

              reviews
                .slice()
                .reverse()
                .map((review) => (

                  <article
                    className="review-card"
                    key={review.id}
                  >

                    <div className="review-top">

                      <div>

                        <strong>
                          {review.name}
                        </strong>

                        <span>
                          {new Date(
                            review.date
                          ).toLocaleDateString()}
                        </span>

                      </div>

                      <div className="review-stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <Star
                              key={star}
                              size={15}
                              fill={
                                star <= review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                            />

                          )
                        )}

                      </div>

                    </div>

                    <p>
                      {review.text}
                    </p>

                  </article>

                ))

            )}

          </div>

          {/* REVIEW FORM */}

          <div className="review-form-card">

            <h3>Write a Review</h3>

            {!user ? (

              <div className="review-login-message">

                <p>
                  Please log in to leave a review.
                </p>

                <Link
                  to="/login"
                  className="review-login-button"
                >
                  Log In
                </Link>

              </div>

            ) : (

              <form onSubmit={handleReviewSubmit}>

                <label>
                  Your Rating
                </label>

                <div className="review-rating-input">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <button
                        key={star}
                        type="button"
                        className={
                          star <= reviewRating
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setReviewRating(star)
                        }
                        aria-label={`${star} star${
                          star > 1 ? "s" : ""
                        }`}
                      >

                        <Star
                          size={22}
                          fill="currentColor"
                        />

                      </button>

                    )
                  )}

                </div>

                <label htmlFor="review-text">
                  Your Review
                </label>

                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(e) =>
                    setReviewText(e.target.value)
                  }
                  placeholder="Share your experience with this watch..."
                  rows="5"
                  required
                />

                <button
                  type="submit"
                  className="submit-review-button"
                >
                  Submit Review
                </button>

                {reviewSubmitted && (

                  <div className="review-success">

                    <Check size={17} />

                    Review submitted successfully!

                  </div>

                )}

              </form>

            )}

          </div>

        </div>

      </section>

      {/* ================= RELATED PRODUCTS ================= */}

      {relatedProducts.length > 0 && (

        <section className="related-products-section">

          <div className="related-heading">

            <div>

              <span className="section-label">
                YOU MAY ALSO LIKE
              </span>

              <h2>Related Watches</h2>

            </div>

            <Link to="/shop">

              View All

              <ArrowLeft
                size={16}
                style={{
                  transform: "rotate(180deg)",
                }}
              />

            </Link>

          </div>

          <ProductGrid products={relatedProducts} />

        </section>

      )}

    </main>
  );
};

export default ProductDetails;
