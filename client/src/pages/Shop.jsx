import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";

const Shop = () => {
  const params = new URLSearchParams(window.location.search);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    params.get("category") || "All"
  );
  const [type, setType] = useState(
    params.get("type") || "All"
  );
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesType =
        type === "All" || product.type === type;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, type, sort]);

  return (
    <main className="shop-page">
      <section className="page-header">
        <p className="section-label">WATCHME COLLECTION</p>
        <h1>Shop Watches</h1>
        <p>
          Find the perfect timepiece for every occasion.
        </p>
      </section>

      <section className="shop-container">
        <div className="shop-toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <button
            type="button"
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="rating">
              Highest Rated
            </option>
          </select>
        </div>

        <div className="shop-layout">
          <aside
            className={`filters ${
              showFilters ? "show" : ""
            }`}
          >
            <div className="filter-header">
              <h3>Filters</h3>

              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setType("All");
                }}
              >
                Clear
              </button>
            </div>

            <div className="filter-group">
              <h4>Category</h4>

              {["All", "Men", "Women", "Unisex"].map(
                (item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => setCategory(item)}
                    />
                    {item === "All"
                      ? "All Watches"
                      : `${item}'s Watches`}
                  </label>
                )
              )}
            </div>

            <div className="filter-group">
              <h4>Style</h4>

              {[
                "All",
                "Classic",
                "Luxury",
                "Sport",
                "Minimal",
              ].map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="type"
                    checked={type === item}
                    onChange={() => setType(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </aside>

          <div className="shop-products">
            <div className="results-count">
              {filteredProducts.length} watches found
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;