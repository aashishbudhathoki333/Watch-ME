import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>
            WATCH<span>ME</span>
          </h2>

          <p>
            Timeless watches for modern lifestyles. Discover
            your perfect timepiece with WatchMe.
          </p>
<div className="social-links">
  <a href="#" aria-label="Facebook">
    <FaFacebookF />
  </a>

  <a href="#" aria-label="Instagram">
    <FaInstagram />
  </a>

  <a href="#" aria-label="Twitter">
    <FaTwitter />
  </a>
</div>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>

          <Link to="/shop">All Watches</Link>
          <Link to="/categories">Men's Watches</Link>
          <Link to="/categories">Women's Watches</Link>
          <Link to="/categories">Luxury Watches</Link>
        </div>

        <div className="footer-column">
          <h3>Company</h3>

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">My Account</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>

          <p>Kathmandu, Nepal</p>
          <p>+977 9800000000</p>

          <a href="mailto:hello@watchme.com">
            <Mail size={15} /> hello@watchme.com
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 WatchMe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;