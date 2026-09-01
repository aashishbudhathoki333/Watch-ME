import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
  });

  const delivery = 100;
  const total = cartTotal + delivery;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Order placed successfully! Thank you for shopping with WatchMe."
    );

    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <main className="empty-page">
        <div>
          <h1>No items to checkout</h1>
          <p>Add some watches to your cart first.</p>

          <Link to="/shop" className="btn btn-dark">
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="page-header">
        <p className="section-label">WATCHME</p>
        <h1>Checkout</h1>
      </section>

      <div className="checkout-container">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>Shipping Information</h2>

          <div className="form-grid">
            <div className="form-group full">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="98XXXXXXXX"
              />
            </div>

            <div className="form-group full">
              <label>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Street / Tole / Ward"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label>Province</label>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                required
              >
                <option value="">Select Province</option>
                <option>Koshi</option>
                <option>Madhesh</option>
                <option>Bagmati</option>
                <option>Gandaki</option>
                <option>Lumbini</option>
                <option>Karnali</option>
                <option>Sudurpashchim</option>
              </select>
            </div>
          </div>

          <h2 className="payment-title">
            Payment Method
          </h2>

          <div className="payment-option">
            <input
              type="radio"
              checked
              readOnly
            />

            <div>
              <strong>Cash on Delivery</strong>
              <p>Pay when your order arrives.</p>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark place-order"
          >
            Place Order — Rs. {total.toLocaleString()}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Your Order</h2>

          {cartItems.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <span>
                  Qty: {item.quantity}
                </span>
              </div>

              <strong>
                Rs.{" "}
                {(item.price * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}

          <hr />

          <div>
            <span>Subtotal</span>
            <strong>
              Rs. {cartTotal.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>Rs. {delivery}</strong>
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>
              Rs. {total.toLocaleString()}
            </strong>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;