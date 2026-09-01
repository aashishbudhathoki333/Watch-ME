import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import ProductGrid from "../components/ProductGrid";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

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

          </div>

          <div className="image-note">
            Product images will be added later.
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

          <Link
            to="/checkout"
            className="buy-now-button"
          >
            Buy Now
          </Link>

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