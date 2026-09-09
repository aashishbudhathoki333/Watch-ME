import { Link } from "react-router-dom";
import {
  ArrowRight,
  Watch,
  Sparkles,
  Crown,
  CircleDot,
  Zap,
  Gem,
} from "lucide-react";

import products from "../data/products";
import "./Categories.css";

const categories = [
  {
    name: "Men's Watches",
    value: "Men",
    description:
      "Bold, refined and versatile timepieces designed for the modern man.",
    icon: Watch,
    className: "men",
  },
  {
    name: "Women's Watches",
    value: "Women",
    description:
      "Elegant designs that add a sophisticated touch to every outfit.",
    icon: Sparkles,
    className: "women",
  },
  {
    name: "Luxury Watches",
    value: "Luxury",
    description:
      "Premium-inspired timepieces for those who appreciate timeless elegance.",
    icon: Crown,
    className: "luxury",
  },
];

const collections = [
  {
    name: "Classic Collection",
    value: "Classic",
    description: "Timeless designs that never go out of style.",
    icon: CircleDot,
  },
  {
    name: "Sport Collection",
    value: "Sport",
    description: "Bold watches built for an active lifestyle.",
    icon: Zap,
  },
  {
    name: "Modern Collection",
    value: "Modern",
    description:
      "Clean and contemporary designs for today's generation.",
    icon: Gem,
  },
  {
    name: "Elegant Collection",
    value: "Elegant",
    description:
      "Graceful designs made for sophisticated moments.",
    icon: Sparkles,
  },
];

