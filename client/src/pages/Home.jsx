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
} from "lucide-react";
import "./Home.css";


const categories = [
  {
    title: "Men's Watches",
    description: "Bold designs for every occasion",
    icon: "⌚",
  },
  {
    title: "Women's Watches",
    description: "Elegant timepieces with style",
    icon: "◉",
  },
  {
    title: "Luxury Watches",
    description: "Premium craftsmanship & detail",
    icon: "✦",
  },
];

function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const savedProducts =
      localStorage.getItem("watchmeProducts");

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

  const featuredWatches = productList.slice(0, 4);

  const { addToCart } = useContext(CartContext);

  const {
    toggleWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  return (
    <main className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">TIMELESS COLLECTION 2026</span>

          <h1>
            Time is your
            <span> statement.</span>
          </h1>

          <p>
            Discover carefully crafted timepieces designed to elevate
            your style, from everyday essentials to luxury classics.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="btn-primary">
              Shop Collection
              <ArrowRight size={18} />
            </Link>

            <Link to="/categories" className="btn-secondary">
              Explore Categories
            </Link>
          </div>

          <div className="hero-trust">
            <div>
              <strong>500+</strong>
              <span>Watches</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>

            <div>
              <strong>4.9/5</strong>
              <span>Customer Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-watch-area">
          <div className="hero-circle"></div>

          <div className="hero-watch">
            <div className="watch-crown"></div>
            <div className="watch-face">
              <div className="watch-marker marker-12">12</div>
              <div className="watch-marker marker-3">3</div>
              <div className="watch-marker marker-6">6</div>
              <div className="watch-marker marker-9">9</div>

              <div className="watch-hand hour-hand"></div>
              <div className="watch-hand minute-hand"></div>
              <div className="watch-hand second-hand"></div>

              <div className="watch-center"></div>
            </div>
          </div>

          <div className="hero-floating-card">
            <Star size={16} fill="currentColor" />
            <div>
              <strong>4.9 Rating</strong>
              <span>Trusted by customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/categories" className="view-all">
            View All
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to="/shop"
              className="category-card"
              key={category.title}
            >
              <div className="category-icon">{category.icon}</div>

              <div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>

              <ArrowRight className="category-arrow" size={20} />
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="section-label">OUR COLLECTION</span>
            <h2>Featured Watches</h2>
          </div>

          <Link to="/shop" className="view-all">
            Shop All
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="product-grid">
          {featuredWatches.map((watch) => (
            <article className="home-product-card" key={watch.id}>

              <div className={`product-image ${watch.color}`}>
                <span className="product-badge">{watch.badge}</span>
<button
  className={`wishlist-button ${
    isInWishlist(watch.id) ? "active" : ""
  }`}
  type="button"
  aria-label={
    isInWishlist(watch.id)
      ? `Remove ${watch.name} from wishlist`
      : `Add ${watch.name} to wishlist`
  }
  onClick={() => toggleWishlist(watch)}
>
  <Heart
    size={19}
    fill={
      isInWishlist(watch.id)
        ? "currentColor"
        : "none"
    }
  />
</button>

                <div className="watch-placeholder">
                  <div className="mini-watch">
                    <div className="mini-watch-face">
                      <span></span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/products/${watch.id}`}
                  className="quick-view"
                >
                  Quick View
                </Link>
              </div>

              <div className="product-info">
                <span className="product-category">
                  {watch.category}
                </span>

               <Link
  to={`/products/${watch.id}`}
  className="product-name"
>
  {watch.name}
</Link>

                <div className="rating">
                  <Star size={15} fill="currentColor" />
                  <span>{watch.rating}</span>
                  <span className="review-count">
  ({watch.reviews || 0} reviews)
</span>
                </div>

                <div className="product-bottom">
                  <div className="price">
                    <strong>Rs. {watch.price.toLocaleString()}</strong>
                    <del>Rs. {watch.oldPrice.toLocaleString()}</del>
                  </div>
<button
  className="add-cart"
  type="button"
  aria-label={`Add ${watch.name} to cart`}
  onClick={() => addToCart(watch)}
>
  <ShoppingBag size={18} />
</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= PROMO ================= */}
      <section className="promo-section">
        <div className="promo-content">
          <span className="section-label">WATCHME EXCLUSIVE</span>

          <h2>
            Find the watch that
            <span> defines you.</span>
          </h2>

          <p>
            From minimal everyday watches to sophisticated luxury
            timepieces, discover something made for your wrist.
          </p>

          <Link to="/shop" className="btn-primary">
            Discover Watches
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="promo-decoration">
          <div className="promo-watch">
            <div className="promo-face">
              <span>WATCHME</span>
              <div className="promo-hand promo-hour"></div>
              <div className="promo-hand promo-minute"></div>
              <div className="promo-dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY WATCHME ================= */}
      <section className="benefits-section">
        <div className="section-heading centered">
          <div>
            <span className="section-label">THE WATCHME PROMISE</span>
            <h2>Why Shop With Us?</h2>
          </div>
        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <div className="benefit-icon">
              <Truck size={25} />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Get your favorite timepiece delivered safely to your
              doorstep.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <ShieldCheck size={25} />
            </div>
            <h3>Authentic Products</h3>
            <p>
              Every watch is carefully selected for quality and
              authenticity.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <RotateCcw size={25} />
            </div>
            <h3>Easy Returns</h3>
            <p>
              Shop confidently with our simple and convenient return
              process.
            </p>
          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter-section">
        <div>
          <span className="section-label">STAY IN THE LOOP</span>
          <h2>Never miss a moment.</h2>
          <p>
            Subscribe for new collections, exclusive offers and
            watch inspiration.
          </p>
        </div>

        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button type="submit">
            Subscribe
            <ArrowRight size={17} />
          </button>
        </form>
      </section>

    </main>
  );
}

export default Home;