import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend login
    // Backend authentication will be connected later.
    const userData = {
      email: form.email,
      name: form.email.split("@")[0],
    };

    login(userData);

    alert("Login successful!");

    navigate("/");
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        <div className="auth-image">
          <div>
            <p>WATCHME</p>

            <h2>
              Time is
              <br />
              <em>personal.</em>
            </h2>
          </div>
        </div>

        <div className="auth-form-container">
          <div className="auth-form">

            <p className="section-label">
              WELCOME BACK
            </p>

            <h1>Sign In</h1>

            <p className="auth-subtitle">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleSubmit}>

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

              <div className="forgot-password">
                <a href="#forgot-password">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-dark auth-button"
              >
                Sign In
              </button>

            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register">
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Login;