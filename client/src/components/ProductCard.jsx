import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const stock = Number(product.stock ?? 0);

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const getStockStatus = () => {
    if (stock === 0) {
      return {
        text: "Out of Stock",
        className: "out-of-stock",
      };
    }

    if (stock <= 5) {
      return {
        text: `Only ${stock} left`,
        className: "low-stock",
      };
    }

    return {
      text: "In Stock",
      className: "in-stock",
    };
  };

  const stockStatus = getStockStatus();

  const handleAddToCart = () => {
    if (stock === 0) return;

    addToCart(product);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>

        <span className="discount-badge">
          -{discount}%
        </span>

        <button
          type="button"
          className={`wishlist-button ${
            isInWishlist(product.id) ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
        >
          <Heart
            size={19}
            fill={
              isInWishlist(product.id)
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <button
          type="button"
          className={`quick-cart ${
            stock === 0 ? "disabled" : ""
          }`}
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          <ShoppingBag size={17} />

          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      <div className="product-info">
        <p className="product-brand">
          {product.brand}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <div className="product-rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <small>({product.reviews})</small>
        </div>

        <div className="product-price">
          <strong>
            Rs. {product.price.toLocaleString()}
          </strong>

          <del>
            Rs. {product.oldPrice.toLocaleString()}
          </del>
        </div>

        {/* STOCK STATUS */}
        <div
          className={`product-stock ${stockStatus.className}`}
        >
          {stockStatus.text}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;