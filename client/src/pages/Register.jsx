import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Create the user object
    const userData = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      registeredAt: new Date().toISOString(),
    };

    // -----------------------------------
    // Save the latest registered user
    // -----------------------------------
    localStorage.setItem(
      "watchmeRegisteredUser",
      JSON.stringify(userData)
    );

    // -----------------------------------
    // Save user to customer list
    // -----------------------------------
    const existingCustomers =
      JSON.parse(
        localStorage.getItem("watchmeCustomers")
      ) || [];

    // Check if email already exists
    const customerExists = existingCustomers.some(
      (customer) =>
        customer.email.toLowerCase() ===
        userData.email.toLowerCase()
    );

    if (!customerExists) {
      existingCustomers.push(userData);

      localStorage.setItem(
        "watchmeCustomers",
        JSON.stringify(existingCustomers)
      );
    }

    alert("Account created successfully!");

    // Go to login page
    navigate("/login");
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        <div className="auth-image register-image">
          <div>
            <p>WATCHME</p>

            <h2>
              Find your
              <br />
              <em>moment.</em>
            </h2>
          </div>
        </div>

        <div className="auth-form-container">

          <div className="auth-form">

            <p className="section-label">
              JOIN WATCHME
            </p>

            <h1>Create Account</h1>

            <p className="auth-subtitle">
              Create an account and start your collection.
            </p>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* PASSWORD */}

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark auth-button"
              >
                Create Account
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">
                Sign In
              </Link>
            </p>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Register;