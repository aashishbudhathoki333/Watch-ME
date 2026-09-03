import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ArrowRight,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("watchmeOrders")
    ) || [];

    setOrders(savedOrders.reverse());
  }, []);

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <Package size={42} />
          </div>

          <span className="section-label">
            WATCHME ORDERS
          </span>

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet.
            Start shopping and find your perfect
            timepiece.
          </p>

          <Link to="/shop" className="orders-shop-btn">
            <ShoppingBag size={18} />
            Start Shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">

      <section className="orders-header">
        <span className="section-label">
          WATCHME ACCOUNT
        </span>

        <h1>My Orders</h1>

        <p>
          View your previous orders and their details.
        </p>
      </section>

      <section className="orders-container">

        {orders.map((order) => (
          <div className="order-card" key={order.orderId}>

            <div className="order-card-header">

              <div>
                <span>ORDER NUMBER</span>
                <h2>{order.orderId}</h2>
              </div>

              <div className="order-status">
                {order.status}
              </div>

            </div>

            <div className="order-date">
              <CalendarDays size={16} />

              <span>
                {new Date(order.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>

            <div className="order-products">

              {order.items.map((item) => (
                <div
                  className="order-product"
                  key={item.id}
                >

                  <div className="order-product-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div
                        className={`order-watch-placeholder ${
                          item.color || ""
                        }`}
                      >
                        <div className="order-mini-watch">
                          <div className="order-mini-face">
                            <span>12</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="order-product-info">
                    <h3>{item.name}</h3>

                    <span>
                      {item.category || "Watch"}
                    </span>

                    <p>
                      Quantity: {item.quantity}
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

            <div className="order-card-footer">

              <div>
                <span>Total Amount</span>

                <strong>
                  Rs. {order.total.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Payment</span>

                <strong>
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Card Payment"}
                </strong>
              </div>

            </div>

          </div>
        ))}

      </section>

    </main>
  );
};

export default Orders;