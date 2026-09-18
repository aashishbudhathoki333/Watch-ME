import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Boxes,
  Package,
  Plus,
  ShoppingBag,
} from "lucide-react";

import "./AdminStockHistory.css";

const AdminStockHistory = () => {
  const [stockHistory, setStockHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("watchmeStockHistory") || "[]"
    );

    setStockHistory(savedHistory);
  }, []);

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <main className="admin-stock-history-page">

      {/* HEADER */}

      <header className="stock-history-page-header">

        <div>

          <Link
            to="/admin"
            className="stock-history-back"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>

          <span className="admin-label">
            INVENTORY MANAGEMENT
          </span>

          <h1>Stock History</h1>

          <p>
            Track every restock and stock reduction in your store.
          </p>

        </div>

        <Link
          to="/admin/products"
          className="stock-history-restock-link"
        >
          <Plus size={16} />
          Restock Products
        </Link>

      </header>


      {/* SUMMARY */}

      <section className="stock-history-summary">

        <div className="stock-history-summary-card">

          <div className="stock-history-summary-icon">
            <Boxes size={20} />
          </div>

          <div>
            <span>Total Movements</span>
            <strong>{stockHistory.length}</strong>
          </div>

        </div>


        <div className="stock-history-summary-card">

          <div className="stock-history-summary-icon restock">
            <ArrowUp size={20} />
          </div>

          <div>
            <span>Restocks</span>

            <strong>
              {
                stockHistory.filter(
                  (entry) => entry.type === "restock"
                ).length
              }
            </strong>

          </div>

        </div>


        <div className="stock-history-summary-card">

          <div className="stock-history-summary-icon sale">
            <ArrowDown size={20} />
          </div>

          <div>
            <span>Stock Reductions</span>

            <strong>
              {
                stockHistory.filter(
                  (entry) => entry.type !== "restock"
                ).length
              }
            </strong>

          </div>

        </div>

      </section>


      {/* HISTORY */}

      <section className="stock-history-table-card">

        <div className="stock-history-table-header">

          <div>

            <span className="admin-label">
              INVENTORY ACTIVITY
            </span>

            <h2>All Stock Movements</h2>

          </div>

          <Boxes size={22} />

        </div>


        {stockHistory.length === 0 ? (

          <div className="stock-history-page-empty">

            <Package size={32} />

            <h3>No stock history yet</h3>

            <p>
              Restocks and stock reductions will appear here.
            </p>

            <Link to="/admin/products">
              Go to Products
            </Link>

          </div>

        ) : (

          <div className="stock-history-table-wrapper">

            <table className="stock-history-table">

              <thead>

                <tr>

                  <th>Product</th>

                  <th>Type</th>

                  <th>Previous Stock</th>

                  <th>Change</th>

                  <th>Remaining</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {stockHistory.map((entry) => {

                  const isRestock =
                    entry.type === "restock";

                  const quantity = isRestock
                    ? entry.addedQuantity
                    : entry.soldQuantity;

                  return (

                    <tr key={entry.id}>

                      {/* PRODUCT */}

                      <td>

                        <div className="stock-history-product-cell">

                          <div className="stock-history-product-icon">

                            {isRestock ? (
                              <Package size={17} />
                            ) : (
                              <ShoppingBag size={17} />
                            )}

                          </div>

                          <div>

                            <strong>
                              {entry.productName}
                            </strong>

                            <span>
                              Product ID: {entry.productId}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* TYPE */}

                      <td>

                        <span
                          className={
                            isRestock
                              ? "stock-history-type restock"
                              : "stock-history-type sale"
                          }
                        >

                          {isRestock ? (
                            <>
                              <ArrowUp size={13} />
                              Restock
                            </>
                          ) : (
                            <>
                              <ArrowDown size={13} />
                              Sale
                            </>
                          )}

                        </span>

                      </td>


                      {/* PREVIOUS */}

                      <td>

                        <strong>
                          {entry.previousStock}
                        </strong>

                      </td>


                      {/* CHANGE */}

                      <td>

                        <strong
                          className={
                            isRestock
                              ? "stock-change-positive"
                              : "stock-change-negative"
                          }
                        >

                          {isRestock ? "+" : "-"}
                          {quantity || 0}

                        </strong>

                      </td>


                      {/* REMAINING */}

                      <td>

                        <strong
                          className={
                            Number(entry.remainingStock) === 0
                              ? "stock-remaining-zero"
                              : "stock-remaining"
                          }
                        >
                          {entry.remainingStock}
                        </strong>

                      </td>


                      {/* DATE */}

                      <td>

                        <span className="stock-history-date">
                          {formatDate(entry.date)}
                        </span>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </main>
  );
};

export default AdminStockHistory;
