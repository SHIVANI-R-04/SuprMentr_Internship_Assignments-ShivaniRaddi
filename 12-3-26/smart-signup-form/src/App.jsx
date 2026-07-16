import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --surface2: #1a1a26;
    --border: rgba(255,255,255,0.07);
    --border-focus: rgba(139,92,246,0.6);
    --accent: #8b5cf6;
    --accent2: #06b6d4;
    --accent3: #f472b6;
    --text: #f0f0ff;
    --muted: #6b7280;
    --error: #f87171;
    --success: #34d399;
    --warn: #fbbf24;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .scene {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
  }

  /* Animated background */
  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    pointer-events: none;
    animation: drift 12s ease-in-out infinite alternate;
  }
  .bg-orb-1 { width: 500px; height: 500px; background: var(--accent); top: -150px; left: -100px; animation-delay: 0s; }
  .bg-orb-2 { width: 400px; height: 400px; background: var(--accent2); bottom: -100px; right: 20%; animation-delay: -4s; }
  .bg-orb-3 { width: 350px; height: 350px; background: var(--accent3); top: 40%; right: -80px; animation-delay: -8s; }

  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 20px) scale(1.08); }
  }

  /* Grid overlay */
  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Left panel */
  .left-panel {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 60px;
    position: relative;
    border-right: 1px solid var(--border);
    animation: fadeSlideRight 0.8s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes fadeSlideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .brand-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 48px;
  }
  .brand-dot { width: 6px; height: 6px; background: var(--accent2); border-radius: 50%; }

  .panel-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
  }
  .panel-heading span {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--accent3) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .panel-sub {
    font-size: 16px; color: var(--muted); line-height: 1.7;
    max-width: 380px; margin-bottom: 56px;
  }

  .features-list { display: flex; flex-direction: column; gap: 16px; }
  .feature-item {
    display: flex; align-items: center; gap: 14px;
    font-size: 14px; color: rgba(240,240,255,0.7);
    padding: 14px 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  .feature-item:hover { background: rgba(139,92,246,0.08); border-color: rgba(139,92,246,0.3); }
  .feature-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  .fi-purple { background: rgba(139,92,246,0.2); }
  .fi-cyan   { background: rgba(6,182,212,0.2); }
  .fi-pink   { background: rgba(244,114,182,0.2); }

  /* Right panel / form */
  .right-panel {
    display: flex; align-items: center; justify-content: center;
    padding: 60px 60px;
    animation: fadeSlideLeft 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both;
  }

  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .form-card {
    width: 100%; max-width: 460px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.5);
  }
  .form-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
  }

  .form-title {
    font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700;
    margin-bottom: 6px;
  }
  .form-subtitle {
    font-size: 14px; color: var(--muted); margin-bottom: 36px;
  }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .field-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
  .field-label {
    font-size: 12px; font-weight: 500; letter-spacing: 0.05em;
    text-transform: uppercase; color: rgba(240,240,255,0.5);
  }

  .field-wrap {
    position: relative; display: flex; align-items: center;
  }
  .field-icon {
    position: absolute; left: 14px; font-size: 15px;
    color: var(--muted); transition: color 0.2s;
    pointer-events: none; z-index: 1;
  }
  .field-wrap:focus-within .field-icon { color: var(--accent); }

  .field-input {
    width: 100%; padding: 13px 14px 13px 40px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 12px; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    outline: none; transition: all 0.25s ease;
  }
  .field-input::placeholder { color: var(--muted); }
  .field-input:focus {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(139,92,246,0.12);
    background: rgba(26,26,38,0.95);
  }
  .field-input.has-error  { border-color: rgba(248,113,113,0.5); }
  .field-input.has-success { border-color: rgba(52,211,153,0.4); }

  .toggle-pw {
    position: absolute; right: 14px;
    background: none; border: none; cursor: pointer;
    color: var(--muted); font-size: 15px; padding: 4px;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: var(--text); }

  .field-msg {
    font-size: 12px; min-height: 16px;
    display: flex; align-items: center; gap: 5px;
  }
  .field-msg.error   { color: var(--error); }
  .field-msg.success { color: var(--success); }

  /* Password strength */
  .strength-wrap { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
  .strength-bars { display: flex; gap: 5px; }
  .strength-bar {
    flex: 1; height: 3px; border-radius: 99px;
    background: var(--surface2); transition: background 0.4s ease;
  }
  .strength-bar.active-weak   { background: var(--error); }
  .strength-bar.active-fair   { background: var(--warn); }
  .strength-bar.active-good   { background: var(--accent2); }
  .strength-bar.active-strong { background: var(--success); }

  .strength-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.05em;
  }
  .strength-label.weak   { color: var(--error); }
  .strength-label.fair   { color: var(--warn); }
  .strength-label.good   { color: var(--accent2); }
  .strength-label.strong { color: var(--success); }

  .pw-hints { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .pw-hint {
    font-size: 11px; padding: 3px 9px; border-radius: 99px;
    border: 1px solid; transition: all 0.2s;
    display: flex; align-items: center; gap: 4px;
  }
  .pw-hint.met   { border-color: rgba(52,211,153,0.4); color: var(--success); background: rgba(52,211,153,0.08); }
  .pw-hint.unmet { border-color: rgba(255,255,255,0.08); color: var(--muted); background: transparent; }

  /* Terms */
  .terms-row {
    display: flex; align-items: flex-start; gap: 10px;
    margin-bottom: 28px;
  }
  .custom-check {
    width: 18px; height: 18px; flex-shrink: 0;
    border: 1.5px solid var(--border);
    border-radius: 5px; margin-top: 1px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; background: var(--surface2);
  }
  .custom-check.checked { background: var(--accent); border-color: var(--accent); }
  .custom-check input { display: none; }
  .terms-text { font-size: 13px; color: var(--muted); line-height: 1.5; }
  .terms-text a { color: var(--accent2); text-decoration: none; }
  .terms-text a:hover { text-decoration: underline; }

  /* Submit */
  .submit-btn {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 50%, var(--accent2) 100%);
    background-size: 200% 200%; background-position: 0% 50%;
    border: none; border-radius: 12px;
    color: #fff; font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; letter-spacing: 0.04em;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(139,92,246,0.4);
  }
  .submit-btn:hover:not(:disabled) {
    background-position: 100% 50%;
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(139,92,246,0.5);
  }
  .submit-btn:active:not(:disabled) { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .submit-btn .btn-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
    transform: translateX(-100%); transition: transform 0.5s ease;
  }
  .submit-btn:hover .btn-shimmer { transform: translateX(100%); }

  .sign-in-row {
    text-align: center; font-size: 13px; color: var(--muted); margin-top: 20px;
  }
  .sign-in-row a { color: var(--accent); text-decoration: none; font-weight: 500; }
  .sign-in-row a:hover { text-decoration: underline; }

  /* Success overlay */
  .success-overlay {
    position: absolute; inset: 0;
    background: var(--surface);
    border-radius: 24px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 16px;
    animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
    z-index: 10;
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
  .success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, var(--success), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 32px;
    box-shadow: 0 0 40px rgba(52,211,153,0.4);
    animation: pulse-success 2s ease infinite;
  }
  @keyframes pulse-success {
    0%,100% { box-shadow: 0 0 40px rgba(52,211,153,0.4); }
    50%      { box-shadow: 0 0 60px rgba(52,211,153,0.7); }
  }
  .success-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; }
  .success-sub   { font-size: 14px; color: var(--muted); text-align: center; max-width: 260px; line-height: 1.6; }

  /* Responsive */
  @media (max-width: 900px) {
    .scene { grid-template-columns: 1fr; }
    .left-panel { display: none; }
    .right-panel { padding: 40px 24px; }
    .form-card { padding: 36px 28px; }
  }
  @media (max-width: 480px) {
    .form-row { grid-template-columns: 1fr; }
  }
