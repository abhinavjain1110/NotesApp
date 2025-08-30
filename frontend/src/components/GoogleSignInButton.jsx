// import React from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import api from "../Api";
// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// export default function GoogleSignInButton({ onAuthed }) {
//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         // Exchange Google OAuth access_token for user info on backend
//         const idToken = response.credential;
//         const { data } = await api.post("/auth/google", {
//           /* idToken: tokenResponse.access_token, */ // You may need to handle differently if backend expects ID token
//         });
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         onAuthed(data.user);
//       } catch (err) {
//         alert(err.response?.data?.message || "Google sign-in failed");
//       }
//     },
//     onError: () => alert("Google sign-in failed"),
//     flow: "implicit", // or 'auth-code' if you configured backend for OAuth code exchange
//   });

//   return (
//     <button className="google-btn" onClick={() => login()}>
//       <img
//         src="https://developers.google.com/identity/images/g-logo.png"
//         alt="Google Logo"
//         className="google-logo"
//       />
//       <span>Continue with Google</span>
//       <style>{`
//         .google-btn {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 10px;
//           width: 100%;
//           padding: 12px;
//           border: 1.5px solid #d9d9d9;
//           border-radius: 8px;
//           background: #fff;
//           font-size: 16px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }
//         .google-btn:hover {
//           background: #f8f8f8;
//         }
//         .google-logo {
//           width: 20px;
//           height: 20px;
//         }
//       `}</style>
//     </button>
//   );
// }
import React, { useEffect, useRef } from "react";
import api from "../Api";

export default function GoogleSignInButton({ onAuthed }) {
  const divRef = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        try {
          // ✅ ID token returned here
          const { data } = await api.post("/auth/google", {
            idToken: response.credential,
          });

          // Save session
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          onAuthed(data.user);
        } catch (err) {
          alert(err.response?.data?.message || "Google sign-in failed");
        }
      },
    });

    // Render Google Button
    window.google.accounts.id.renderButton(divRef.current, {
      theme: "outline",
      size: "large",
      width: "400",
    });
  }, [onAuthed]);

  return <div ref={divRef} />;
}
