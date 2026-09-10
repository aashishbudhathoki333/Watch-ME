import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import defaultProducts from "../data/products";

import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import "./Home.css";

const categories = [
  {
    title: "Men's Watches",
    description: "Bold designs for every occasion.",
    type: "men",
  },
  {
    title: "Women's Watches",
    description: "Elegant timepieces with effortless style.",
    type: "women",
  },
  {
    title: "Luxury Watches",
    description: "Premium craftsmanship & timeless detail.",
    type: "luxury",
  },
];

function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("watchmeProducts");

    if (savedProducts) {
      try {
        setProductList(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Unable to load saved products:", error);
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

  const featuredWatches = productList.slice(0, 4);

  const getCategoryImage = (type) => {
    const product = productList.find((item) => {
      const category = String(item.category || "").toLowerCase();
      const collection = String(item.collection || "").toLowerCase();
      const name = String(item.name || "").toLowerCase();

      if (type === "men") {
        return (
          category.includes("men") ||
          collection.includes("men") ||
          name.includes("men")
        );
      }

      if (type === "women") {
        return (
          category.includes("women") ||
          collection.includes("women") ||
          name.includes("women")
        );
      }

      if (type === "luxury") {
        return (
          category.includes("luxury") ||
          collection.includes("luxury") ||
          name.includes("luxury")
        );
      }

      return false;
    });

    return product?.image || "";
  };

  const { addToCart } = useContext(CartContext);

  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const heroWatch = productList[0];

  return (
    <main className="home-page">

      {/* =====================================================
          ANNOUNCEMENT BAR
      ===================================================== */}

      <div className="announcement-bar">
        <div className="announcement-inner">

          <span className="announcement-star">✦</span>

          <strong>WATCHME 2026 COLLECTION</strong>

          <span className="announcement-separator">
            —
          </span>

          <span className="announcement-message">
            Free shipping on orders over Rs. 5,000
          </span>

          <Link to="/shop" className="announcement-link">
            Shop Now
            <ArrowRight size={13} />
          </Link>

        </div>
      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-content">

          <div className="hero-exclusive">
            <span className="exclusive-dot"></span>
            NEW SEASON · 2026
          </div>

          <span className="hero-tag">
            TIMELESS COLLECTION
          </span>

          <h1>
            Time is your
            <span>statement.</span>
          </h1>

          <p>
            Discover carefully crafted timepieces designed to
            elevate your style, from everyday essentials to
            sophisticated luxury classics.
          </p>

          <div className="hero-buttons">

            <Link
              to="/shop"
              className="btn-primary hero-main-button"
            >
              Shop Collection
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/categories"
              className="btn-secondary"
            >
              Explore Categories
            </Link>

          </div>


          {/* HERO STATS */}

          <div className="hero-trust">

            <div className="trust-item">
              <strong>500+</strong>
              <span>Premium Watches</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>4.9</strong>
              <span>Customer Rating</span>
            </div>

          </div>

        </div>


        {/* =================================================
            HERO WATCH
        ================================================= */}

        <div className="hero-watch-area">

          <div className="hero-grid-pattern"></div>

          <div className="hero-circle"></div>

          <div className="hero-ring ring-one"></div>
          <div className="hero-ring ring-two"></div>


          {heroWatch?.image ? (

            <img
              src={heroWatch.image}
              alt={heroWatch.name}
              className="hero-product-image"
            />

          ) : (

            <div className="hero-watch">

              <div className="watch-crown"></div>

              <div className="watch-face">

                <div className="watch-marker marker-12">
                  12
                </div>

                <div className="watch-marker marker-3">
                  3
                </div>

                <div className="watch-marker marker-6">
                  6
                </div>

                <div className="watch-marker marker-9">
                  9
                </div>

                <div className="watch-hand hour-hand"></div>
                <div className="watch-hand minute-hand"></div>
                <div className="watch-hand second-hand"></div>

                <div className="watch-center"></div>

              </div>

            </div>

          )}


          {/* RATING CARD */}

          <div className="hero-floating-card hero-rating-card">

            <div className="floating-icon gold">
              <Star
                size={17}
                fill="currentColor"
              />
            </div>

            <div className="floating-card-text">
              <strong>4.9 / 5</strong>
              <span>Customer rating</span>
            </div>

          </div>


          {/* AUTHENTIC CARD */}

          <div className="hero-floating-card hero-auth-card">

            <div className="floating-icon dark">
              <ShieldCheck size={17} />
            </div>

            <div className="floating-card-text">
              <strong>100% Authentic</strong>
              <span>Quality guaranteed</span>
            </div>

          </div>


          {/* PRICE CARD */}

          <div className="hero-floating-price">

            <span>Starting from</span>

            <strong>
              Rs. 4,999
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          BRAND STRIP
      ===================================================== */}

      <div className="collection-strip">

        <div className="collection-track">

          <span>TIMELESS DESIGN</span>
          <b>✦</b>

          <span>PRECISION CRAFTED</span>
          <b>✦</b>

          <span>PREMIUM QUALITY</span>
          <b>✦</b>

          <span>WATCHME 2026</span>
          <b>✦</b>

          <span>TIMELESS DESIGN</span>
          <b>✦</b>

          <span>PRECISION CRAFTED</span>
          <b>✦</b>

          <span>PREMIUM QUALITY</span>
          <b>✦</b>

          <span>WATCHME 2026</span>
          <b>✦</b>

        </div>

      </div>


      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}

      <section className="categories-section">

        <div className="section-heading">

          <div>

            <span className="section-label">
              EXPLORE COLLECTIONS
            </span>

            <h2>
              Shop by Category
            </h2>

            <p className="section-description">
              Find the perfect timepiece for every style,
              occasion and personality.
            </p>

          </div>

          <Link
            to="/categories"
            className="view-all"
          >
            View All
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="category-grid">

          {categories.map((category, index) => {

            const image = getCategoryImage(category.type);

            return (

             <Link
  to={
    category.type === "men"
      ? "/shop?category=Men"
      : category.type === "women"
      ? "/shop?category=Women"
      : "/shop?category=Luxury"
  }
  className={`category-card category-${category.type}`}
  key={category.title}
>

                {image ? (

                  <img
                    src={image}
                    alt={category.title}
                    className="category-image"
                  />

                ) : (

                  <div className="category-image-placeholder">
                    <span>WATCHME</span>
                  </div>

                )}

                <div className="category-overlay"></div>

                <div className="category-number">
                  0{index + 1}
                </div>

                <div className="category-content">

                  <div className="category-icon">

                    {category.type === "luxury"
                      ? "✦"
                      : "⌚"}

                  </div>

                  <div className="category-text">

                    <span className="category-small-label">
                      COLLECTION
                    </span>

                    <h3>
                      {category.title}
                    </h3>

                    <p>
                      {category.description}
                    </p>

                  </div>

                  <div className="category-arrow">
                    <ArrowRight size={21} />
                  </div>

                </div>

              </Link>

            );
          })}

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="featured-section">

        <div className="section-heading">

          <div>

            <span className="section-label">
              OUR COLLECTION
            </span>

            <h2>
              Featured Watches
            </h2>

            <p className="section-description">
              Discover some of our most loved timepieces.
            </p>

          </div>

          <Link
            to="/shop"
            className="view-all"
          >
            Shop All
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="product-grid">

          {featuredWatches.map((watch, index) => {

            const wishlistActive =
              isInWishlist(watch.id);

            return (

              <article
                className="home-product-card"
                key={watch.id}
              >

                {/* PRODUCT IMAGE */}

                <div
                  className={`product-image ${
                    watch.color || ""
                  }`}
                >

                  <div className="product-top-badge">

                    {index === 0
                      ? "BEST SELLER"
                      : index === 1
                      ? "NEW"
                      : "TRENDING"}

                  </div>


                  {watch.image ? (

                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="product-real-image"
                    />

                  ) : (

                    <div className="watch-placeholder">

                      <div className="mini-watch">

                        <div className="mini-watch-face">
                          <span></span>
                        </div>

                      </div>

                    </div>

                  )}


                  {/* WISHLIST */}

                  <button
                    className={`wishlist-button ${
                      wishlistActive ? "active" : ""
                    }`}
                    type="button"
                    aria-label={
                      wishlistActive
                        ? `Remove ${watch.name} from wishlist`
                        : `Add ${watch.name} to wishlist`
                    }
                    onClick={() =>
                      toggleWishlist(watch)
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


                  {/* QUICK VIEW */}

                  <Link
                    to={`/products/${watch.id}`}
                    className="quick-view"
                  >
                    Quick View
                    <ArrowRight size={15} />
                  </Link>

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="product-info">

                  <span className="product-category">
                    {watch.category || "WATCH"}
                  </span>


                  <Link
                    to={`/products/${watch.id}`}
                    className="product-name"
                  >
                    {watch.name}
                  </Link>


                  {/* RATING */}

                  <div className="rating">

                    <Star
                      size={14}
                      fill="currentColor"
                    />

                    <span>
                      {watch.rating || "4.9"}
                    </span>

                    <span className="review-count">
                      ({watch.reviews || 0} reviews)
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="product-bottom">

                    <div className="price">

                      <strong>
                        Rs.{" "}
                        {Number(
                          watch.price || 0
                        ).toLocaleString()}
                      </strong>

                      {watch.oldPrice && (
                        <del>
                          Rs.{" "}
                          {Number(
                            watch.oldPrice
                          ).toLocaleString()}
                        </del>
                      )}

                    </div>


                    {/* ADD CART */}

                    <button
                      className="add-cart"
                      type="button"
                      aria-label={`Add ${watch.name} to cart`}
                      onClick={() =>
                        addToCart(watch)
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


        {/* EMPTY STATE */}

        {featuredWatches.length === 0 && (

          <div className="empty-products">

            <ShoppingBag size={35} />

            <h3>
              No watches available
            </h3>

            <p>
              Add some products to your collection
              to see them here.
            </p>

            <Link
              to="/shop"
              className="btn-primary"
            >
              Browse Shop
              <ArrowRight size={17} />
            </Link>

          </div>

        )}

      </section>


      {/* =====================================================
          PROMO
      ===================================================== */}

      <section className="promo-section">

        <div className="promo-pattern"></div>

        <div className="promo-content">

          <div className="promo-badge">
            <Sparkles size={14} />
            WATCHME EXCLUSIVE
          </div>

          <span className="section-label">
            YOUR TIME. YOUR STYLE.
          </span>

          <h2>
            Find the watch that
            <span> defines you.</span>
          </h2>

          <p>
            From minimal everyday watches to sophisticated
            luxury timepieces, discover something made
            specifically for your wrist.
          </p>

          <Link
            to="/shop"
            className="btn-primary promo-button"
          >
            Discover Watches
            <ArrowRight size={18} />
          </Link>

        </div>


        <div className="promo-decoration">

          <div className="promo-orbit orbit-one"></div>
          <div className="promo-orbit orbit-two"></div>

          <div className="promo-watch">

            <div className="promo-strap promo-strap-top"></div>
            <div className="promo-strap promo-strap-bottom"></div>

            <div className="promo-face">

              <span>WATCHME</span>

              <div className="promo-markers"></div>

              <div className="promo-hand promo-hour"></div>
              <div className="promo-hand promo-minute"></div>

              <div className="promo-dot"></div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="benefits-section">

        <div className="section-heading centered">

          <div>

            <span className="section-label">
              THE WATCHME PROMISE
            </span>

            <h2>
              Why Shop With Us?
            </h2>

            <p className="section-description centered-description">
              Everything you need for a confident
              watch-buying experience.
            </p>

          </div>

        </div>


        <div className="benefits-grid">

          <div className="benefit-card">

            <div className="benefit-icon">
              <Truck size={25} />
            </div>

            <div className="benefit-number">
              01
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your favorite timepiece delivered
              safely and quickly to your doorstep.
            </p>

            <span className="benefit-check">
              <CheckCircle2 size={14} />
              Safe & reliable shipping
            </span>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              <ShieldCheck size={25} />
            </div>

            <div className="benefit-number">
              02
            </div>

            <h3>
              Authentic Products
            </h3>

            <p>
              Every watch is carefully selected for
              quality, craftsmanship and authenticity.
            </p>

            <span className="benefit-check">
              <CheckCircle2 size={14} />
              Quality guaranteed
            </span>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              <RotateCcw size={25} />
            </div>

            <div className="benefit-number">
              03
            </div>

            <h3>
              Easy Returns
            </h3>

            <p>
              Shop confidently with our simple and
              convenient return process.
            </p>

            <span className="benefit-check">
              <CheckCircle2 size={14} />
              Hassle-free experience
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="newsletter-section">

        <div className="newsletter-decoration">
          ✦
        </div>

        <div className="newsletter-content">

          <span className="section-label">
            STAY IN THE LOOP
          </span>

          <h2>
            Never miss a moment.
          </h2>

          <p>
            Subscribe for new collections, exclusive
            offers and watch inspiration.
          </p>

        </div>


        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >

          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
          />

          <button type="submit">

            Subscribe

            <ArrowRight size={17} />

          </button>

        </form>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta">

        <div className="final-cta-content">

          <span>
            TIME IS PRECIOUS
          </span>

          <h2>
            Wear yours well.
          </h2>

          <Link
            to="/shop"
            className="final-cta-link"
          >
            Explore the collection
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;
