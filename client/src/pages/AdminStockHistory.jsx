import { useEffect, useState } from "react";
import { PackagePlus, ShoppingCart, Search } from "lucide-react";
import "./AdminStockHistory.css";

const AdminStockHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("watchmeStockHistory") || "[]"
    );

    setHistory(savedHistory);
  }, []);

  const filteredHistory = history.filter((item) =>
    item.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <main className="admin-stock-history-page">

      <div className="admin-stock-history-header">
        <div>
          <span className="admin-label">
            WATCHME ADMIN
          </span>

          <h1>Stock History</h1>

          <p>
            Track product restocks and sales.
          </p>
        </div>
      </div>

      <div className="admin-stock-history-toolbar">

        <div className="admin-stock-history-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <span>
          {filteredHistory.length} movement
          {filteredHistory.length !== 1 ? "s" : ""}
        </span>

      </div>

      <section className="admin-stock-history-card">

        {filteredHistory.length === 0 ? (

          <div className="admin-stock-history-empty">
            <h3>No stock history found</h3>

            <p>
              Stock movements will appear here.
            </p>
          </div>

        ) : (

          <div className="admin-stock-history-table-wrapper">

            <table className="admin-stock-history-table">

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Previous Stock</th>
                  <th>Quantity</th>
                  <th>Remaining</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {filteredHistory.map((item) => {

                  const isRestock =
                    item.type === "restock";

                  const quantity = isRestock
                    ? item.addedQuantity
                    : item.soldQuantity;

                  return (
                    <tr key={item.id}>

                      <td>
                        <strong>
                          {item.productName}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`stock-history-type ${
                            isRestock
                              ? "restock"
                              : "sale"
                          }`}
                        >
                          {isRestock ? (
                            <>
                              <PackagePlus size={14} />
                              Restock
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={14} />
                              Sale
                            </>
                          )}
                        </span>
                      </td>

                      <td>
                        {item.previousStock}
                      </td>

                      <td>
                        <strong
                          className={
                            isRestock
                              ? "quantity-positive"
                              : "quantity-negative"
                          }
                        >
                          {isRestock ? "+" : "-"}
                          {quantity}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          {item.remainingStock}
                        </strong>
                      </td>

                      <td>
                        {formatDate(item.date)}
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
