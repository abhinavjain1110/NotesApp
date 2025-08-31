import React, { useState } from "react";
import api from "../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignIn({ onAuthed }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSendOtp(e) {
    e.preventDefault();
    setErr("");
    if (!email) return setErr("Enter email");
    try {
      setLoading(true);
      await api.post("/auth/request-otp", { email });
      setSent(true);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setErr("");
    if (otp.length !== 6) return setErr("Enter 6-digit OTP");
    try {
      setLoading(true);
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuthed(data.user);
    } catch (e) {
      setErr(e?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={sent ? handleVerify : handleSendOtp}>
      {/* Email Field */}
      <div className="field">
        <label className="floating">Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      {/* OTP Field (only active after sending) */}
      <div className={`field with-icon ${sent ? "otp-sent" : ""}`}>
        <label className="floating">OTP</label>
        <input
          className={`input ${sent ? "otp" : ""}`}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="6-digit OTP"
          type={showOtp ? "text" : "password"}
          disabled={!sent}
        />
        {/* <button
          type="button"
          className="icon-btn eye"
          onClick={() => setShowOtp((s) => !s)}
          aria-label={showOtp ? "Hide OTP" : "Show OTP"}
          disabled={!sent}
        >
          <FontAwesomeIcon icon={showOtp ? faEyeSlash : faEye} />
        </button> */}
      </div>
      <style>
        {`        .field.with-icon {
          position: relative;
        }

        .field.with-icon .input {
          padding-right: 40px; /* space for eye icon */
        }

        .icon-btn.eye {
          position: absolute;
          right: 10px;
          top: 55%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #666;
        }

        .icon-btn.eye:hover {
          color: #000;
        }`}

      </style>
      {/* Submit */}
      <button
        className="btn-primary"
        type="submit"
        disabled={loading}
        style={{ marginTop: 8 }}
      >
        {sent
          ? loading
            ? "Verifying…"
            : "Sign in"
          : loading
          ? "Sending…"
          : "Send OTP"}
      </button>

      {err && <p className="error">{err}</p>}
    </form>
  );
}
