/* import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';


createRoot(document.getElementById('root')).render(<App />); */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Import Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
