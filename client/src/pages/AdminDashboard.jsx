import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

import products from "../data/products";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Load orders
    const savedOrders =
      JSON.parse(localStorage.getItem("watchmeOrders")) || [];

    setOrders(savedOrders);

    // Load products
    const savedProducts =
      JSON.parse(localStorage.getItem("watchmeProducts")) || products;

    setProductList(savedProducts);

    // Load registered customer
    const savedUser = JSON.parse(
      localStorage.getItem("watchmeRegisteredUser")
    );

    if (savedUser) {
      setCustomers([savedUser]);
    } else {
      setCustomers([]);
    }
  }, []);

  // Total sales
  const totalSales = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  // Pending orders
  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Order Placed" ||
      order.status === "Processing"
  ).length;

  // Delivered orders
  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <main className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your WatchMe store</p>
        </div>

        <Link
          to="/admin/orders"
          className="admin-orders-button"
        >
          View Orders
        </Link>
      </div>


      {/* STAT CARDS */}
      <section className="admin-stats">

        {/* PRODUCTS */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Package size={22} />
          </div>

          <div>
            <span>Total Products</span>
            <strong>{productList.length}</strong>
          </div>
        </div>


        {/* ORDERS */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ShoppingBag size={22} />
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>
        </div>


        {/* SALES */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <DollarSign size={22} />
          </div>

          <div>
            <span>Total Sales</span>

            <strong>
              Rs. {totalSales.toLocaleString()}
            </strong>
          </div>
        </div>


        {/* CUSTOMERS */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Customers</span>
            <strong>{customers.length}</strong>
          </div>
        </div>

      </section>


      {/* ORDER OVERVIEW */}
      <section className="admin-overview">

        <div className="admin-overview-card">

          <div className="admin-card-header">
            <div>
              <span className="admin-label">
                ORDER OVERVIEW
              </span>

              <h2>Order Status</h2>
            </div>
          </div>


          <div className="order-status-grid">

            {/* PENDING */}
            <div className="order-status-item">
              <Clock size={20} />

              <span>Pending</span>

              <strong>
                {pendingOrders}
              </strong>
            </div>


            {/* DELIVERED */}
            <div className="order-status-item">
              <CheckCircle size={20} />

              <span>Delivered</span>

              <strong>
                {completedOrders}
              </strong>
            </div>


            {/* ALL ORDERS */}
            <div className="order-status-item">
              <ShoppingBag size={20} />

              <span>All Orders</span>

              <strong>
                {orders.length}
              </strong>
            </div>

          </div>

        </div>


        {/* RECENT ORDERS */}
        <div className="admin-overview-card">

          <div className="admin-card-header">

            <div>
              <span className="admin-label">
                RECENT ACTIVITY
              </span>

              <h2>Recent Orders</h2>
            </div>

          </div>


          {orders.length === 0 ? (

            <div className="admin-empty">
              <ShoppingBag size={28} />

              <p>No orders yet.</p>
            </div>

          ) : (

            <div className="recent-orders">

              {orders
                .slice()
                .reverse()
                .slice(0, 5)
                .map((order) => (

                  <div
                    className="recent-order"
                    key={order.orderId}
                  >

                    <div>
                      <strong>
                        {order.orderId}
                      </strong>

                      <span>
                        {order.customer?.firstName}{" "}
                        {order.customer?.lastName}
                      </span>
                    </div>


                    <div className="recent-order-right">

                      <strong>
                        Rs.{" "}
                        {Number(
                          order.total || 0
                        ).toLocaleString()}
                      </strong>

                      <span>
                        {order.status}
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
};

export default AdminDashboard;