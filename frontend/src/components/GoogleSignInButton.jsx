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
