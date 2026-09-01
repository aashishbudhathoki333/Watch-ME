import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  return (
    <BrowserRouter>

      <CartProvider>
        <WishlistProvider>

          <ScrollToTop />

          <Navbar />

          <Routes>

            {/* ================= HOME ================= */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* ================= SHOP ================= */}

            <Route
              path="/shop"
              element={<Shop />}
            />

            {/* ================= CATEGORIES ================= */}

            <Route
              path="/categories"
              element={<Categories />}
            />

            {/* ================= PRODUCT DETAILS ================= */}

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            {/* ================= CART ================= */}

            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* ================= WISHLIST ================= */}

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            {/* ================= CHECKOUT ================= */}

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* ================= AUTH ================= */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* ================= OTHER PAGES ================= */}

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* ================= ORDER SUCCESS ================= */}

            <Route
              path="/success"
              element={<OrderSuccess />}
            />

            {/* ================= 404 ================= */}

            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404</h1>
                  <p>Page not found.</p>
                </div>
              }
            />

          </Routes>

          <Footer />

        </WishlistProvider>
      </CartProvider>

    </BrowserRouter>
  );
};

export default App;

