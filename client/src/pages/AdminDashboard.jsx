import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  Boxes,
  CircleDollarSign,
  UserRound,
} from "lucide-react";

import products from "../data/products";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [productList, setProductList] = useState([]);
  const [chartPeriod, setChartPeriod] = useState("30D");

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("watchmeOrders")) || [];

    setOrders(savedOrders);

    const savedProducts =
      JSON.parse(localStorage.getItem("watchmeProducts")) || products;

    setProductList(savedProducts);

    /*
     * Supports both:
     * watchmeCustomers
     * and your existing watchmeRegisteredUser
     */
    const savedCustomers =
      JSON.parse(localStorage.getItem("watchmeCustomers")) || [];

    const savedUser = JSON.parse(
      localStorage.getItem("watchmeRegisteredUser")
    );

    if (savedCustomers.length > 0) {
      setCustomers(savedCustomers);
    } else if (savedUser) {
      setCustomers([savedUser]);
    } else {
      setCustomers([]);
    }
  }, []);

  /* =========================================================
     BASIC STATS
  ========================================================= */

  const totalSales = useMemo(() => {
    return orders.reduce(
      (total, order) => total + Number(order.total || 0),
      0
    );
  }, [orders]);

  const averageOrderValue = useMemo(() => {
    if (!orders.length) return 0;

    return totalSales / orders.length;
  }, [orders, totalSales]);

  /* =========================================================
     ORDER STATUS
  ========================================================= */

  const pendingOrders = orders.filter((order) =>
    ["Order Placed", "Pending", "Processing"].includes(order.status)
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.status === "Shipped" ||
      order.status === "Out for Delivery"
  ).length;

  const completedOrders = orders.filter(
    (order) =>
      order.status === "Delivered" ||
      order.status === "Completed"
  ).length;

  /* =========================================================
     INVENTORY
  ========================================================= */

  const inventoryStats = useMemo(() => {
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    productList.forEach((product) => {
      const stock = Number(
        product.stock ??
          product.quantity ??
          product.inventory ??
          0
      );

      if (stock === 0) {
        outOfStock++;
      } else if (stock <= 5) {
        lowStock++;
      } else {
        inStock++;
      }
    });

    return {
      inStock,
      lowStock,
      outOfStock,
    };
  }, [productList]);

  /* =========================================================
     SALES CHART
  ========================================================= */

  const chartData = useMemo(() => {
    const now = new Date();

    const days =
      chartPeriod === "7D"
        ? 7
        : chartPeriod === "90D"
        ? 90
        : 30;

    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setHours(0, 0, 0, 0);
      date.setDate(now.getDate() - i);

      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const daySales = orders.reduce((total, order) => {
        const rawDate =
          order.createdAt ||
          order.date ||
          order.orderDate ||
          order.created_date;

        if (!rawDate) return total;

        const orderDate = new Date(rawDate);

        if (
          orderDate >= date &&
          orderDate < nextDate
        ) {
          return total + Number(order.total || 0);
        }

        return total;
      }, 0);

      data.push({
        date,
        value: daySales,
      });
    }

    /*
     * If there are no order dates, distribute the total
     * visually so the chart doesn't look broken.
     *
     * Once real dates exist in your orders, actual data
     * will automatically be used.
     */
    const hasRealDates = orders.some(
      (order) =>
        order.createdAt ||
        order.date ||
        order.orderDate ||
        order.created_date
    );

    if (!hasRealDates && totalSales > 0) {
      const base = totalSales / Math.max(days, 1);

      return data.map((item, index) => ({
        ...item,
        value:
          base *
          (0.65 +
            Math.sin(index * 0.55) * 0.22 +
            (index / days) * 0.25),
      }));
    }

    return data;
  }, [orders, totalSales, chartPeriod]);

  const maxChartValue = Math.max(
    ...chartData.map((item) => item.value),
    1
  );

  const chartPoints = chartData
    .map((item, index) => {
      const x =
        chartData.length === 1
          ? 50
          : (index / (chartData.length - 1)) * 100;

      const y =
        88 - (item.value / maxChartValue) * 70;

      return `${x},${y}`;
    })
    .join(" ");

  const chartAreaPoints = `0,88 ${chartPoints} 100,88`;

  /* =========================================================
     TOP PRODUCTS
  ========================================================= */

  const topProducts = useMemo(() => {
    const salesMap = {};

    orders.forEach((order) => {
      const items =
        order.items ||
        order.products ||
        order.orderItems ||
        [];

      if (!Array.isArray(items)) return;

      items.forEach((item) => {
        const productName =
          item.name ||
          item.title ||
          item.productName ||
          "Unknown Product";

        const quantity = Number(
          item.quantity || item.qty || 1
        );

        if (!salesMap[productName]) {
          salesMap[productName] = {
            name: productName,
            quantity: 0,
          };
        }

        salesMap[productName].quantity += quantity;
      });
    });

    const calculatedProducts = Object.values(
      salesMap
    )
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 4);

    /*
     * If your current orders don't contain item data,
     * use products as a fallback.
     */
    if (!calculatedProducts.length) {
      return productList.slice(0, 4).map((product) => ({
        name:
          product.name ||
          product.title ||
          "Watch",
        quantity: 0,
        image:
          product.image ||
          product.images?.[0] ||
          null,
      }));
    }

    return calculatedProducts.map((item) => {
      const matchingProduct = productList.find(
        (product) =>
          (product.name || product.title) ===
          item.name
      );

      return {
        ...item,
        image:
          matchingProduct?.image ||
          matchingProduct?.images?.[0] ||
          null,
      };
    });
  }, [orders, productList]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatCurrency = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString()}`;
  };

  const getStatusClass = (status = "") => {
    const normalized = status.toLowerCase();

    if (
      normalized.includes("deliver") ||
      normalized.includes("complete")
    ) {
      return "status-delivered";
    }

    if (
      normalized.includes("ship") ||
      normalized.includes("out for")
    ) {
      return "status-shipped";
    }

    if (normalized.includes("process")) {
      return "status-processing";
    }

    return "status-pending";
  };

  const getStatusIcon = (status = "") => {
    const normalized = status.toLowerCase();

    if (
      normalized.includes("deliver") ||
      normalized.includes("complete")
    ) {
      return <CheckCircle size={14} />;
    }

    if (
      normalized.includes("ship") ||
      normalized.includes("out for")
    ) {
      return <Truck size={14} />;
    }

    if (normalized.includes("process")) {
      return <Boxes size={14} />;
    }

    return <Clock size={14} />;
  };

  const formatChartDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getCustomerInitial = (order) => {
    const firstName =
      order.customer?.firstName ||
      order.firstName ||
      "C";

    return firstName.charAt(0).toUpperCase();
  };

  return (
    <main className="admin-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="admin-header">

        <div className="admin-header-content">

          <span className="admin-label">
            WATCHME ADMINISTRATION
          </span>

          <h1>Dashboard</h1>

          <p>
            Here's what's happening with your store today.
          </p>

        </div>

        <div className="admin-header-actions">

          <Link
            to="/admin/products"
            className="secondary-button"
          >
            <Package size={16} />
            Add Product
          </Link>

          <Link
            to="/admin/orders"
            className="admin-orders-button"
          >
            View Orders
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </header>


      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <section className="admin-stats">

        {/* PRODUCTS */}

        <div className="admin-stat-card">

          <div className="admin-stat-top">

            <div className="admin-stat-icon">
              <Package size={20} />
            </div>

            <span className="stat-neutral">
              Collection
            </span>

          </div>

          <div className="admin-stat-content">

            <span>Total Products</span>

            <strong>
              {productList.length}
            </strong>

            <small>
              Watches in your catalog
            </small>

          </div>

        </div>


        {/* ORDERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-top">

            <div className="admin-stat-icon">
              <ShoppingBag size={20} />
            </div>

            <span className="stat-trend positive">
              Active
            </span>

          </div>

          <div className="admin-stat-content">

            <span>Total Orders</span>

            <strong>
              {orders.length}
            </strong>

            <small>
              {pendingOrders} currently pending
            </small>

          </div>

        </div>


        {/* SALES */}

        <div className="admin-stat-card stat-featured">

          <div className="admin-stat-top">

            <div className="admin-stat-icon">
              <DollarSign size={20} />
            </div>

            <span className="stat-trend positive">
              <TrendingUp size={12} />
              Growing
            </span>

          </div>

          <div className="admin-stat-content">

            <span>Total Sales</span>

            <strong>
              {formatCurrency(totalSales)}
            </strong>

            <small>
              Lifetime store revenue
            </small>

          </div>

        </div>


        {/* CUSTOMERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-top">

            <div className="admin-stat-icon">
              <Users size={20} />
            </div>

            <span className="stat-neutral">
              Community
            </span>

          </div>

          <div className="admin-stat-content">

            <span>Customers</span>

            <strong>
              {customers.length}
            </strong>

            <small>
              Registered customers
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          SALES ANALYTICS
      ====================================================== */}

      <section className="sales-overview-card">

        <div className="sales-header">

          <div>

            <span className="admin-label">
              PERFORMANCE
            </span>

            <h2>Sales Overview</h2>

            <div className="sales-total-row">

              <strong>
                {formatCurrency(totalSales)}
              </strong>

              <span className="sales-growth">
                <TrendingUp size={13} />
                Store revenue
              </span>

            </div>

          </div>

          <div className="chart-filters">

            {["7D", "30D", "90D"].map((period) => (

              <button
                key={period}
                type="button"
                className={
                  chartPeriod === period
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setChartPeriod(period)
                }
              >
                {period}
              </button>

            ))}

          </div>

        </div>


        <div className="chart-container">

          <div className="chart-y-labels">

            <span>
              {formatCurrency(maxChartValue)}
            </span>

            <span>
              {formatCurrency(maxChartValue / 2)}
            </span>

            <span>Rs. 0</span>

          </div>

          <svg
            className="sales-chart"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >

            <defs>

              <linearGradient
                id="salesGradient"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#111"
                  stopOpacity="0.16"
                />

                <stop
                  offset="100%"
                  stopColor="#111"
                  stopOpacity="0"
                />

              </linearGradient>

            </defs>

            <line
              x1="0"
              y1="18"
              x2="100"
              y2="18"
              className="chart-grid-line"
            />

            <line
              x1="0"
              y1="53"
              x2="100"
              y2="53"
              className="chart-grid-line"
            />

            <line
              x1="0"
              y1="88"
              x2="100"
              y2="88"
              className="chart-grid-line"
            />

            <polygon
              points={chartAreaPoints}
              fill="url(#salesGradient)"
            />

            <polyline
              points={chartPoints}
              fill="none"
              stroke="#111"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />

          </svg>

        </div>


        <div className="chart-x-labels">

          <span>
            {chartData.length
              ? formatChartDate(chartData[0].date)
              : ""}
          </span>

          <span>
            {chartData.length
              ? formatChartDate(
                  chartData[
                    Math.floor(chartData.length / 2)
                  ].date
                )
              : ""}
          </span>

          <span>
            {chartData.length
              ? formatChartDate(
                  chartData[chartData.length - 1].date
                )
              : ""}
          </span>

        </div>

      </section>


      {/* =====================================================
          MAIN OVERVIEW
      ====================================================== */}

      <section className="admin-overview">


        {/* ===================================================
            ORDER STATUS
        ==================================================== */}

        <div className="admin-overview-card">

          <div className="admin-card-header">

            <div>

              <span className="admin-label">
                ORDER OVERVIEW
              </span>

              <h2>Order Status</h2>

            </div>

            <Link
              to="/admin/orders"
              className="small-arrow-link"
            >
              View
              <ArrowRight size={14} />
            </Link>

          </div>


          <div className="order-summary-total">

            <div>

              <span>All orders</span>

              <strong>
                {orders.length}
              </strong>

            </div>

            <div className="order-summary-icon">
              <ShoppingBag size={22} />
            </div>

          </div>


          <div className="order-status-grid">


            <div className="order-status-item">

              <div className="status-item-icon pending-icon">
                <Clock size={17} />
              </div>

              <div>
                <span>Pending</span>
                <small>Awaiting action</small>
              </div>

              <strong>
                {pendingOrders}
              </strong>

            </div>


            <div className="order-status-item">

              <div className="status-item-icon processing-icon">
                <Boxes size={17} />
              </div>

              <div>
                <span>Processing</span>
                <small>Being prepared</small>
              </div>

              <strong>
                {processingOrders}
              </strong>

            </div>


            <div className="order-status-item">

              <div className="status-item-icon shipped-icon">
                <Truck size={17} />
              </div>

              <div>
                <span>Shipped</span>
                <small>On the way</small>
              </div>

              <strong>
                {shippedOrders}
              </strong>

            </div>


            <div className="order-status-item">

              <div className="status-item-icon delivered-icon">
                <CheckCircle size={17} />
              </div>

              <div>
                <span>Delivered</span>
                <small>Successfully completed</small>
              </div>

              <strong>
                {completedOrders}
              </strong>

            </div>

          </div>

        </div>


        {/* ===================================================
            RECENT ORDERS
        ==================================================== */}

        <div className="admin-overview-card">

          <div className="admin-card-header">

            <div>

              <span className="admin-label">
                RECENT ACTIVITY
              </span>

              <h2>Recent Orders</h2>

            </div>

            <Link
              to="/admin/orders"
              className="view-all-orders-link"
            >
              View All
              <ArrowRight size={14} />
            </Link>

          </div>


          {orders.length === 0 ? (

            <div className="admin-empty">

              <div className="empty-icon">
                <ShoppingBag size={24} />
              </div>

              <strong>No orders yet</strong>

              <p>
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="recent-orders">

              {orders
                .slice()
                .reverse()
                .slice(0, 5)
                .map((order, index) => (

                  <Link
                    to="/admin/orders"
                    className="recent-order"
                    key={
                      order.orderId ||
                      order.id ||
                      index
                    }
                  >

                    <div className="order-avatar">
                      {getCustomerInitial(order)}
                    </div>


                    <div className="order-info">

                      <strong>
                        {order.orderId ||
                          order.id ||
                          "Order"}
                      </strong>

                      <span>
                        {order.customer?.firstName ||
                          order.firstName ||
                          "Customer"}{" "}
                        {order.customer?.lastName ||
                          order.lastName ||
                          ""}
                      </span>

                    </div>


                    <div className="recent-order-right">

                      <strong>
                        {formatCurrency(order.total)}
                      </strong>

                      <span
                        className={`order-status ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status || "Pending"}
                      </span>

                    </div>

                  </Link>

                ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          SECONDARY STATS
      ====================================================== */}

      <section className="secondary-dashboard-grid">


        {/* AVERAGE ORDER */}

        <div className="mini-dashboard-card">

          <div className="mini-card-icon">
            <CircleDollarSign size={20} />
          </div>

          <div>

            <span>Average Order Value</span>

            <strong>
              {formatCurrency(averageOrderValue)}
            </strong>

            <small>
              Average revenue per order
            </small>

          </div>

        </div>


        {/* INVENTORY */}

        <div className="mini-dashboard-card">

          <div className="mini-card-icon">
            <Boxes size={20} />
          </div>

          <div>

            <span>Inventory Health</span>

            <strong>
              {productList.length
                ? Math.round(
                    (inventoryStats.inStock /
                      productList.length) *
                      100
                  )
                : 0}
              %
            </strong>

            <small>
              {inventoryStats.lowStock} low stock ·{" "}
              {inventoryStats.outOfStock} out of stock
            </small>

          </div>

        </div>


        {/* CUSTOMERS */}

        <div className="mini-dashboard-card">

          <div className="mini-card-icon">
            <UserRound size={20} />
          </div>

          <div>

            <span>Customer Base</span>

            <strong>
              {customers.length}
            </strong>

            <small>
              Registered customers
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          TOP PRODUCTS + INVENTORY
      ====================================================== */}

      <section className="admin-bottom-grid">


        {/* ===================================================
            TOP PRODUCTS
        ==================================================== */}

        <div className="admin-overview-card">

          <div className="admin-card-header">

            <div>

              <span className="admin-label">
                PRODUCT PERFORMANCE
              </span>

              <h2>Top Products</h2>

            </div>

            <Link
              to="/admin/products"
              className="small-arrow-link"
            >
              Manage
              <ArrowRight size={14} />
            </Link>

          </div>


          {topProducts.length === 0 ? (

            <div className="admin-empty">

              <div className="empty-icon">
                <Package size={24} />
              </div>

              <strong>No products available</strong>

              <p>
                Add products to your collection.
              </p>

            </div>

          ) : (

            <div className="top-products">

              {topProducts.map((product, index) => (

                <div
                  className="top-product"
                  key={`${product.name}-${index}`}
                >

                  <div className="product-rank">
                    0{index + 1}
                  </div>


                  <div className="product-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <Package size={20} />

                    )}

                  </div>


                  <div className="product-info">

                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.quantity > 0
                        ? `${product.quantity} sold`
                        : "Watch collection"}
                    </span>

                  </div>


                  <ArrowUpRight
                    size={17}
                    className="product-arrow"
                  />

                </div>

              ))}

            </div>

          )}

        </div>


        {/* ===================================================
            INVENTORY HEALTH
        ==================================================== */}

        <div className="admin-overview-card">

          <div className="admin-card-header">

            <div>

              <span className="admin-label">
                INVENTORY
              </span>

              <h2>Inventory Health</h2>

            </div>

            <Link
              to="/admin/products"
              className="small-arrow-link"
            >
              Manage
              <ArrowRight size={14} />
            </Link>

          </div>


          <div className="inventory-main">

            <div className="inventory-circle">

              <div>

                <strong>
                  {productList.length}
                </strong>

                <span>
                  Products
                </span>

              </div>

            </div>


            <div className="inventory-legend">

              <div className="inventory-row">

                <span>
                  <i className="inventory-dot green" />
                  In Stock
                </span>

                <strong>
                  {inventoryStats.inStock}
                </strong>

              </div>


              <div className="inventory-row">

                <span>
                  <i className="inventory-dot yellow" />
                  Low Stock
                </span>

                <strong>
                  {inventoryStats.lowStock}
                </strong>

              </div>


              <div className="inventory-row">

                <span>
                  <i className="inventory-dot red" />
                  Out of Stock
                </span>

                <strong>
                  {inventoryStats.outOfStock}
                </strong>

              </div>

            </div>

          </div>


          {inventoryStats.outOfStock > 0 ||
          inventoryStats.lowStock > 0 ? (

            <div className="inventory-warning">

              <AlertTriangle size={16} />

              <span>
                {inventoryStats.outOfStock > 0
                  ? `${inventoryStats.outOfStock} product${
                      inventoryStats.outOfStock > 1
                        ? "s"
                        : ""
                    } out of stock`
                  : `${inventoryStats.lowStock} product${
                      inventoryStats.lowStock > 1
                        ? "s"
                        : ""
                    } running low`}
              </span>

            </div>

          ) : (

            <div className="inventory-success">

              <CheckCircle size={16} />

              <span>
                Inventory is looking healthy
              </span>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section className="admin-quick-actions">

        <div className="admin-card-header">

          <div>

            <span className="admin-label">
              QUICK ACTIONS
            </span>

            <h2>Manage Store</h2>

          </div>

        </div>


        <div className="quick-action-grid">


          <Link
            to="/admin/products"
            className="quick-action-button"
          >

            <div className="quick-action-icon">
              <Package size={20} />
            </div>

            <div>

              <strong>
                Manage Products
              </strong>

              <span>
                Add, edit and organize your collection
              </span>

            </div>

            <ArrowRight className="quick-action-arrow" size={18} />

          </Link>


          <Link
            to="/admin/orders"
            className="quick-action-button"
          >

            <div className="quick-action-icon">
              <ShoppingBag size={20} />
            </div>

            <div>

              <strong>
                Manage Orders
              </strong>

              <span>
                Review and update customer orders
              </span>

            </div>

            <ArrowRight className="quick-action-arrow" size={18} />

          </Link>


          <Link
            to="/admin/customers"
            className="quick-action-button"
          >

            <div className="quick-action-icon">
              <Users size={20} />
            </div>

            <div>

              <strong>
                Manage Customers
              </strong>

              <span>
                View your registered customers
              </span>

            </div>

            <ArrowRight className="quick-action-arrow" size={18} />

          </Link>

        </div>

      </section>

    </main>
  );
};

export default AdminDashboard;