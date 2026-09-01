import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlistItems } =
    useContext(WishlistContext);

  return (
    <main className="wishlist-page">
      <section className="page-header">
        <p className="section-label">SAVED FOR LATER</p>
        <h1>Your Wishlist</h1>
        <p>Your favorite watches, all in one place.</p>
      </section>

      {wishlistItems.length === 0 ? (
        <div className="empty-page small">
          <div>
            <div className="empty-icon">♡</div>
            <h2>Your wishlist is empty</h2>
            <p>
              Save watches you love and find them here later.
            </p>

            <Link to="/shop" className="btn btn-dark">
              Explore Watches
            </Link>
          </div>
        </div>
      ) : (
        <section className="section">
          <ProductGrid products={wishlistItems} />
        </section>
      )}
    </main>
  );
};

export default Wishlist;