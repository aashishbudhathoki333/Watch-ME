import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Crown,
  Gem,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./About.css";

const About = () => {
  return (
    <main className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-content">

          <div className="about-hero-label">
            <span className="about-label-line"></span>
            <span>THE WATCHME STORY</span>
          </div>

          <h1>
            Time is
            <span>your signature.</span>
          </h1>

          <p className="about-hero-description">
            Discover thoughtfully designed timepieces created
            for people who believe that every moment deserves
            to be remembered.
          </p>

          <div className="about-hero-actions">
            <Link to="/shop" className="about-primary-button">
              Explore Collection
              <ArrowRight size={17} />
            </Link>

            <a href="#our-story" className="about-text-link">
              Our Story
              <span>↓</span>
            </a>
          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="about-hero-visual">

          <div className="hero-image-frame">

            <img
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury Watch"
            />

            <div className="hero-image-overlay"></div>

          </div>


          {/* Floating badge */}

          <div className="hero-floating-card">

            <div className="floating-icon">
              <Crown size={18} />
            </div>

            <div>
              <span>WATCHME</span>
              <strong>TIMELESS DESIGN</strong>
            </div>

          </div>


          {/* Vertical text */}

          <div className="hero-vertical-text">
            EST. 2024 · TIMELESS CRAFT
          </div>


          {/* Decorative circle */}

          <div className="hero-decoration-circle"></div>

        </div>

      </section>


      {/* =====================================================
          INTRO / STATEMENT
      ===================================================== */}

      <section className="about-intro">

        <div className="about-intro-label">
          <span className="section-label">OUR PHILOSOPHY</span>
        </div>

        <div className="about-intro-content">

          <h2>
            A watch should do more
            <em> than tell time.</em>
          </h2>

          <p>
            It should tell your story. It should reflect your
            personality, complement your style and become part
            of the moments you never want to forget.
          </p>

        </div>

      </section>


      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="about-story" id="our-story">

        <div className="about-story-image">

          <img
            src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=85"
            alt="Watch craftsmanship"
          />

          <div className="story-image-caption">
            <span>01</span>
            <span>CRAFTED FOR EVERY MOMENT</span>
          </div>

        </div>


        <div className="about-story-content">

          <span className="section-label">
            WHO WE ARE
          </span>

          <h2>
            Designed with
            <em> intention.</em>
          </h2>

          <p>
            WatchMe was created with one simple belief:
            choosing a watch should feel personal.
          </p>

          <p>
            We bring together timeless silhouettes,
            contemporary aesthetics and carefully considered
            details to create watches that feel just as good
            today as they will years from now.
          </p>

          <p>
            From the first sketch to the final detail,
            everything is designed around one idea —
            making your time feel distinctly yours.
          </p>

          <div className="story-features">

            <div>
              <Check size={17} />
              <span>Timeless Design</span>
            </div>

            <div>
              <Check size={17} />
              <span>Premium Finishing</span>
            </div>

            <div>
              <Check size={17} />
              <span>Made for Everyday</span>
            </div>

            <div>
              <Check size={17} />
              <span>Thoughtful Details</span>
            </div>

          </div>

          <Link to="/categories" className="about-outline-button">
            Discover Our Collections
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="about-stats">

        <div className="about-stat">
          <strong>08</strong>
          <span>TIMEPIECES</span>
        </div>

        <div className="about-stat">
          <strong>04</strong>
          <span>COLLECTIONS</span>
        </div>

        <div className="about-stat">
          <strong>4.8</strong>
          <span>AVERAGE RATING</span>
        </div>

        <div className="about-stat">
          <strong>100%</strong>
          <span>WATCHME QUALITY</span>
        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="about-values">

        <div className="about-values-heading">

          <span className="section-label">
            WHAT WE STAND FOR
          </span>

          <h2>
            Built around
            <em> your time.</em>
          </h2>

          <p>
            Every WatchMe detail is guided by simplicity,
            elegance and the belief that great design should
            never feel complicated.
          </p>

        </div>


        <div className="about-values-grid">

          <div className="value-card">

            <div className="value-number">
              01
            </div>

            <div className="value-icon">
              <Gem size={23} />
            </div>

            <h3>Timeless Design</h3>

            <p>
              Clean proportions and refined details that
              remain relevant beyond trends.
            </p>

          </div>


          <div className="value-card">

            <div className="value-number">
              02
            </div>

            <div className="value-icon">
              <Sparkles size={23} />
            </div>

            <h3>Modern Elegance</h3>

            <p>
              Contemporary aesthetics designed to elevate
              both everyday and special occasions.
            </p>

          </div>


          <div className="value-card">

            <div className="value-number">
              03
            </div>

            <div className="value-icon">
              <ShieldCheck size={23} />
            </div>

            <h3>Reliable Quality</h3>

            <p>
              Thoughtful materials, finishing and details
              chosen to make every watch feel special.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          DARK CTA
      ===================================================== */}

      <section className="about-cta">

        <div className="about-cta-decoration">
          <div className="cta-ring ring-one"></div>
          <div className="cta-ring ring-two"></div>

          <div className="cta-mini-watch">

            <span>WATCHME</span>

            <div className="mini-hand mini-hour"></div>
            <div className="mini-hand mini-minute"></div>

            <div className="mini-center"></div>

          </div>

        </div>


        <div className="about-cta-content">

          <span className="section-label">
            FIND YOUR TIME
          </span>

          <h2>
            Your next chapter
            <em> starts now.</em>
          </h2>

          <p>
            Explore our collection and find the timepiece
            that becomes part of your story.
          </p>

          <Link to="/shop" className="about-cta-button">
            Shop WatchMe
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
};

export default About;
