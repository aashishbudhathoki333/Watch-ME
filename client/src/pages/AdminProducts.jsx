import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Package,
} from "lucide-react";

import products from "../data/products";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [productList, setProductList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [restockProduct, setRestockProduct] = useState(null);
const [restockQuantity, setRestockQuantity] = useState("");

  const emptyProduct = {
    name: "",
    category: "Men",
    collection: "Classic",
    price: "",
    oldPrice: "",
    rating: "5",
    reviews: "0",
    stock: "0",
    badge: "",
    color: "black",
    image: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyProduct);

  // Load products
  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("watchmeProducts"));

    if (savedProducts) {
      setProductList(savedProducts);
    } else {
      setProductList(products);
      localStorage.setItem(
        "watchmeProducts",
        JSON.stringify(products)
      );
    }
  }, []);

  // Save products
  const saveProducts = (updatedProducts) => {
    setProductList(updatedProducts);

    localStorage.setItem(
      "watchmeProducts",
      JSON.stringify(updatedProducts)
    );
  };

  // Open Add Product form
  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setShowForm(true);
  };

  // Open Edit Product form
  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      collection: product.collection,
      price: product.price,
      oldPrice: product.oldPrice,
      rating: product.rating,
      reviews: product.reviews,
      stock: product.stock ?? 0,
      badge: product.badge || "",
      color: product.color || "black",
      image: product.image || "",
      description: product.description || "",
    });

    setShowForm(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Submit product
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,

      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      stock: Number(formData.stock),
    };

    if (editingProduct) {
      const updatedProducts = productList.map((product) =>
        product.id === editingProduct.id
          ? {
              ...productData,
              id: editingProduct.id,
            }
          : product
      );

      saveProducts(updatedProducts);
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
      };

      saveProducts([
        ...productList,
        newProduct,
      ]);
    }

    setShowForm(false);
    setEditingProduct(null);
    setFormData(emptyProduct);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const updatedProducts = productList.filter(
      (product) => product.id !== id
    );

    saveProducts(updatedProducts);
  };

