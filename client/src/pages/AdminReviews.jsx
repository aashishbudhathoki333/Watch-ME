import { useEffect, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import productList from "../data/products";
import "./AdminReviews.css";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedReviews = localStorage.getItem("watchmeReviews");

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const getProductName = (productId) => {
  const product = productList.find(
  (item) => item.id === Number(productId)
);

    return product ? product.name : "Unknown Product";
  };

  const handleDelete = (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewId
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      "watchmeReviews",
      JSON.stringify(updatedReviews)
    );
  };

  const filteredReviews = reviews.filter((review) => {
    const productName = getProductName(review.productId).toLowerCase();
    const customerName = String(review.name || "").toLowerCase();
    const email = String(review.email || "").toLowerCase();
    const comment = String(review.comment || "").toLowerCase();

    const query = searchTerm.toLowerCase().trim();

    return (
      productName.includes(query) ||
      customerName.includes(query) ||
      email.includes(query) ||
      comment.includes(query)
    );
  });

  return (
    <main className="admin-reviews-page">
      <div className="admin-reviews-container">

        {/* HEADER */}
        <div className="admin-reviews-header">
          <div>
            <h1>Review Management</h1>
            <p>
              Manage customer reviews and ratings for your products.
            </p>
          </div>

          <div className="review-count">
            {reviews.length}{" "}
            {reviews.length === 1 ? "Review" : "Reviews"}
          </div>
        </div>

        {/* SEARCH */}
        <div className="admin-review-search">
          <input
            type="text"
            placeholder="Search reviews, customers or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* REVIEWS */}
        {filteredReviews.length === 0 ? (
          <div className="no-reviews">
            <h2>No Reviews Found</h2>
            <p>
              {reviews.length === 0
                ? "Customer reviews will appear here once they are submitted."
                : "No reviews match your search."}
            </p>
          </div>
        ) : (
          <div className="admin-reviews-list">
            {filteredReviews.map((review) => (
              <article
                className="admin-review-card"
                key={review.id}
              >
                {/* TOP */}
                <div className="admin-review-top">

                  <div className="admin-review-customer">
                    <div className="customer-avatar">
                      {String(review.name || "C")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>
                        {review.name || "WatchMe Customer"}
                      </h3>

                      <p>
                        {review.email || "Email not available"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="admin-delete-review"
                    onClick={() => handleDelete(review.id)}
                    title="Delete Review"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

                {/* PRODUCT */}
                <div className="admin-review-product">
                  <span>Product:</span>
                  <strong>
                    {getProductName(review.productId)}
                  </strong>
                </div>

                {/* RATING */}
                <div className="admin-review-rating">

                  <div className="admin-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={17}
                        fill={
                          star <= Number(review.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>

                  <strong>
                    {Number(review.rating).toFixed(1)}
                  </strong>
                </div>

                {/* COMMENT */}
                <div className="admin-review-comment">
                  <p>
                    "{review.comment}"
                  </p>
                </div>

                {/* DATE */}
                <div className="admin-review-date">
                  {review.date
                    ? new Date(
                        review.date
                      ).toLocaleDateString()
                    : ""}
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default AdminReviews;