`;

// ── Validation helpers ────────────────────────────────────────────────────────

const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
  return "";
};

const validateName = (name, label) => {
  if (!name.trim()) return `${label} is required`;
  if (name.trim().length < 2) return `${label} must be at least 2 characters`;
  return "";
};

const getPasswordStrength = (pw) => {
  const checks = {
    length:  pw.length >= 8,
    upper:   /[A-Z]/.test(pw),
    lower:   /[a-z]/.test(pw),
    number:  /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  };
  const score = Object.values(checks).filter(Boolean).length;
  let level = "", label = "";
  if (!pw)          { level = "";       label = ""; }
  else if (score <= 2) { level = "weak";   label = "Weak"; }
  else if (score === 3) { level = "fair";  label = "Fair"; }
  else if (score === 4) { level = "good";  label = "Good"; }
  else                  { level = "strong"; label = "Strong 🔥"; }
  return { score, level, label, checks };
};

// ── Main App component ────────────────────────────────────────────────────────

export default function App() {
  const [fields, setFields] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "",
  });
  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});
  const [showPw,    setShowPw]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed,    setAgreed]    = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const pwStrength = getPasswordStrength(fields.password);

  const validate = (name, value) => {
    switch (name) {
      case "firstName": return validateName(value, "First name");
      case "lastName":  return validateName(value, "Last name");
      case "email":     return validateEmail(value);
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "At least 8 characters needed";
        if (pwStrength.score < 3) return "Please choose a stronger password";
        return "";
      case "confirm":
        if (!value) return "Please confirm your password";
        if (value !== fields.password) return "Passwords do not match";
        return "";
      default: return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(er => ({ ...er, [name]: validate(name, value) }));
    }
    if (name === "password" && touched.confirm) {
      setErrors(er => ({ ...er, confirm: fields.confirm !== value ? "Passwords do not match" : "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(t  => ({ ...t,  [name]: true }));
    setErrors(er  => ({ ...er, [name]: validate(name, value) }));
  };

  const isFormValid = () =>
    Object.keys(fields).every(k => !validate(k, fields[k])) && agreed;

  const handleSubmit = async () => {
    const allTouched = Object.keys(fields).reduce((a, k) => ({ ...a, [k]: true }), {});
    const allErrors  = Object.keys(fields).reduce((a, k) => ({ ...a, [k]: validate(k, fields[k]) }), {});
    setTouched(allTouched);
    setErrors(allErrors);
    if (Object.values(allErrors).some(e => e) || !agreed) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const fieldStatus = (name) => {
    if (!touched[name]) return "";
    return errors[name] ? "has-error" : "has-success";
  };

  const hints = [
    { key: "length",  label: "8+ chars"  },
    { key: "upper",   label: "Uppercase" },
    { key: "lower",   label: "Lowercase" },
    { key: "number",  label: "Number"    },
    { key: "special", label: "Symbol"    },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="scene">

        {/* Ambient orbs */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="grid-overlay" />

        {/* ── Left panel ── */}
        <div className="left-panel">
          <div className="brand-tag"><span className="brand-dot" />NovaSphere</div>
          <h1 className="panel-heading">
            Build your<br /><span>digital future</span><br />today.
          </h1>
          <p className="panel-sub">
            Join thousands of creators, developers, and innovators who use
            NovaSphere to bring their ideas to life.
          </p>
          <div className="features-list">
            {[
              { icon: "⚡", cls: "fi-purple", text: "Lightning-fast infrastructure, globally distributed" },
              { icon: "🔒", cls: "fi-cyan",   text: "Enterprise-grade security with end-to-end encryption" },
              { icon: "🎨", cls: "fi-pink",   text: "Stunning design tools built for modern creators" },
            ].map((f, i) => (
              <div className="feature-item" key={i}>
                <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel / form ── */}
        <div className="right-panel">
          <div className="form-card">

            {/* Success overlay */}
            {submitted && (
              <div className="success-overlay">
                <div className="success-icon">✓</div>
                <div className="success-title">You're all set!</div>
                <div className="success-sub">
                  Welcome to NovaSphere. Check your inbox for a confirmation link.
                </div>
              </div>
            )}

            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">Fill in your details to get started for free</p>

            {/* First + Last name */}
            <div className="form-row">
              {[
                { name: "firstName", label: "First Name", placeholder: "Jane" },
                { name: "lastName",  label: "Last Name",  placeholder: "Doe"  },
              ].map(({ name, label, placeholder }) => (
                <div className="field-group" key={name}>
                  <label className="field-label">{label}</label>
                  <div className="field-wrap">
                    <span className="field-icon">👤</span>
                    <input
                      className={`field-input ${fieldStatus(name)}`}
                      name={name} value={fields[name]}
                      placeholder={placeholder}
                      onChange={handleChange} onBlur={handleBlur}
                    />
                  </div>
                  <div className={`field-msg ${touched[name] ? (errors[name] ? "error" : "success") : ""}`}>
                    {touched[name] && (errors[name] ? `⚠ ${errors[name]}` : "✓ Looks good")}
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon">✉</span>
                <input
                  className={`field-input ${fieldStatus("email")}`}
                  name="email" type="email" value={fields.email}
                  placeholder="jane@example.com"
                  onChange={handleChange} onBlur={handleBlur}
                />
              </div>
              <div className={`field-msg ${touched.email ? (errors.email ? "error" : "success") : ""}`}>
                {touched.email && (errors.email ? `⚠ ${errors.email}` : "✓ Valid email")}
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">🔑</span>
                <input
                  className={`field-input ${fieldStatus("password")}`}
                  name="password" type={showPw ? "text" : "password"}
                  value={fields.password} placeholder="Create a strong password"
                  onChange={handleChange} onBlur={handleBlur}
                />
                <button className="toggle-pw" type="button" onClick={() => setShowPw(s => !s)}>
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>

              {/* Strength meter */}
              {fields.password && (
                <div className="strength-wrap">
                  <div className="strength-bars">
                    {[1, 2, 3, 4, 5].map(n => (
                      <div
                        key={n}
                        className={`strength-bar ${pwStrength.score >= n ? `active-${pwStrength.level}` : ""}`}
                      />
                    ))}
                  </div>
                  <span className={`strength-label ${pwStrength.level}`}>{pwStrength.label}</span>
                  <div className="pw-hints">
                    {hints.map(h => (
                      <span key={h.key} className={`pw-hint ${pwStrength.checks[h.key] ? "met" : "unmet"}`}>
                        {pwStrength.checks[h.key] ? "✓" : "○"} {h.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={`field-msg ${touched.password ? (errors.password ? "error" : "success") : ""}`}>
                {touched.password && !fields.password && errors.password ? `⚠ ${errors.password}` : ""}
              </div>
            </div>

            {/* Confirm password */}
            <div className="field-group">
              <label className="field-label">Confirm Password</label>
              <div className="field-wrap">
                <span className="field-icon">🔒</span>
                <input
                  className={`field-input ${fieldStatus("confirm")}`}
                  name="confirm" type={showConfirm ? "text" : "password"}
                  value={fields.confirm} placeholder="Repeat your password"
                  onChange={handleChange} onBlur={handleBlur}
                />
                <button className="toggle-pw" type="button" onClick={() => setShowConfirm(s => !s)}>
                  {showConfirm ? "🙈" : "👁"}
                </button>
              </div>
              <div className={`field-msg ${touched.confirm ? (errors.confirm ? "error" : "success") : ""}`}>
                {touched.confirm && (errors.confirm ? `⚠ ${errors.confirm}` : "✓ Passwords match")}
              </div>
            </div>

            {/* Terms */}
            <div className="terms-row">
              <div className={`custom-check ${agreed ? "checked" : ""}`} onClick={() => setAgreed(a => !a)}>
                <input type="checkbox" checked={agreed} readOnly />
                {agreed && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <span className="terms-text">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading || !isFormValid()}
            >
              <span className="btn-shimmer" />
              {loading ? "Creating account…" : "Create My Account →"}
            </button>

            <div className="sign-in-row">
              Already have an account? <a href="#">Sign in</a>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}