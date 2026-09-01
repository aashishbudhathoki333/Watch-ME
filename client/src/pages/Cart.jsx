import { useContext } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useContext(CartContext);

  const delivery = cartItems.length > 0 ? 100 : 0;
  const total = cartTotal + delivery;

  if (cartItems.length === 0) {
    return (
      <main className="empty-page">
        <div>
          <div className="empty-icon">🛍</div>
          <h1>Your cart is empty</h1>
          <p>
            Looks like you haven't added anything to your
            cart yet.
          </p>

          <Link to="/shop" className="btn btn-dark">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="page-header">
        <p className="section-label">YOUR SHOPPING BAG</p>
        <h1>Shopping Cart</h1>
      </section>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <p>{item.brand}</p>
                <h3>{item.name}</h3>
                <strong>
                  Rs. {item.price.toLocaleString()}
                </strong>
              </div>

              <div className="cart-quantity">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                >
                  <Minus size={15} />
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                >
                  <Plus size={15} />
                </button>
              </div>

              <strong className="cart-item-total">
                Rs.{" "}
                {(item.price * item.quantity).toLocaleString()}
              </strong>

              <button
                type="button"
                className="remove-cart"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

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

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>Rs. {total.toLocaleString()}</strong>
          </div>

          <Link to="/checkout" className="btn btn-dark checkout-btn">
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <Link to="/shop" className="continue-shopping">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
};

export default Cart;