// Restock product
const handleRestock = () => {
  if (!restockProduct) return;

  const quantity = Number(restockQuantity);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    alert("Please enter a valid restock quantity.");
    return;
  }

  const updatedProducts = productList.map((product) =>
    product.id === restockProduct.id
      ? {
          ...product,
          stock: Number(product.stock ?? 0) + quantity,
        }
      : product
  );

  saveProducts(updatedProducts);

  // Save stock movement history
  const stockHistory = JSON.parse(
    localStorage.getItem("watchmeStockHistory") || "[]"
  );

  const previousStock = Number(
    restockProduct.stock ?? 0
  );

  stockHistory.unshift({
    id: `${Date.now()}-${restockProduct.id}`,
    productId: restockProduct.id,
    productName: restockProduct.name,
    previousStock,
    addedQuantity: quantity,
    remainingStock: previousStock + quantity,
    type: "restock",
    date: new Date().toISOString(),
  });

  localStorage.setItem(
    "watchmeStockHistory",
    JSON.stringify(stockHistory)
  );

  setRestockProduct(null);
  setRestockQuantity("");
};

  // Stock status
  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        className: "out-of-stock",
      };
    }

    if (quantity <= 5) {
      return {
        label: "Low Stock",
        className: "low-stock",
      };
    }

    return {
      label: "In Stock",
      className: "in-stock",
    };
  };

  // Search
  const filteredProducts = productList.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <main className="admin-products-page">

      {/* HEADER */}

      <div className="admin-products-header">

        <div>
          <span className="admin-label">
            WATCHME ADMIN
          </span>

          <h1>Manage Products</h1>

          <p>
            Add, edit and manage watches in your store.
          </p>
        </div>

        <button
          type="button"
          className="add-product-button"
          onClick={handleAddProduct}
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      {/* SEARCH */}

      <div className="admin-product-toolbar">

        <div className="admin-product-search">
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
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </span>

      </div>

      {/* PRODUCT TABLE */}

      <section className="admin-products-card">

        {filteredProducts.length === 0 ? (

          <div className="admin-products-empty">
            <h3>No products found</h3>

            <p>
              Try searching for another product.
            </p>
          </div>

        ) : (

          <div className="admin-products-table-wrapper">

            <table className="admin-products-table">

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Collection</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map(
                  (product) => {

                    const stockStatus =
                      getStockStatus(product.stock);

                    return (
                      <tr key={product.id}>

                        <td>
                          <div className="admin-product-name">

                            <div
                              className={`admin-product-preview ${product.color}`}
                            >
                              WATCHME
                            </div>

                            <div>
                              <strong>
                                {product.name}
                              </strong>

                              {product.badge && (
                                <span>
                                  {product.badge}
                                </span>
                              )}
                            </div>

                          </div>
                        </td>

                        <td>
                          {product.category}
                        </td>

                        <td>
                          {product.collection}
                        </td>

                        <td>
                          <strong>
                            Rs.{" "}
                            {Number(
                              product.price || 0
                            ).toLocaleString()}
                          </strong>
                        </td>

                        <td>
                          <div className="admin-stock-info">

                            <strong>
                              {Number(
                                product.stock || 0
                              )}
                            </strong>

                            <span
                              className={`stock-status ${stockStatus.className}`}
                            >
                              {stockStatus.label}
                            </span>

                          </div>
                        </td>

                        <td>
                          ⭐ {product.rating}
                        </td>

                        <td>

                          <div className="admin-product-actions">
                            <button
  type="button"
  className="restock-product-button"
  onClick={() => {
    setRestockProduct(product);
    setRestockQuantity("");
  }}
  aria-label={`Restock ${product.name}`}
>
  <Package size={16} />
</button>

                            <button
                              type="button"
                              className="edit-product-button"
                              onClick={() =>
                                handleEditProduct(product)
                              }
                              aria-label="Edit product"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="delete-product-button"
                              onClick={() =>
                                handleDeleteProduct(
                                  product.id
                                )
                              }
                              aria-label="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

      {/* PRODUCT FORM MODAL */}

      {showForm && (

        <div className="admin-modal-overlay">

          <div className="admin-product-modal">

            <div className="admin-modal-header">

              <div>
                <span className="admin-label">
                  WATCHME ADMIN
                </span>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>
              </div>

              <button
                type="button"
                className="close-admin-modal"
                onClick={() =>
                  setShowForm(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="admin-product-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="admin-form-group">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ocean Master"
                  required
                />

              </div>

              {/* CATEGORY + COLLECTION */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Men">
                      Men
                    </option>

                    <option value="Women">
                      Women
                    </option>

                    <option value="Luxury">
                      Luxury
                    </option>

                  </select>

                </div>

                <div className="admin-form-group">

                  <label>
                    Collection
                  </label>

                  <select
                    name="collection"
                    value={formData.collection}
                    onChange={handleChange}
                  >
                    <option value="Classic">
                      Classic
                    </option>

                    <option value="Elegant">
                      Elegant
                    </option>

                    <option value="Sport">
                      Sport
                    </option>

                    <option value="Luxury">
                      Luxury
                    </option>

                    <option value="Modern">
                      Modern
                    </option>

                  </select>

                </div>

              </div>

              {/* PRICES */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Current Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="12999"
                    min="0"
                    required
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Old Price
                  </label>

                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    placeholder="15999"
                    min="0"
                    required
                  />

                </div>

              </div>

              {/* RATING + REVIEWS */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Rating
                  </label>

                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Review Count
                  </label>

                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    min="0"
                    required
                  />

                </div>

              </div>

              {/* STOCK */}

              <div className="admin-form-group">

                <label>
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  placeholder="20"
                  required
                />

                <small className="stock-help-text">
                  Set the number of watches currently available.
                </small>

              </div>

              {/* BADGE + COLOR */}

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Badge
                  </label>

                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    placeholder="Best Seller"
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Watch Color
                  </label>

                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    <option value="black">
                      Black
                    </option>

                    <option value="silver">
                      Silver
                    </option>

                    <option value="rose">
                      Rose
                    </option>

                    <option value="gold">
                      Gold
                    </option>

                  </select>

                </div>

              </div>

              {/* PRODUCT IMAGE */}

              <div className="admin-form-group">

                <label>
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file =
                      e.target.files[0];

                    if (!file) return;

                    const reader =
                      new FileReader();

                    reader.onloadend = () => {
                      setFormData((prev) => ({
                        ...prev,
                        image: reader.result,
                      }));
                    };

                    reader.readAsDataURL(file);
                  }}
                />

                <small className="image-help-text">
                  Choose a watch image from your computer.
                </small>

                {formData.image && (
                  <div className="image-upload-preview">
                    <img
                      src={formData.image}
                      alt="Product preview"
                    />
                  </div>
                )}

              </div>

              {/* DESCRIPTION */}

              <div className="admin-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the watch..."
                  required
                />

              </div>

              {/* ACTIONS */}

              <div className="admin-form-actions">

                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                >
                  {editingProduct
                    ? "Save Changes"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {restockProduct && (
        <div className="admin-modal-overlay">
          <div className="admin-product-modal restock-modal">

            <div className="admin-modal-header">
              <div>
                <span className="admin-label">
                  WATCHME ADMIN
                </span>

                <h2>Restock Product</h2>
              </div>

              <button
                type="button"
                className="close-admin-modal"
                onClick={() => {
                  setRestockProduct(null);
                  setRestockQuantity("");
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="restock-product-info">
              <h3>{restockProduct.name}</h3>

              <p>
                Current stock:{" "}
                <strong>
                  {Number(restockProduct.stock ?? 0)}
                </strong>
              </p>
            </div>

            <form
              className="admin-product-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleRestock();
              }}
            >
              <div className="admin-form-group">
                <label>
                  Quantity to Add
                </label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={restockQuantity}
                  onChange={(e) =>
                    setRestockQuantity(e.target.value)
                  }
                  placeholder="Enter quantity"
                  required
                  autoFocus
                />
              </div>

              <div className="restock-new-stock">
                New stock after restock:{" "}
                <strong>
                  {Number(restockProduct.stock ?? 0) +
                    Number(restockQuantity || 0)}
                </strong>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={() => {
                    setRestockProduct(null);
                    setRestockQuantity("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                >
                  Restock Product
                </button>
              </div>
            </form>

          </div>
        </div>
      )}


    </main>
  );
};

export default AdminProducts;