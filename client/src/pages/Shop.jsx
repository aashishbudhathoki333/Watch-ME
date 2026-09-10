import { useContext, useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  Star,
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import defaultProducts from "../data/products";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import "./Shop.css";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

const urlCategory = searchParams.get("category");

const [category, setCategory] = useState(
  urlCategory
    ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1).toLowerCase()
    : "All"
);
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [showFilters, setShowFilters] = useState(false);
  const [productList, setProductList] = useState([]);

  /* =========================
     LOAD PRODUCTS
  ========================= */

  useEffect(() => {
    const savedProducts = localStorage.getItem("watchmeProducts");

    if (savedProducts) {
      try {
        setProductList(JSON.parse(savedProducts));
      } catch (error) {
        setProductList(defaultProducts);
        localStorage.setItem(
          "watchmeProducts",
          JSON.stringify(defaultProducts)
        );
      }
    } else {
      setProductList(defaultProducts);

      localStorage.setItem(
        "watchmeProducts",
        JSON.stringify(defaultProducts)
      );
    }
  }, []);

  useEffect(() => {
  const urlCategory = searchParams.get("category");

  if (urlCategory) {
    const formattedCategory =
      urlCategory.charAt(0).toUpperCase() +
      urlCategory.slice(1).toLowerCase();

    if (["Men", "Women", "Luxury"].includes(formattedCategory)) {
      setCategory(formattedCategory);
    }
  } else {
    setCategory("All");
  }
}, [searchParams]);

  /* =========================
     CONTEXTS
  ========================= */

  const { addToCart } = useContext(CartContext);

  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  /* =========================
     CATEGORIES
  ========================= */

  const categories = ["All", "Men", "Women", "Luxury"];

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {
    let result = productList.filter((product) => {
      const productName = String(product.name || "").toLowerCase();
      const productCategory = String(
        product.category || ""
      ).toLowerCase();
      const productCollection = String(
        product.collection || ""
      ).toLowerCase();

      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        productName.includes(query) ||
        productCategory.includes(query) ||
        productCollection.includes(query);

      const selectedCategory = category.toLowerCase();

      const matchesCategory =
        category === "All" ||
        productCategory.includes(selectedCategory) ||
        productCollection.includes(selectedCategory);

      const matchesPrice =
        Number(product.price || 0) <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
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
     DISCOUNT
  ========================= */

  const getDiscount = (product) => {
    const oldPrice = Number(product.oldPrice || 0);
    const price = Number(product.price || 0);

    if (!oldPrice || oldPrice <= price) {
      return 0;
    }

    return Math.round(
      ((oldPrice - price) / oldPrice) * 100
    );
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <main className="shop-page">

      {/* =====================================================
          PREMIUM SHOP HERO
      ===================================================== */}

      <section className="shop-hero">

        <div className="shop-hero-glow glow-one"></div>
        <div className="shop-hero-glow glow-two"></div>

        <div className="shop-hero-content">

          <div className="shop-eyebrow">
            <Sparkles size={14} />
            WATCHME COLLECTION 2026
          </div>

          <h1>
            Find your
            <span> perfect time.</span>
          </h1>

          <p>
            Explore our curated collection of
            sophisticated timepieces crafted for
            every style, occasion and moment.
          </p>

          <div className="shop-hero-stats">

            <div className="hero-stat">
              <strong>500+</strong>
              <span>Timepieces</span>
            </div>

            <div className="hero-stat">
              <strong>4.9</strong>
              <span>Average Rating</span>
            </div>

            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>

          </div>

        </div>

        {/* Decorative watch */}

        <div className="shop-hero-art">

          <div className="hero-art-circle"></div>

          <div className="decorative-watch">

            <div className="decorative-watch-strap top"></div>
            <div className="decorative-watch-strap bottom"></div>

            <div className="decorative-watch-face">

              <span className="decorative-number n12">
                12
              </span>

              <span className="decorative-number n3">
                3
              </span>

              <span className="decorative-number n6">
                6
              </span>

              <span className="decorative-number n9">
                9
              </span>

              <div className="decorative-hand hand-one"></div>
              <div className="decorative-hand hand-two"></div>
              <div className="decorative-dot"></div>

            </div>

          </div>

          <div className="floating-review">

            <div className="review-stars">
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
            </div>

            <strong>4.9 / 5</strong>
            <span>Customer rated</span>

          </div>

        </div>

      </section>

      {/* =====================================================
          SHOP CONTENT
      ===================================================== */}

      <section className="shop-section">

        {/* =================================================
            TOP BAR
        ================================================= */}

        <div className="shop-topbar">

          <div className="shop-heading">

            <span className="small-label">
              THE COLLECTION
            </span>

            <h2>
              Explore Watches
            </h2>

            <p>
              Designed to make every second count.
            </p>

          </div>

          <div className="collection-count">

            <strong>
              {filteredProducts.length}
            </strong>

            <span>
              {filteredProducts.length === 1
                ? "watch available"
                : "watches available"}
            </span>

          </div>

        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="premium-toolbar">

          <button
            type="button"
            className={`filter-button ${
              showFilters ? "active" : ""
            }`}
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <SlidersHorizontal size={17} />

            <span>
              Filters
            </span>

            <span className="filter-indicator">
              {category !== "All" ||
              maxPrice < 30000
                ? "•"
                : ""}
            </span>
          </button>

          <div className="premium-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search by watch name, collection..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            {searchTerm && (
              <button
                type="button"
                className="search-clear"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                <X size={15} />
              </button>
            )}

          </div>

          <div className="premium-sort">

            <span>Sort by</span>

            <select
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

        {/* =================================================
            FILTER PANEL
        ================================================= */}

        <div
          className={`premium-filters ${
            showFilters ? "show" : ""
          }`}
        >

          <div className="filter-column">

            <span className="filter-title">
              CATEGORY
            </span>

            <div className="premium-category-buttons">

              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    category === item
                      ? "active"
                      : ""
                  }
                 onClick={() => {
  setCategory(item);

  if (item === "All") {
    setSearchParams({});
  } else {
    setSearchParams({
      category: item,
    });
  }
}}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          <div className="filter-column price-column">

            <div className="price-filter-heading">

              <span className="filter-title">
                MAXIMUM PRICE
              </span>

              <strong>
                Rs. {maxPrice.toLocaleString()}
              </strong>

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

            <div className="range-labels">
              <span>
                Rs. 5,000
              </span>

              <span>
                Rs. 30,000
              </span>
            </div>

          </div>

          <button
            type="button"
            className="clear-filter-button"
            onClick={clearFilters}
          >
            Reset
          </button>

        </div>

        {/* =================================================
            ACTIVE FILTERS
        ================================================= */}

        {(category !== "All" ||
          maxPrice < 30000 ||
          searchTerm) && (
          <div className="active-filters">

            <span>
              Active filters:
            </span>

            {searchTerm && (
              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                "{searchTerm}"
                <X size={12} />
              </button>
            )}

            {category !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setCategory("All")
                }
              >
                {category}
                <X size={12} />
              </button>
            )}

            {maxPrice < 30000 && (
              <button
                type="button"
                onClick={() =>
                  setMaxPrice(30000)
                }
              >
                Under Rs.{" "}
                {maxPrice.toLocaleString()}
                <X size={12} />
              </button>
            )}

            <button
              type="button"
              className="remove-all"
              onClick={clearFilters}
            >
              Clear all
            </button>

          </div>
        )}

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        {filteredProducts.length > 0 ? (

          <div className="premium-product-grid">

            {filteredProducts.map((product) => {

              const wishlistActive =
                isInWishlist(product.id);

              const discount =
                getDiscount(product);

              return (
                <article
                  className="premium-product-card"
                  key={product.id}
                >

                  {/* IMAGE AREA */}

                  <div
                    className={`premium-product-image ${
                      product.color || ""
                    }`}
                  >

                    {/* Product badge */}

                    {product.badge && (
                      <span className="premium-badge">
                        {product.badge}
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="sale-badge">
                        -{discount}%
                      </span>
                    )}

                    {/* Wishlist */}

                    <button
                      type="button"
                      className={`premium-wishlist ${
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
                        toggleWishlist(product)
                      }
                    >
                      <Heart
                        size={18}
                        fill={
                          wishlistActive
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* Image */}

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="premium-product-real-image"
                      />

                    ) : (

                      <div className="premium-watch-placeholder">

                        <div className="placeholder-watch">

                          <div className="placeholder-strap top"></div>

                          <div className="placeholder-body">

                            <div className="placeholder-face">

                              <span className="placeholder-12">
                                12
                              </span>

                              <span className="placeholder-3">
                                3
                              </span>

                              <span className="placeholder-6">
                                6
                              </span>

                              <span className="placeholder-9">
                                9
                              </span>

                              <div className="placeholder-hour"></div>
                              <div className="placeholder-minute"></div>
                              <div className="placeholder-center"></div>

                            </div>

                          </div>

                          <div className="placeholder-strap bottom"></div>

                        </div>

                      </div>

                    )}

                    {/* Hover overlay */}

                    <div className="product-hover-overlay">

                      <Link
                        to={`/products/${product.id}`}
                        className="view-product-button"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </Link>

                    </div>

                  </div>

                  {/* PRODUCT INFO */}

                  <div className="premium-product-info">

                    <div className="product-meta-row">

                      <span className="premium-product-category">
                        {product.category}
                      </span>

                      {product.collection && (
                        <span className="product-collection">
                          {product.collection}
                        </span>
                      )}

                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="premium-product-name"
                    >
                      {product.name}
                    </Link>

                    {/* Rating */}

                    <div className="premium-rating">

                      <div className="rating-stars">

                        <Star
                          size={13}
                          fill="currentColor"
                        />

                        <Star
                          size={13}
                          fill="currentColor"
                        />

                        <Star
                          size={13}
                          fill="currentColor"
                        />

                        <Star
                          size={13}
                          fill="currentColor"
                        />

                        <Star
                          size={13}
                          fill="currentColor"
                        />

                      </div>

                      <strong>
                        {product.rating}
                      </strong>

                      <span>
                        ({product.reviews || 0})
                      </span>

                    </div>

                    {/* Price */}

                    <div className="premium-product-bottom">

                      <div className="premium-price">

                        <strong>
                          Rs.{" "}
                          {Number(
                            product.price || 0
                          ).toLocaleString()}
                        </strong>

                        {product.oldPrice &&
                          product.oldPrice >
                            product.price && (
                            <del>
                              Rs.{" "}
                              {Number(
                                product.oldPrice
                              ).toLocaleString()}
                            </del>
                          )}

                      </div>

                      <button
                        type="button"
                        className="premium-cart-button"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        <ShoppingBag size={17} />
                        <span>
                          Add
                        </span>
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="premium-empty">

            <div className="empty-icon">
              <Search size={28} />
            </div>

            <span className="small-label">
              NOTHING FOUND
            </span>

            <h2>
              No watches match your search
            </h2>

            <p>
              Try changing your search or
              adjusting the filters to discover
              more timepieces.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
              <ArrowRight size={16} />
            </button>

          </div>

        )}

        {/* =================================================
            TRUST STRIP
        ================================================= */}

        <div className="shop-trust-strip">

          <div className="trust-item">

            <div className="trust-icon">
              <Truck size={20} />
            </div>

            <div>
              <strong>
                Fast Delivery
              </strong>

              <span>
                Delivered safely to your door
              </span>
            </div>

          </div>

          <div className="trust-item">

            <div className="trust-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>
                Authentic Watches
              </strong>

              <span>
                Quality checked timepieces
              </span>
            </div>

          </div>

          <div className="trust-item">

            <div className="trust-icon">
              <RotateCcw size={20} />
            </div>

            <div>
              <strong>
                Easy Returns
              </strong>

              <span>
                Shop with complete confidence
              </span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Shop;
