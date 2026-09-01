import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          WATCH<span>ME</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/shop" onClick={closeMenu}>
            Shop
          </NavLink>

          <NavLink to="/categories" onClick={closeMenu}>
            Categories
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/shop" aria-label="Search">
            <Search size={20} />
          </Link>

          <Link to="/wishlist" className="icon-with-count">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span>{wishlistItems.length}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-with-count">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </Link>

          <Link to="/login">
            <User size={20} />
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;