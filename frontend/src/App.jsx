// import React, { useState } from "react";
// import AuthEmail from "./components/AuthEmail.jsx";
// import SignIn from "./components/SignIn.jsx";
// import Notes from "./components/Notes.jsx";
// import Header from "./components/Header.jsx";
// import "./styles.css";

// export default function App() {
//   const [user, setUser] = useState(() => {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   });
//   const [view, setView] = useState("signup"); // signup | signin | dashboard

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setView("signin");
//   }

//   if (!user) {
//     return (
//       <div className="auth-layout">
//         <div className="left-column">
//           <div className="brand">
//             <div className="brand-icon" />
//             <div className="brand-text">HD</div>
//           </div>

//           <div className="auth-content">
//             {view === "signup" && (
//               <>
//                 <h1 className="title">Sign up</h1>
//                 <p className="subtitle" style={{padding:8}}>
//                   Sign up to enjoy the feature of HD
//                 </p>
//                 <AuthEmail onAuthed={(u) => { setUser(u); setView("dashboard"); }} />
//                 <p className="muted-center">
//                   Already have an account?{" "}
//                   <a href="#" className="link" onClick={() => setView("signin")}>
//                     Sign in
//                   </a>
//                 </p>
//               </>
//             )}

//             {view === "signin" && (
//               <>
//                 <h1 className="title">Sign in</h1>
//                 <p className="subtitle"  style={{padding:8}}>Welcome back! Please sign in</p>
//                 <SignIn onAuthed={(u) => { setUser(u); setView("dashboard"); }} />
//                 <p className="muted-center">
//                   Don’t have an account?{" "}
//                   <a href="#" className="link" onClick={() => setView("signup")}>
//                     Sign up
//                   </a>
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Right hero image - hidden on mobile */}
//         <div className="right-panel">
//           <div className="right-panel-image" />
//         </div>
//       </div>
//     );
//   }

//   // Dashboard view
//   return (
//     <div className="dashboard-layout">
//       <div className="dash-header">
//         <div className="brand small">
//           <div className="brand-icon" />
//           <div className="brand-text">HD</div>
//         </div>
//       </div>
//       <button className="logout" onClick={logout}>
//           Logout
//         </button>
//       <style>
//     {`
//       .logout {
//         position: absolute;
//         top: 16px;
//         right: 20px;
//         background: linear-gradient(135deg, #ff4d4f, #d9363e);
//         border: none;
//         padding: 8px 16px;
//         border-radius: 8px;
//         color: #fff;
//         font-size: 14px;
//         font-weight: 500;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         box-shadow: 0 2px 6px rgba(217,54,62,0.3);
//       }

//       .logout:hover {
//         background: linear-gradient(135deg, #e33b3d, #b82c32);
//         transform: translateY(-1px);
//         box-shadow: 0 4px 8px rgba(217,54,62,0.4);
//       }
//     `}
//   </style>
//       <Notes />
//     </div>
    
//   );
// }
import React, { useState } from "react";
import AuthEmail from "./components/AuthEmail.jsx";
import SignIn from "./components/SignIn.jsx";
import Notes from "./components/Notes.jsx";
import Header from "./components/Header.jsx";
import GoogleSignInButton from "./components/GoogleSignInButton.jsx"; // ✅ added
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [view, setView] = useState("signup"); // signup | signin | dashboard

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
                    setUser(u);
                    setView("dashboard");
                  }}
                />
                <p style={{ textAlign: "center", margin: "12px 0" }}>Or</p>
                <GoogleSignInButton
                  onAuthed={(u) => {
                    setUser(u);
                    setView("dashboard");
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
                    setUser(u);
                    setView("dashboard");
                  }}
                />
                <p style={{ textAlign: "center", margin: "12px 0" }}>Or</p>
                <GoogleSignInButton
                  onAuthed={(u) => {
                    setUser(u);
                    setView("dashboard");
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

        {/* Right Section - Hidden on Mobile */}
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
      <style>
        {`
        .logout {
          position: absolute;
          top: 16px;
          right: 20px;
          background: linear-gradient(135deg, #ff4d4f, #d9363e);
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(217,54,62,0.3);
        }

        .logout:hover {
          background: linear-gradient(135deg, #e33b3d, #b82c32);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(217,54,62,0.4);
        }
      `}
      </style>
      <Notes />
    </div>
  );
}
