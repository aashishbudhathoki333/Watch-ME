import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <p className="hero-label">TIMELESS COLLECTION</p>

              <h1>
                Time is
                <br />
                <em>your</em> story.
              </h1>

              <p className="hero-description">
                Discover carefully crafted watches designed
                to make every moment memorable.
              </p>

              <div className="hero-buttons">
                <Link to="/shop" className="btn btn-dark">
                  Shop Collection
                  <ArrowRight size={18} />
                </Link>

                <Link to="/categories" className="text-link">
                  Explore Categories
                </Link>
              </div>
            </div>

            <div className="hero-image-container">
              <div className="hero-circle"></div>

              <img
                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"
                alt="Premium Watch"
                className="hero-image"
              />

              <div className="hero-floating-card">
                <span>01</span>
                <div>
                  <strong>Timeless</strong>
                  <small>Premium Collection</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="features-container">
            <div className="feature">
              <ShieldCheck />
              <div>
                <h4>Authentic Quality</h4>
                <p>Premium craftsmanship</p>
              </div>
            </div>

            <div className="feature">
              <Truck />
              <div>
                <h4>Fast Delivery</h4>
                <p>Across Nepal</p>
              </div>
            </div>

            <div className="feature">
              <RotateCcw />
              <div>
                <h4>Easy Returns</h4>
                <p>7-day return policy</p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section categories-section">
          <div className="section-heading">
            <div>
              <p className="section-label">DISCOVER</p>
              <h2>Shop by Category</h2>
            </div>

            <Link to="/categories" className="text-link">
              View All <ArrowRight size={17} />
            </Link>
          </div>

          <div className="category-grid">
            <Link to="/shop?category=Men" className="category-card category-men">
              <div>
                <span>01</span>
                <h3>Men's Watches</h3>
                <p>Strong. Refined. Timeless.</p>
              </div>
            </Link>

            <Link to="/shop?category=Women" className="category-card category-women">
              <div>
                <span>02</span>
                <h3>Women's Watches</h3>
                <p>Elegant. Modern. Beautiful.</p>
              </div>
            </Link>

            <Link to="/shop?type=Luxury" className="category-card category-luxury">
              <div>
                <span>03</span>
                <h3>Luxury Collection</h3>
                <p>Crafted for distinction.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="section featured-section">
          <div className="section-heading center-heading">
            <p className="section-label">OUR COLLECTION</p>
            <h2>Featured Watches</h2>
            <p>
              Discover some of our most loved timepieces.
            </p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="center-button">
            <Link to="/shop" className="btn btn-outline">
              View All Watches
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* PROMO */}
        <section className="promo-section">
          <div className="promo-content">
            <p className="section-label">WATCHME EXCLUSIVE</p>

            <h2>
              Designed to be
              <br />
              <em>remembered.</em>
            </h2>

            <p>
              Every WatchMe timepiece combines modern
              aesthetics with timeless craftsmanship.
            </p>

            <Link to="/shop" className="btn btn-light">
              Discover Collection
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="promo-image">
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80"
              alt="WatchMe Collection"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;