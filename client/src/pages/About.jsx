import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="about-page">
      <section className="page-header">
        <p className="section-label">OUR STORY</p>
        <h1>About WatchMe</h1>
        <p>
          More than a watch. A reflection of your time.
        </p>
      </section>

      <section className="about-content">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80"
            alt="WatchMe"
          />
        </div>

        <div className="about-text">
          <p className="section-label">WHO WE ARE</p>

          <h2>
            We believe every moment
            <em> matters.</em>
          </h2>

          <p>
            WatchMe was created with one simple idea:
            finding a great watch should be an experience.
          </p>

          <p>
            We bring together timeless designs, modern
            aesthetics and reliable craftsmanship to help
            you find a timepiece that feels uniquely yours.
          </p>

          <Link to="/shop" className="btn btn-dark">
            Explore Collection
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;