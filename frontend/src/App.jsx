import React, { useState, useEffect } from "react";
import AuthEmail from "./components/AuthEmail.jsx";
import SignIn from "./components/SignIn.jsx";
import Notes from "./components/Notes.jsx";
import GoogleSignInButton from "./components/GoogleSignInButton.jsx";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [view, setView] = useState(() => {
    // restore view from localStorage if present
    return localStorage.getItem("view") || "signup";
  });

  // keep localStorage in sync when view changes
  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  // keep view in sync with user login
  useEffect(() => {
    if (user) {
      setView("dashboard");
    }
  }, [user]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setView("signin");
  }

  if (!user) {
    return (
      <div className="auth-layout">
        {/* Left Section */}
        <div className="left-column">
          <div className="brand">
            <div className="brand-icon" />
            <div className="brand-text">HD</div>
          </div>

          <div className="auth-content">
            {view === "signup" && (
              <>
                <h1 className="title">Sign up</h1>
                <p className="subtitle" style={{ padding: 8 }}>
                  Sign up to enjoy the feature of HD
                </p>
                <AuthEmail
                  onAuthed={(u) => {
                    localStorage.setItem("user", JSON.stringify(u));
                    setUser(u);
                  }}
                />
                <p style={{ textAlign: "center", margin: "12px 0" }}>Or</p>
                <GoogleSignInButton
                  onAuthed={(u) => {
                    localStorage.setItem("user", JSON.stringify(u));
                    setUser(u);
                  }}
                />
                <p className="muted-center">
                  Already have an account?{" "}
                  <a href="#" className="link" onClick={() => setView("signin")}>
                    Sign in
                  </a>
                </p>
              </>
            )}

            {view === "signin" && (
              <>
                <h1 className="title">Sign in</h1>
                <p className="subtitle" style={{ padding: 8 }}>
                  Welcome back! Please sign in
                </p>
                <SignIn
                  onAuthed={(u) => {
                    localStorage.setItem("user", JSON.stringify(u));
                    setUser(u);
                  }}
                />
                <p style={{ textAlign: "center", margin: "12px 0" }}>Or</p>
                <GoogleSignInButton
                  onAuthed={(u) => {
                    localStorage.setItem("user", JSON.stringify(u));
                    setUser(u);
                  }}
                />
                <p className="muted-center">
                  Don’t have an account?{" "}
                  <a href="#" className="link" onClick={() => setView("signup")}>
                    Sign up
                  </a>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="right-panel">
          <div className="right-panel-image" />
        </div>
      </div>
    );
  }

  // ✅ Dashboard view
  return (
    <div className="dashboard-layout">
      <div className="dash-header">
        <div className="brand small">
          <div className="brand-icon" />
          <div className="brand-text">HD</div>
        </div>
      </div>
      <button className="logout" onClick={logout}>
        Logout
      </button>
      <Notes />
    </div>
  );
}
