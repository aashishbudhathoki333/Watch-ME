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
    description: "Clean and contemporary designs for today's generation.",
    icon: Gem,
  },
  {
    name: "Elegant Collection",
    value: "Elegant",
    description: "Graceful designs made for sophisticated moments.",
    icon: Sparkles,
  },
];

function Categories() {
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

      {/* ================= HEADER ================= */}

      <section className="categories-hero">
        <div className="categories-hero-content">
          <span className="section-label">
            FIND YOUR STYLE
          </span>

          <h1>
            Explore the
            <span> WatchMe Collection.</span>
          </h1>

          <p>
            From everyday classics to sophisticated luxury
            timepieces, discover a watch that feels uniquely
            yours.
          </p>
        </div>
      </section>

      {/* ================= MAIN CATEGORIES ================= */}

      <section className="main-categories">

        <div className="categories-heading">
          <div>
            <span className="section-label">
              SHOP BY STYLE
            </span>

            <h2>Choose Your Watch</h2>
          </div>
        </div>

        <div className="main-category-grid">

          {categories.map((category) => {
            const Icon = category.icon;
            const count = getCategoryCount(category.value);

            return (
              <Link
                key={category.name}
                to={`/shop?category=${category.value}`}
                className={`main-category-card ${category.className}`}
              >

                <div className="category-card-top">
                  <span className="category-number">
                    0{categories.indexOf(category) + 1}
                  </span>

                  <div className="category-icon-large">
                    <Icon size={30} />
                  </div>
                </div>

                <div className="category-card-content">
                  <div>
                    <span>
                      {count}{" "}
                      {count === 1 ? "WATCH" : "WATCHES"}
                    </span>

                    <h3>{category.name}</h3>

                    <p>{category.description}</p>
                  </div>

                  <div className="category-card-arrow">
                    <ArrowRight size={21} />
                  </div>
                </div>

              </Link>
            );
          })}

        </div>
      </section>

      {/* ================= COLLECTIONS ================= */}

      <section className="collections-section">

        <div className="collections-heading">
          <div>
            <span className="section-label">
              DISCOVER MORE
            </span>

            <h2>Explore Our Collections</h2>
          </div>

          <p>
            Find the perfect timepiece based on your
            personality and lifestyle.
          </p>
        </div>

        <div className="collections-grid">

          {collections.map((collection) => {
            const Icon = collection.icon;
            const count = getCollectionCount(collection.value);

            return (
              <Link
                key={collection.name}
                to="/shop"
                className="collection-card"
              >

                <div className="collection-icon">
                  <Icon size={23} />
                </div>

                <div className="collection-info">
                  <span>
                    {count}{" "}
                    {count === 1 ? "WATCH" : "WATCHES"}
                  </span>

                  <h3>{collection.name}</h3>

                  <p>{collection.description}</p>
                </div>

                <ArrowRight
                  size={18}
                  className="collection-arrow"
                />

              </Link>
            );
          })}

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="categories-cta">

        <div className="cta-watch-decoration">
          <div className="cta-watch-face">
            <span>WATCHME</span>

            <div className="cta-hand hour"></div>
            <div className="cta-hand minute"></div>
            <div className="cta-center"></div>
          </div>
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

          <Link to="/shop" className="cta-button">
            Shop All Watches
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Categories;