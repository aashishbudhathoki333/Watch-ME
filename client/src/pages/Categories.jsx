import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <main>
      <section className="page-header">
        <p className="section-label">EXPLORE</p>
        <h1>Categories</h1>
        <p>Find a watch that matches your personality.</p>
      </section>

      <section className="category-page-grid">
        <Link to="/shop?category=Men" className="large-category men">
          <div>
            <span>01</span>
            <h2>Men's Collection</h2>
            <p>Powerful and sophisticated.</p>
          </div>
        </Link>

        <Link to="/shop?category=Women" className="large-category women">
          <div>
            <span>02</span>
            <h2>Women's Collection</h2>
            <p>Elegant and timeless.</p>
          </div>
        </Link>

        <Link to="/shop?type=Luxury" className="large-category luxury">
          <div>
            <span>03</span>
            <h2>Luxury Collection</h2>
            <p>Made for special moments.</p>
          </div>
        </Link>

        <Link to="/shop?type=Sport" className="large-category sport">
          <div>
            <span>04</span>
            <h2>Sport Collection</h2>
            <p>Built for your adventures.</p>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default Categories;