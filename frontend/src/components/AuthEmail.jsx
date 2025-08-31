/* import React, { useState } from "react";
import api from "../Api";

export default function AuthEmail({ onAuthed }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestOtp(e) {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    try {
      setLoading(true);
      await api.post("/auth/request-otp", { email, name });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setError("");
    if (!otp || otp.length !== 6) return setError("Enter the 6-digit OTP");
    try {
      setLoading(true);
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuthed(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      {step === "email" ? (
        <form onSubmit={requestOtp}>
          <h3>Create an account or Login</h3>
          <p className="small">Sign up with email + OTP or use Google.</p>
          <div className="row">
            <input
              className="input"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Sending…" : "Send OTP"}
          </button>
          {error && (
            <p className="small" style={{ color: "#ffb4b4" }}>
              {error}
            </p>
          )}
        </form>
      ) : (
        <form onSubmit={verifyOtp}>
          <h3>Enter OTP</h3>
          <input
            className="input"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
          <div className="row">
            <button
              className="btn"
              type="button"
              onClick={() => setStep("email")}
            >
              Back
            </button>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Verifying…" : "Verify & Continue"}
            </button>
          </div>
          {error && (
            <p className="small" style={{ color: "#ffb4b4" }}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
 */
import React, { useState } from "react";
import api from "../Api";

export default function AuthEmail({ onAuthed }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(""); // display string
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSendOtp(e) {
    e.preventDefault();
    setErr("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Enter a valid email");
      return;
    }
    try {
      setLoading(true);
      await api.post("/auth/request-otp", { email, name });
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
    if (otp.length !== 6) {
      setErr("Enter the 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuthed(data.user);
    } catch (e) {
      setErr(e?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={sent ? handleVerify : handleSendOtp}>
      {/* Name */}
      <div className="field">
        <label className="floating">Your Name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jonas Khanwald"
        />
      </div>

      {/* DOB — simple text to match mock; replace with <input type="date"> if you want */}
      <div className="field with-icon">
        <label className="floating">Date of Birth</label>
        <span className="icon calendar" aria-hidden />
        <input
          className="input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="11 December 1997"
        />
      </div>

      {/* Email */}
      <div className="field">
        <label className="floating">Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jonas_kahnwald@gmail.com"
        />
      </div>

      {/* OTP */}
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

      <button className="btn-primary" type="submit" disabled={loading} style={{marginTop:4}}>
        {sent ? (loading ? "Verifying…" : "Sign in") : (loading ? "Sending…" : "Send OTP")}
      </button>

      {err && <p className="error">{err}</p>}
      </div>

      <button className="btn-primary" type="submit" disabled={loading} style={{marginTop:4}}>
        {sent ? (loading ? "Verifying…" : "Sign up") : (loading ? "Sending…" : "Sign up")}
      </button>

      {err && <p className="error">{err}</p>}
    </form>
  );
}
