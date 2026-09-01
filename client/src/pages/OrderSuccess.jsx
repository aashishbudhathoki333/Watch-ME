import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();

  const orderId =
    location.state?.orderId ||
    `WM-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <main className="success-page">
      <div className="success-card">

        <div className="success-icon">
          <CheckCircle size={58} />
        </div>

        <span className="success-label">
          ORDER CONFIRMED
        </span>

        <h1>
          Thank you for your order!
        </h1>

        <p className="success-message">
          Your order has been successfully placed.
          We will carefully prepare your watch and
          deliver it to your doorstep.
        </p>

        <div className="order-number">
          <span>Order Number</span>
          <strong>{orderId}</strong>
        </div>

        <div className="success-actions">

          <Link
            to="/shop"
            className="btn btn-dark"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="success-home"
          >
            Back to Home
            <ArrowRight size={17} />
          </Link>

        </div>

        <div className="success-note">
          <strong>WATCHME</strong>
          <span>
            Thank you for choosing timeless style.
          </span>
        </div>

      </div>
    </main>
  );
};

export default OrderSuccess;