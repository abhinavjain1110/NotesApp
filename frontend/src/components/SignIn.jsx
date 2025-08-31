import React, { useState } from "react";
import api from "../Api";

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
      <div className="field">
        <label className="floating">Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      {/* {sent && (
        <div className="field">
  <label className="floating">OTP</label>
  <input
    className="input otp"
    value={otp}
    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
    placeholder="OTP"
  />
</div>
      )} */}
      <div className={`field with-icon ${sent ? "otp-sent" : ""}`}>
        <label className="floating">OTP</label>
        <input
          className={`input ${sent ? "otp" : ""}`}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="OTP"
          type={showOtp ? "text" : "password"}
          disabled={!sent}
        />
        <button
          type="button"
          className="icon-btn eye"
          onClick={() => setShowOtp((s) => !s)}
          aria-label={showOtp ? "Hide OTP" : "Show OTP"}
          disabled={!sent}
        />

      <button className="btn-primary" type="submit" disabled={loading} style={{marginTop:4}}>
        {sent ? (loading ? "Verifying…" : "Sign in") : (loading ? "Sending…" : "Send OTP")}
      </button>
        </div>
      {err && <p className="error">{err}</p>}
    </form>
  );
}
