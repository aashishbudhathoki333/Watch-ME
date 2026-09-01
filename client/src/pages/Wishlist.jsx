import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const {
    wishlistItems,
    toggleWishlist,
  } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  /* =========================
     EMPTY WISHLIST
  ========================= */

  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-empty-page">
        <div className="wishlist-empty-content">

          <div className="wishlist-empty-icon">
            <Heart size={38} />
          </div>

          <span className="section-label">
            YOUR FAVORITES
          </span>

          <h1>Your wishlist is empty</h1>

          <p>
            Save the watches you love and keep them
            together in one place.
          </p>

          <Link
            to="/shop"
            className="wishlist-shop-btn"
          >
            Explore Watches
            <ArrowRight size={18} />
          </Link>

        </div>
      </main>
    );
  }

  /* =========================
     WISHLIST
  ========================= */

  return (
    <main className="wishlist-page">

      {/* PAGE HEADER */}

      <section className="wishlist-header">
        <div>
          <span className="section-label">
            YOUR FAVORITES
          </span>

          <h1>Wishlist</h1>

          <p>
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "watch"
              : "watches"}{" "}
            saved for later.
          </p>
        </div>

        <Heart
          className="wishlist-header-icon"
          size={80}
        />
      </section>

      {/* WISHLIST PRODUCTS */}

      <section className="wishlist-content">

        <div className="wishlist-grid">

          {wishlistItems.map((product) => (
            <article
              className="wishlist-card"
              key={product.id}
            >

              {/* IMAGE */}

              <div className="wishlist-image">

                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                <button
                  type="button"
                  className="wishlist-remove"
                  onClick={() =>
                    toggleWishlist(product)
                  }
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={17} />
                </button>

                {product.oldPrice &&
                  product.oldPrice > product.price && (
                    <span className="wishlist-sale">
                      SALE
                    </span>
                  )}

              </div>

              {/* INFO */}

              <div className="wishlist-info">

                <p className="wishlist-brand">
                  {product.brand}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="wishlist-name"
                >
                  {product.name}
                </Link>

                <div className="wishlist-price">

                  <strong>
                    Rs.{" "}
                    {product.price.toLocaleString()}
                  </strong>

                  {product.oldPrice &&
                    product.oldPrice > product.price && (
                      <del>
                        Rs.{" "}
                        {product.oldPrice.toLocaleString()}
                      </del>
                    )}

                </div>

                {/* ADD TO CART */}

                <button
                  type="button"
                  className="wishlist-add-cart"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  <ShoppingBag size={17} />
                  Add to Cart
                </button>

              </div>

            </article>
          ))}

        </div>

      </section>

      {/* BOTTOM CTA */}

      <section className="wishlist-bottom">

        <div>
          <span className="section-label">
            STILL LOOKING?
          </span>

          <h2>
            Find your perfect
            <span> timepiece.</span>
          </h2>
        </div>

        <Link
          to="/shop"
          className="wishlist-bottom-btn"
        >
          Continue Shopping
          <ArrowRight size={18} />
        </Link>

      </section>

    </main>
  );
};

export default Wishlist;