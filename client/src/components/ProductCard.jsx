import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

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
          className="quick-cart"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={17} />
          Add to Cart
        </button>
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>

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
      </div>
    </article>
  );
};

export default ProductCard;