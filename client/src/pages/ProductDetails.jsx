import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ArrowLeft,
} from "lucide-react";

import products from "../data/products";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import ProductGrid from "../components/ProductGrid";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="not-found">
        <h1>Product Not Found</h1>
        <Link to="/shop" className="btn btn-dark">
          Back to Shop
        </Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="product-details-page">
      <div className="breadcrumb">
        <Link to="/shop">
          <ArrowLeft size={15} />
          Back to Shop
        </Link>
      </div>

      <section className="product-details">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-content">
          <p className="product-brand">
            {product.brand}
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <Star size={16} fill="currentColor" />
            <span>{product.rating}</span>
            <span>
              ({product.reviews} customer reviews)
            </span>
          </div>

          <div className="details-price">
            Rs. {product.price.toLocaleString()}
            <del>
              Rs. {product.oldPrice.toLocaleString()}
            </del>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="features-list">
            {product.features.map((feature) => (
              <div key={feature}>✓ {feature}</div>
            ))}
          </div>

          <div className="quantity-row">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
              >
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="details-actions">
            <button
              type="button"
              className="btn btn-dark add-cart-large"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button
              type="button"
              className={`wishlist-large ${
                isInWishlist(product.id)
                  ? "active"
                  : ""
              }`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                size={20}
                fill={
                  isInWishlist(product.id)
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>

          <div className="product-meta">
            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>
            <p>
              <strong>Style:</strong> {product.type}
            </p>
            <p>
              <strong>Availability:</strong> In Stock
            </p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section related-section">
          <div className="section-heading">
            <div>
              <p className="section-label">YOU MAY ALSO LIKE</p>
              <h2>Related Watches</h2>
            </div>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </main>
  );
};

export default ProductDetails;