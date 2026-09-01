import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
ArrowLeft,
ArrowRight,
Check,
CreditCard,
MapPin,
ShieldCheck,
Truck,
} from "lucide-react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
const { cartItems, cartTotal } = useContext(CartContext);
const navigate = useNavigate();

const delivery = cartItems.length > 0 ? 100 : 0;
const total = cartTotal + delivery;

const [paymentMethod, setPaymentMethod] = useState("cod");

const [formData, setFormData] = useState({
firstName: "",
lastName: "",
email: "",
phone: "",
address: "",
city: "",
province: "",
postalCode: "",
});

const handleChange = (e) => {
const { name, value } = e.target;

setFormData((previous) => ({
  ...previous,
  [name]: value,
}));


};

const handleSubmit = (e) => {
e.preventDefault();


// Temporary checkout action.
// Later this will create an order in the backend/database.
navigate("/order-success");


};

if (cartItems.length === 0) {
return ( <main className="checkout-empty"> <div className="checkout-empty-icon">🛍</div>

    <h1>Your cart is empty</h1>

    <p>
      You need to add at least one watch before
      proceeding to checkout.
    </p>

    <Link to="/shop" className="checkout-dark-btn">
      Start Shopping
      <ArrowRight size={18} />
    </Link>
  </main>
);

}

return ( <main className="checkout-page">


  {/* ================= HEADER ================= */}

  <section className="checkout-header">
    <div>
      <Link to="/cart" className="back-to-cart">
        <ArrowLeft size={16} />
        Back to Cart
      </Link>

      <span className="section-label">
        WATCHME CHECKOUT
      </span>

      <h1>Complete Your Order</h1>

      <p>
        You're one step away from owning your
        perfect timepiece.
      </p>
    </div>
  </section>

  {/* ================= CHECKOUT CONTENT ================= */}

  <form
    className="checkout-container"
    onSubmit={handleSubmit}
  >

    {/* ================= LEFT SIDE ================= */}

    <div className="checkout-main">

      {/* CUSTOMER INFORMATION */}

      <section className="checkout-card">

        <div className="checkout-card-heading">
          <div className="checkout-step">
            <span>01</span>
          </div>

          <div>
            <h2>Contact Information</h2>
            <p>
              How can we reach you about your order?
            </p>
          </div>
        </div>

        <div className="checkout-form-grid">

          <div className="form-group">
            <label htmlFor="firstName">
              First Name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Aashish"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              Last Name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Budhathoki"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="98XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

        </div>
      </section>

      {/* DELIVERY INFORMATION */}

      <section className="checkout-card">

        <div className="checkout-card-heading">
          <div className="checkout-step">
            <span>02</span>
          </div>

          <div>
            <h2>Delivery Address</h2>
            <p>
              Where should we deliver your watches?
            </p>
          </div>
        </div>

        <div className="address-icon">
          <MapPin size={19} />
          <span>Shipping Address</span>
        </div>

        <div className="checkout-form-grid">

          <div className="form-group full-width">
            <label htmlFor="address">
              Street Address
            </label>

            <input
              id="address"
              name="address"
              type="text"
              placeholder="House number, street name"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">
              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              placeholder="Kathmandu"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">
              Province
            </label>

            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Province
              </option>
              <option value="Koshi">
                Koshi Province
              </option>
              <option value="Madhesh">
                Madhesh Province
              </option>
              <option value="Bagmati">
                Bagmati Province
              </option>
              <option value="Gandaki">
                Gandaki Province
              </option>
              <option value="Lumbini">
                Lumbini Province
              </option>
              <option value="Karnali">
                Karnali Province
              </option>
              <option value="Sudurpashchim">
                Sudurpashchim Province
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">
              Postal Code
            </label>

            <input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="44600"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

        </div>
      </section>

      {/* PAYMENT */}

      <section className="checkout-card">

        <div className="checkout-card-heading">
          <div className="checkout-step">
            <span>03</span>
          </div>

          <div>
            <h2>Payment Method</h2>
            <p>
              Choose how you'd like to pay.
            </p>
          </div>
        </div>

        <div className="payment-options">

          <label
            className={`payment-option ${
              paymentMethod === "cod"
                ? "selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <div className="payment-icon">
              <Truck size={21} />
            </div>

            <div className="payment-info">
              <strong>
                Cash on Delivery
              </strong>

              <span>
                Pay when your order arrives.
              </span>
            </div>

            <div className="payment-check">
              <Check size={15} />
            </div>
          </label>

          <label
            className={`payment-option ${
              paymentMethod === "card"
                ? "selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <div className="payment-icon">
              <CreditCard size={21} />
            </div>

            <div className="payment-info">
              <strong>
                Card Payment
              </strong>

              <span>
                Secure online card payment.
              </span>
            </div>

            <div className="payment-check">
              <Check size={15} />
            </div>
          </label>

        </div>

        {paymentMethod === "card" && (
          <div className="card-notice">
            <CreditCard size={18} />

            <div>
              <strong>
                Online payment coming soon
              </strong>

              <p>
                Card payment integration will be
                connected when we build the backend.
              </p>
            </div>
          </div>
        )}

      </section>

      {/* SECURITY */}

      <div className="checkout-security">
        <ShieldCheck size={21} />

        <div>
          <strong>Safe & Secure Checkout</strong>

          <p>
            Your personal information is protected
            and handled securely.
          </p>
        </div>
      </div>

    </div>

    {/* ================= RIGHT SIDE ================= */}

    <aside className="checkout-summary">

      <div className="summary-header">
        <div>
          <span className="section-label">
            YOUR ORDER
          </span>

          <h2>Order Summary</h2>
        </div>

        <span className="item-count">
          {cartItems.reduce(
            (totalItems, item) =>
              totalItems + item.quantity,
            0
          )}{" "}
          items
        </span>
      </div>

      {/* PRODUCTS */}

      <div className="checkout-products">

        {cartItems.map((item) => (
          <div
            className="checkout-product"
            key={item.id}
          >
            <div className="checkout-product-image">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                />
              ) : (
                <div
                  className={`checkout-watch-placeholder ${item.color}`}
                >
                  <div className="checkout-mini-watch">
                    <div className="checkout-mini-face">
                      <span>12</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-product-info">
              <span>{item.brand || "WATCHME"}</span>

              <h3>{item.name}</h3>

              <p>
                Qty: {item.quantity}
              </p>
            </div>

            <strong>
              Rs.{" "}
              {(
                item.price * item.quantity
              ).toLocaleString()}
            </strong>
          </div>
        ))}

      </div>

      {/* TOTALS */}

      <div className="summary-calculation">

        <div>
          <span>Subtotal</span>

          <strong>
            Rs. {cartTotal.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Delivery</span>

          <strong>
            Rs. {delivery.toLocaleString()}
          </strong>
        </div>

        <div className="summary-total">
          <span>Total</span>

          <strong>
            Rs. {total.toLocaleString()}
          </strong>
        </div>

      </div>

      <button
        type="submit"
        className="place-order-btn"
      >
        Place Order
        <ArrowRight size={19} />
      </button>

      <p className="terms-text">
        By placing your order, you agree to
        WatchMe's terms and conditions.
      </p>

      <Link
        to="/cart"
        className="edit-cart-link"
      >
        <ArrowLeft size={15} />
        Edit Cart
      </Link>

    </aside>

  </form>
</main>

);
};

export default Checkout;
