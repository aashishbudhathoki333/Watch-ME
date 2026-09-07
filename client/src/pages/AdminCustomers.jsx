import { useEffect, useState } from "react";
import { Search, Users, X } from "lucide-react";

import "./AdminCustomers.css";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const savedCustomers =
      JSON.parse(localStorage.getItem("watchmeCustomers")) || [];

    setCustomers(savedCustomers);
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search)
    );
  });

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  return (
    <main className="admin-customers-page">

      {/* HEADER */}
      <div className="admin-customers-header">
        <div>
          <span className="admin-label">
            CUSTOMER MANAGEMENT
          </span>

          <h1>Customers</h1>

          <p>
            Manage your WatchMe customers.
          </p>
        </div>

        <div className="customer-count">
          <Users size={20} />
          <span>{customers.length} Customers</span>
        </div>
      </div>


      {/* SEARCH */}
      <div className="admin-customers-toolbar">

        <div className="customer-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

      </div>


      {/* CUSTOMER TABLE */}
      <div className="admin-customers-table-wrapper">

        {filteredCustomers.length === 0 ? (

          <div className="admin-customers-empty">

            <Users size={40} />

            <h3>No customers found</h3>

            <p>
              {customers.length === 0
                ? "No customers have registered yet."
                : "Try a different search."}
            </p>

          </div>

        ) : (

          <table className="admin-customers-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.map(
                (customer, index) => (

                  <tr key={customer.id || customer.email}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <div className="customer-name">
                        <div className="customer-avatar">
                          {customer.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {customer.name}
                        </strong>
                      </div>
                    </td>

                    <td>
                      {customer.email}
                    </td>

                    <td>
                      {formatDate(
                        customer.registeredAt
                      )}
                    </td>

                    <td>
                      <button
                        className="customer-view-button"
                        onClick={() =>
                          setSelectedCustomer(customer)
                        }
                      >
                        View
                      </button>
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>


      {/* CUSTOMER MODAL */}
      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() =>
            setSelectedCustomer(null)
          }
        >

          <div
            className="customer-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="customer-modal-close"
              onClick={() =>
                setSelectedCustomer(null)
              }
            >
              <X size={20} />
            </button>


            <div className="customer-modal-avatar">
              {selectedCustomer.name
                ?.charAt(0)
                .toUpperCase()}
            </div>


            <h2>
              {selectedCustomer.name}
            </h2>

            <p className="customer-modal-email">
              {selectedCustomer.email}
            </p>


            <div className="customer-details">

              <div>
                <span>Customer ID</span>
                <strong>
                  {selectedCustomer.id || "N/A"}
                </strong>
              </div>

              <div>
                <span>Registered</span>
                <strong>
                  {formatDate(
                    selectedCustomer.registeredAt
                  )}
                </strong>
              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
};

export default AdminCustomers;