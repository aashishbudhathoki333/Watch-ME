import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  CalendarDays,
  MapPin,
  CreditCard,
} from "lucide-react";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("watchmeOrders")) || [];

    const foundOrder = savedOrders.find(
      (item) => item.orderId === orderId
    );

    setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return (
      <main className="order-details-page">
        <div className="order-details-empty">
          <Package size={48} />

          <h1>Order Not Found</h1>

          <p>
            We couldn't find the order you're looking for.
          </p>

          <Link to="/orders" className="order-back-btn">
            <ArrowLeft size={18} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="order-details-page">

      <div className="order-details-container">

        <Link to="/orders" className="back-to-orders">
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <div className="order-details-header">
          <div>
            <span className="section-label">
              WATCHME ORDER
            </span>

            <h1>{order.orderId}</h1>

            <div className="order-details-date">
              <CalendarDays size={16} />

              {new Date(order.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
          </div>

          <div className="order-details-status">
            {order.status}
          </div>
        </div>

        <section className="details-section">

          <h2>Order Items</h2>

          <div className="details-items">

            {order.items.map((item) => (
              <div
                className="details-item"
                key={item.id}
              >

                <div className="details-item-image">
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

                <div className="details-item-info">
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

        </section>

        <section className="details-grid">

          <div className="details-info-card">

            <div className="details-card-title">
              <MapPin size={19} />
              <h2>Delivery Address</h2>
            </div>

            <p>
              {order.customer.firstName}{" "}
              {order.customer.lastName}
            </p>

            <p>{order.customer.address}</p>

            <p>
              {order.customer.city},{" "}
              {order.customer.province}
            </p>

            <p>
              {order.customer.postalCode}
            </p>

            <p>{order.customer.phone}</p>

          </div>

          <div className="details-info-card">

            <div className="details-card-title">
              <CreditCard size={19} />
              <h2>Payment</h2>
            </div>

            <p>
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Card Payment"}
            </p>

            <span className="payment-status">
              Payment Pending
            </span>

          </div>

        </section>

        <section className="order-total-card">

          <div>
            <span>Subtotal</span>
            <strong>
              Rs. {order.subtotal.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>
              Rs. {order.delivery.toLocaleString()}
            </strong>
          </div>

          <div className="total-row">
            <span>Total</span>
            <strong>
              Rs. {order.total.toLocaleString()}
            </strong>
          </div>

        </section>

      </div>

    </main>
  );
};

export default OrderDetails;