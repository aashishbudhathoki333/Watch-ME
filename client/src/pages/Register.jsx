import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

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

    alert(
      "Registration functionality will be connected to the backend later."
    );

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
            <p className="section-label">JOIN WATCHME</p>

            <h1>Create Account</h1>

            <p className="auth-subtitle">
              Create an account and start your collection.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
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

              <div className="form-group">
                <label>Email Address</label>
                <input
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

              <div className="form-group">
                <label>Password</label>
                <input
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

              <div className="form-group">
                <label>Confirm Password</label>
                <input
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
              <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;