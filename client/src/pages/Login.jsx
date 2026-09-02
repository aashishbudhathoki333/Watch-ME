import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
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

    const savedUser = localStorage.getItem("watchmeRegisteredUser");

    if (!savedUser) {
      alert("No registered account found. Please create an account first.");
      return;
    }

    const registeredUser = JSON.parse(savedUser);

    if (
      form.email !== registeredUser.email ||
      form.password !== registeredUser.password
    ) {
      alert("Invalid email or password.");
      return;
    }

    // Store NAME + EMAIL in AuthContext
    login({
      name: registeredUser.name,
      email: registeredUser.email,
    });

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
            <p className="section-label">WELCOME BACK</p>

            <h1>Sign In</h1>

            <p className="auth-subtitle">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleSubmit}>
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

              <div className="forgot-password">
                <a href="#">Forgot password?</a>
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
              <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;