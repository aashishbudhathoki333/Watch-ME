import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  X,
  Package,
  User,
  Calendar,
  CreditCard,
} from "lucide-react";

import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ================= LOAD ORDERS =================

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("watchmeOrders")) || [];

    setOrders(savedOrders.reverse());
  }, []);

  // ================= UPDATE STATUS =================

  const updateOrderStatus = (orderId, newStatus) => {
    const savedOrders =
      JSON.parse(localStorage.getItem("watchmeOrders")) || [];

    const updatedOrders = savedOrders.map((order) =>
      order.orderId === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    );

    localStorage.setItem(
      "watchmeOrders",
      JSON.stringify(updatedOrders)
    );

    setOrders([...updatedOrders].reverse());

    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
      });
    }
  };

  // ================= SEARCH =================

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order.orderId?.toLowerCase().includes(search) ||
      order.customer?.firstName
        ?.toLowerCase()
        .includes(search) ||
      order.customer?.lastName
        ?.toLowerCase()
        .includes(search) ||
      order.customer?.email
        ?.toLowerCase()
        .includes(search)
    );
  });

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ================= STATUS CLASS =================

  const getStatusClass = (status) => {
    return status
      ?.toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <main className="admin-orders-page">

      {/* ================= HEADER ================= */}

      <div className="admin-orders-header">

        <div>
          <span className="admin-section-label">
            ORDER MANAGEMENT
          </span>

          <h1>Orders</h1>

          <p>
            Manage customer orders and update their delivery status.
          </p>
        </div>

        <div className="admin-order-count">
          <Package size={20} />
          <span>{orders.length} Orders</span>
        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="admin-orders-toolbar">

        <div className="admin-order-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search by order ID, customer or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

        </div>

      </div>

      {/* ================= ORDERS TABLE ================= */}

      <div className="admin-orders-table-wrapper">

        {filteredOrders.length === 0 ? (

          <div className="admin-no-orders">

            <Package size={40} />

            <h2>No Orders Found</h2>

            <p>
              {orders.length === 0
                ? "No customer orders have been placed yet."
                : "No orders match your search."}
            </p>

          </div>

        ) : (

          <table className="admin-orders-table">

            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr key={order.orderId}>

                  {/* ORDER */}

                  <td>
                    <strong className="admin-order-id">
                      {order.orderId}
                    </strong>
                  </td>

                  {/* CUSTOMER */}

                  <td>

                    <div className="admin-customer">

                      <div className="admin-customer-icon">
                        <User size={16} />
                      </div>

                      <div>
                        <strong>
                          {order.customer?.firstName}{" "}
                          {order.customer?.lastName}
                        </strong>

                        <span>
                          {order.customer?.email}
                        </span>
                      </div>

                    </div>

                  </td>

                  {/* DATE */}

                  <td>

                    <div className="admin-order-date">
                      <Calendar size={15} />
                      {formatDate(order.date)}
                    </div>

                  </td>

                  {/* TOTAL */}

                  <td>
                    <strong>
                      Rs.{" "}
                      {Number(order.total || 0).toLocaleString()}
                    </strong>
                  </td>

                  {/* PAYMENT */}

                  <td>

                    <div className="admin-payment">

                      <CreditCard size={15} />

                      {order.paymentMethod}

                    </div>

                  </td>

                  {/* STATUS */}

                  <td>

                    <select
                      className={`admin-status-select ${getStatusClass(
                        order.status
                      )}`}
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.orderId,
                          e.target.value
                        )
                      }
                    >
                      <option value="Order Placed">
                        Order Placed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </td>

                  {/* VIEW */}

                  <td>

                    <button
                      type="button"
                      className="admin-view-order"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                    >
                      <Eye size={16} />
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}

      {selectedOrder && (

        <div
          className="admin-order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="admin-order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="admin-order-modal-header">

              <div>
                <span>ORDER DETAILS</span>

                <h2>
                  {selectedOrder.orderId}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                aria-label="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="admin-modal-section">

              <h3>Customer Information</h3>

              <div className="admin-customer-details">

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.customer?.firstName}{" "}
                  {selectedOrder.customer?.lastName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {selectedOrder.customer?.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedOrder.customer?.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.customer?.address},{" "}
                  {selectedOrder.customer?.city}
                </p>

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="admin-modal-section">

              <h3>Order Items</h3>

              <div className="admin-order-items">

                {selectedOrder.items?.map(
                  (item) => (

                    <div
                      className="admin-order-item"
                      key={item.id}
                    >

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Qty: {item.quantity}
                        </span>

                      </div>

                      <strong>
                        Rs.{" "}
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* SUMMARY */}

            <div className="admin-order-summary">

              <div>
                <span>Subtotal</span>
                <strong>
                  Rs.{" "}
                  {Number(
                    selectedOrder.subtotal || 0
                  ).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>
                  Rs.{" "}
                  {Number(
                    selectedOrder.delivery || 0
                  ).toLocaleString()}
                </strong>
              </div>

              <div className="admin-total-row">
                <span>Total</span>
                <strong>
                  Rs.{" "}
                  {Number(
                    selectedOrder.total || 0
                  ).toLocaleString()}
                </strong>
              </div>

            </div>

            {/* STATUS */}

            <div className="admin-modal-status">

              <label>
                Order Status
              </label>

              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  updateOrderStatus(
                    selectedOrder.orderId,
                    e.target.value
                  )
                }
              >
                <option value="Order Placed">
                  Order Placed
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

            </div>

          </div>

        </div>

      )}

    </main>
  );
};

export default AdminOrders;