
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Get registered user
    const savedUser = JSON.parse(
      localStorage.getItem("watchmeUser")
    );

    // Check account
    if (!savedUser) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    // Check email
    if (
      savedUser.email.toLowerCase() !==
      form.email.toLowerCase()
    ) {
      setError("Invalid email or password.");
      return;
    }

    // Check password
    if (savedUser.password !== form.password) {
      setError("Invalid email or password.");
      return;
    }

    // Save login session
    localStorage.setItem(
      "watchmeLoggedIn",
      "true"
    );

    localStorage.setItem(
      "watchmeCurrentUser",
      JSON.stringify({
        name: savedUser.name,
        email: savedUser.email,
      })
    );

    alert(`Welcome back, ${savedUser.name}!`);

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

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Password recovery will be connected to the backend later."
                    );
                  }}
                >
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
