import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const wishlistCount = wishlistItems.length;

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          WATCH<span>ME</span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <nav className="desktop-nav">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>

        </nav>

        {/* ================= ACTIONS ================= */}

        <div className="navbar-actions">

          {/* Wishlist */}

          <Link
            to="/wishlist"
            className="nav-action"
            aria-label="Wishlist"
          >
            <Heart size={21} />

            {wishlistCount > 0 && (
              <span className="nav-count">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="nav-action"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="nav-count">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ================= USER ================= */}

          {isLoggedIn ? (
            <div className="nav-user-area">

              <span className="nav-user">
                <User size={19} />

                <span>
                  {user?.name || user?.email || "Account"}
                </span>
              </span>

              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="nav-user"
              aria-label="Login"
            >
              <User size={19} />
              <span>Login</span>
            </Link>
          )}

          {/* ================= MOBILE MENU ================= */}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

      </div>

      {/* ================= MOBILE NAV ================= */}

      <div
        className={`mobile-nav ${
          mobileMenu ? "show" : ""
        }`}
      >

        <NavLink
          to="/"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Shop
        </NavLink>

        <NavLink
          to="/categories"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Categories
        </NavLink>

        <NavLink
          to="/wishlist"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Wishlist

          {wishlistCount > 0 && (
            <span>{wishlistCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Cart

          {cartCount > 0 && (
            <span>{cartCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/about"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          onClick={closeMenu}
          className="mobile-nav-link"
        >
          Contact
        </NavLink>

        {isLoggedIn ? (
          <>
            <div className="mobile-user">
              <User size={18} />

              <span>
                {user?.name || user?.email || "Account"}
              </span>
            </div>

            <button
              type="button"
              className="mobile-logout"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={closeMenu}
            className="mobile-nav-link"
          >
            Login
          </NavLink>
        )}

      </div>
    </header>
  );
};

export default Navbar;