function Categories() {
  /* =========================
     HELPERS
  ========================= */

  const getCategoryProducts = (category) => {
    return products.filter(
      (product) =>
        product.category === category &&
        product.image
    );
  };

  const getCollectionProducts = (collection) => {
    return products.filter(
      (product) =>
        product.collection === collection &&
        product.image
    );
  };

  const getCategoryCount = (category) => {
    return products.filter(
      (product) => product.category === category
    ).length;
  };

  const getCollectionCount = (collection) => {
    return products.filter(
      (product) => product.collection === collection
    ).length;
  };

  return (
    <main className="categories-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="categories-hero">

        <div className="categories-hero-glow"></div>

        <div className="categories-hero-content">

          <div className="hero-eyebrow">
            <span className="hero-line"></span>
            WATCHME COLLECTION
          </div>

          <h1>
            Explore the
            <span> WatchMe Collection.</span>
          </h1>

          <p>
            From everyday classics to sophisticated luxury
            timepieces, discover a watch that feels uniquely
            yours.
          </p>

          <Link
            to="/shop"
            className="hero-shop-button"
          >
            Explore Watches
            <ArrowRight size={17} />
          </Link>

        </div>

        {/* HERO WATCH IMAGE */}

        {products.find((product) => product.image)?.image && (
          <div className="categories-hero-watch">

            <div className="hero-watch-circle"></div>

            <img
              src={
                products.find(
                  (product) => product.image
                ).image
              }
              alt="WatchMe premium watch"
            />

          </div>
        )}

      </section>


      {/* =====================================================
          MAIN CATEGORIES
      ===================================================== */}

      <section className="main-categories">

        <div className="categories-heading">

          <div>
            <span className="section-label">
              SHOP BY STYLE
            </span>

            <h2>Choose Your Watch</h2>
          </div>

          <p>
            Discover a collection carefully selected for
            different styles, personalities and occasions.
          </p>

        </div>


        <div className="main-category-grid">

          {categories.map((category, index) => {

            const Icon = category.icon;

            const categoryProducts =
              getCategoryProducts(category.value);

            const count =
              getCategoryCount(category.value);

            const image =
              categoryProducts[0]?.image;

            return (
              <Link
                key={category.name}
                to={`/shop?category=${category.value}`}
                className={`main-category-card ${category.className}`}
              >

                {/* IMAGE */}

                <div className="category-image-wrapper">

                  {image ? (
                    <img
                      src={image}
                      alt={category.name}
                      className="category-product-image"
                    />
                  ) : (
                    <div className="category-image-placeholder">
                      <Icon size={70} strokeWidth={1} />
                    </div>
                  )}

                  <div className="category-image-overlay"></div>

                  <span className="category-number">
                    0{index + 1}
                  </span>

                  <div className="category-icon-large">
                    <Icon size={23} />
                  </div>

                  <span className="category-view">
                    VIEW COLLECTION
                  </span>

                </div>


                {/* CONTENT */}

                <div className="category-card-content">

                  <div className="category-card-text">

                    <span className="category-count">
                      {count}{" "}
                      {count === 1
                        ? "TIMEPIECE"
                        : "TIMEPIECES"}
                    </span>

                    <h3>{category.name}</h3>

                    <p>
                      {category.description}
                    </p>

                  </div>

                  <div className="category-card-arrow">
                    <ArrowRight size={20} />
                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          COLLECTIONS
      ===================================================== */}

      <section className="collections-section">

        <div className="collections-heading">

          <div>
            <span className="section-label">
              DISCOVER MORE
            </span>

            <h2>
              Explore Our Collections
            </h2>
          </div>

          <p>
            Find the perfect timepiece based on your
            personality and lifestyle.
          </p>

        </div>


        <div className="collections-grid">

          {collections.map((collection, index) => {

            const Icon = collection.icon;

            const collectionProducts =
              getCollectionProducts(
                collection.value
              );

            const count =
              getCollectionCount(
                collection.value
              );

            const image =
              collectionProducts[0]?.image;

            return (
              <Link
                key={collection.name}
                to={`/shop?collection=${collection.value}`}
                className="collection-card"
              >

                {/* IMAGE */}

                <div className="collection-image">

                  {image ? (
                    <img
                      src={image}
                      alt={collection.name}
                    />
                  ) : (
                    <Icon
                      size={60}
                      strokeWidth={1}
                    />
                  )}

                  <div className="collection-image-overlay"></div>

                  <span className="collection-number">
                    0{index + 1}
                  </span>

                </div>


                {/* CONTENT */}

                <div className="collection-card-body">

                  <div className="collection-icon">
                    <Icon size={19} />
                  </div>

                  <div className="collection-info">

                    <span>
                      {count}{" "}
                      {count === 1
                        ? "WATCH"
                        : "WATCHES"}
                    </span>

                    <h3>
                      {collection.name}
                    </h3>

                    <p>
                      {collection.description}
                    </p>

                  </div>

                  <div className="collection-arrow">
                    <ArrowRight size={18} />
                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          FEATURED STATEMENT
      ===================================================== */}

      <section className="category-statement">

        <div className="statement-left">

          <span className="section-label">
            THE WATCHME STANDARD
          </span>

          <h2>
            Time is personal.
            <span> Make yours memorable.</span>
          </h2>

        </div>

        <div className="statement-right">

          <p>
            Every WatchMe timepiece is selected with
            attention to design, character and everyday
            elegance.
          </p>

          <Link
            to="/shop"
            className="statement-link"
          >
            View all watches
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="categories-cta">

        <div className="cta-background-number">
          TIME
        </div>

        <div className="cta-watch-decoration">

          {products.find(
            (product) => product.image
          )?.image ? (

            <img
              src={
                products.find(
                  (product) => product.image
                ).image
              }
              alt="WatchMe timepiece"
            />

          ) : (

            <div className="cta-watch-face">

              <span>
                WATCHME
              </span>

              <div className="cta-hand hour"></div>

              <div className="cta-hand minute"></div>

              <div className="cta-center"></div>

            </div>

          )}

        </div>


        <div className="categories-cta-content">

          <span className="section-label">
            YOUR TIME. YOUR STYLE.
          </span>

          <h2>
            There's a WatchMe
            <span> for every moment.</span>
          </h2>

          <p>
            Whether you're dressing for a special occasion
            or keeping things simple every day, find a
            timepiece that completes your look.
          </p>

          <Link
            to="/shop"
            className="cta-button"
          >
            Shop All Watches
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Categories;
