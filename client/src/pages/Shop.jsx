import { useContext, useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import defaultProducts from "../data/products";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import "./Shop.css";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [showFilters, setShowFilters] = useState(false);
const [productList, setProductList] = useState([]);

useEffect(() => {
  const savedProducts = localStorage.getItem("watchmeProducts");

  if (savedProducts) {
    setProductList(JSON.parse(savedProducts));
  } else {
    setProductList(defaultProducts);
    localStorage.setItem(
      "watchmeProducts",
      JSON.stringify(defaultProducts)
    );
  }
}, []);
  /* =========================
     CONTEXTS
  ========================= */

  const { addToCart } = useContext(CartContext);

  const {
    toggleWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const categories = ["All", "Men", "Women", "Luxury"];

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {
    let result = productList.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesPrice =
        product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
      productList,
    searchTerm,
    category,
    maxPrice,
    sortBy,
  ]);

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setMaxPrice(30000);
    setSortBy("featured");
  };

  /* =========================
     WISHLIST
  ========================= */

  const handleWishlist = (product) => {
    toggleWishlist(product);
  };

  /* =========================
     CART
  ========================= */

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <main className="shop-page">

      {/* ================= HEADER ================= */}

      <section className="shop-header">
        <div>
          <span className="section-label">
            WATCHME COLLECTION
          </span>

          <h1>Shop Watches</h1>

          <p>
            Discover timepieces designed to match
            your style, personality and every moment.
          </p>
        </div>
      </section>

      {/* ================= SHOP SECTION ================= */}

      <section className="shop-section">

        {/* ================= TOOLBAR ================= */}

        <div className="shop-toolbar">

          <button
            type="button"
            className="filter-toggle"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search watches..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                <X size={15} />
              </button>
            )}

          </div>

          <div className="sort-box">

            <label htmlFor="sort">
              Sort:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="name">
                Name: A-Z
              </option>
            </select>

          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div
          className={`filters ${
            showFilters ? "show" : ""
          }`}
        >

          <div className="filter-group">

            <h3>Category</h3>

            <div className="category-filter">

              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    category === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          <div className="filter-group price-filter">

            <div className="price-heading">

              <h3>Maximum Price</h3>

              <span>
                Rs.{" "}
                {maxPrice.toLocaleString()}
              </span>

            </div>

            <input
              type="range"
              min="5000"
              max="30000"
              step="1000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  Number(e.target.value)
                )
              }
            />

            <div className="price-range">
              <span>Rs. 5,000</span>
              <span>Rs. 30,000</span>
            </div>

          </div>

          <button
            type="button"
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {/* ================= RESULTS ================= */}

        <div className="results-header">

          <span>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "watch"
              : "watches"}
          </span>

        </div>

        {/* ================= PRODUCTS ================= */}

        {filteredProducts.length > 0 ? (

          <div className="shop-product-grid">

            {filteredProducts.map((product) => {

              const wishlistActive =
                isInWishlist(product.id);

              const discount = Math.round(
                ((product.oldPrice -
                  product.price) /
                  product.oldPrice) *
                  100
              );

              return (
                <article
                  className="shop-product-card"
                  key={product.id}
                >

                  {/* ================= IMAGE ================= */}

                  <div
                    className={`shop-product-image ${
                      product.color
                    }`}
                  >

                    {product.badge && (
                      <span className="shop-product-badge">
                        {product.badge}
                      </span>
                    )}

                    {/* WISHLIST */}

                    <button
                      type="button"
                      className={`shop-wishlist ${
                        wishlistActive
                          ? "active"
                          : ""
                      }`}
                      aria-label={
                        wishlistActive
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      onClick={() =>
                        handleWishlist(product)
                      }
                    >
                      <Heart
                        size={19}
                        fill={
                          wishlistActive
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* WATCH PLACEHOLDER */}

                    <div className="shop-watch">

                      <div className="shop-watch-face">

                        <span className="watch-number top">
                          12
                        </span>

                        <span className="watch-number right">
                          3
                        </span>

                        <span className="watch-number bottom">
                          6
                        </span>

                        <span className="watch-number left">
                          9
                        </span>

                        <div className="shop-watch-hand hour"></div>

                        <div className="shop-watch-hand minute"></div>

                        <div className="shop-watch-dot"></div>

                      </div>

                    </div>

                    {/* DISCOUNT */}

                    <span className="discount-badge">
                      -{discount}%
                    </span>

                    {/* VIEW DETAILS */}

                    <Link
                      to={`/products/${product.id}`}
                      className="shop-quick-view"
                    >
                      View Details
                    </Link>

                  </div>

                  {/* ================= PRODUCT INFO ================= */}

                  <div className="shop-product-info">

                    <span className="shop-product-category">
                      {product.category} ·{" "}
                      {product.collection}
                    </span>

                    <Link
                      to={`/products/${product.id}`}
                      className="shop-product-name"
                    >
                      {product.name}
                    </Link>

                    {/* RATING */}

                    <div className="shop-rating">

                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      <strong>
                        {product.rating}
                      </strong>

                      <span>
                        ({product.reviews})
                      </span>

                    </div>

                    {/* PRICE + CART */}

                    <div className="shop-product-bottom">

                      <div className="shop-price">

                        <strong>
                          Rs.{" "}
                          {product.price.toLocaleString()}
                        </strong>

                        <del>
                          Rs.{" "}
                          {product.oldPrice.toLocaleString()}
                        </del>

                      </div>

                      <button
                        type="button"
                        className="shop-add-cart"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() =>
                          handleAddToCart(product)
                        }
                      >
                        <ShoppingBag size={18} />
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        ) : (


          <div className="empty-shop">

            <div className="empty-shop-icon">
              <Search size={28} />
            </div>

            <h2>No watches found</h2>

            <p>
              We couldn't find any watches
              matching your current filters.
            </p>

            <button
              type="button"
              className="empty-shop-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}

      </section>

    </main>
  );
}

export default Shop;