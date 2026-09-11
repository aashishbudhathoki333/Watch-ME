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

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const enteredEmail = form.email.trim().toLowerCase();
    const enteredPassword = form.password.trim();

    console.log("LOGIN ATTEMPT:", {
      email: enteredEmail,
      passwordEntered: enteredPassword.length > 0,
    });

    /* =========================================
       LOAD USERS
    ========================================= */

    let users = [];

    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);

        if (Array.isArray(parsedUsers)) {
          users = parsedUsers;
        }
      } catch (error) {
        console.error("Error reading users:", error);
      }
    }

    /* =========================================
       ALSO CHECK watchmeRegisteredUser
    ========================================= */

    const savedRegisteredUser = localStorage.getItem(
      "watchmeRegisteredUser"
    );

    if (savedRegisteredUser) {
      try {
        const registeredUser = JSON.parse(savedRegisteredUser);

        if (registeredUser) {
          const exists = users.some(
            (user) =>
              String(user.email || "").trim().toLowerCase() ===
              String(registeredUser.email || "").trim().toLowerCase()
          );

          if (!exists) {
            users.push(registeredUser);
          }
        }
      } catch (error) {
        console.error(
          "Error reading registered user:",
          error
        );
      }
    }

    console.log("TOTAL USERS FOUND:", users.length);

    /* =========================================
       FIND EMAIL
    ========================================= */

    const foundUser = users.find((user) => {
      const userEmail = String(
        user.email || user.emailAddress || ""
      )
        .trim()
        .toLowerCase();

      return userEmail === enteredEmail;
    });

    console.log(
      "USER FOUND:",
      foundUser
        ? {
            id: foundUser.id,
            email: foundUser.email,
            hasPassword: Boolean(foundUser.password),
            role: foundUser.role,
          }
        : null
    );

    if (!foundUser) {
      setError("No account found with this email.");
      return;
    }

    /* =========================================
       GET SAVED PASSWORD
    ========================================= */

    const savedPassword =
      foundUser.password ??
      foundUser.pass ??
      foundUser.userPassword ??
      "";

    /* =========================================
       PASSWORD CHECK
    ========================================= */

    if (
      String(enteredPassword) !==
      String(savedPassword)
    ) {
      console.log("PASSWORD DOES NOT MATCH");

      setError("Invalid email or password.");
      return;
    }

    console.log("LOGIN SUCCESS");

    /* =========================================
       USER NAME
    ========================================= */

    const userName =
      foundUser.name ||
      foundUser.fullName ||
      foundUser.firstName ||
      foundUser.username ||
      "WatchMe User";

    /* =========================================
       USER ROLE
    ========================================= */

    const userRole =
      foundUser.role ||
      (enteredEmail === "admin@watchme.com"
        ? "admin"
        : "user");

    /* =========================================
       CREATE LOGGED-IN USER
    ========================================= */

    const loggedInUser = {
      ...foundUser,
      name: userName,
      email:
        foundUser.email ||
        foundUser.emailAddress,
      role: userRole,
    };

    /* =========================================
       SAVE CURRENT USER
    ========================================= */

    localStorage.setItem(
      "watchmeUser",
      JSON.stringify(loggedInUser)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(loggedInUser)
    );

    /* =========================================
       AUTH CONTEXT
    ========================================= */

    login(loggedInUser);

    /* =========================================
       REDIRECT
    ========================================= */

    if (userRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
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
              <div
                className="auth-error"
                style={{
                  color: "#c62828",
                  backgroundColor: "#ffebee",
                  border: "1px solid #ef9a9a",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
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
                  autoComplete="current-password"
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
                  onClick={(e) => e.preventDefault()}
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
