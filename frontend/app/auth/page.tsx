"use client";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"farmer" | "agronomist">("farmer");

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        input { width: 100%; background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 0.75rem 1rem; color: #e8f0e1; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        input:focus { border-color: #7ec850; }
        input::placeholder { color: rgba(232,240,225,0.3); }
        label { font-size: 0.8rem; color: rgba(232,240,225,0.5); margin-bottom: 0.4rem; display: block; }
        .btn-primary { width: 100%; background: #7ec850; color: #0e1a0f; border: none; padding: 0.85rem; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-top: 0.5rem; }
        .btn-primary:hover { background: #9dd96a; }
        .role-btn { flex: 1; padding: 0.65rem; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; border: 0.5px solid rgba(255,255,255,0.12); background: transparent; color: rgba(232,240,225,0.5); }
        .role-btn.active { background: rgba(126,200,80,0.15); border-color: #7ec850; color: #7ec850; font-weight: 500; }
        .toggle-tab { flex: 1; padding: 0.6rem; background: transparent; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; cursor: pointer; color: rgba(232,240,225,0.4); border-bottom: 2px solid transparent; transition: all 0.2s; padding-bottom: 0.75rem; }
        .toggle-tab.active { color: #7ec850; border-bottom-color: #7ec850; }
        a { color: #7ec850; text-decoration: none; font-size: 0.85rem; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* Nav */}
      <nav style={{ padding: "1.5rem 4rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <a href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", letterSpacing: "-0.02em", color: "#e8f0e1", textDecoration: "none" }}>
          Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
        </a>
      </nav>

      {/* Auth Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Toggle tabs */}
          <div style={{ display: "flex", borderBottom: "0.5px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
            <button className={`toggle-tab ${mode === "signin" ? "active" : ""}`} onClick={() => setMode("signin")}>Sign in</button>
            <button className={`toggle-tab ${mode === "signup" ? "active" : ""}`} onClick={() => setMode("signup")}>Create account</button>
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
            {mode === "signin" ? "Welcome back" : "Get started"}
          </h1>
          <p style={{ fontSize: "0.875rem", color: "rgba(232,240,225,0.45)", marginBottom: "2rem", fontWeight: 300 }}>
            {mode === "signin"
              ? "Sign in to your ShambaAssist account."
              : "Create your account to get started."}
          </p>

          {/* Role selector — signup only */}
          {mode === "signup" && (
            <div style={{ marginBottom: "1.5rem" }}>
              <label>I am a</label>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.4rem" }}>
                <button className={`role-btn ${role === "farmer" ? "active" : ""}`} onClick={() => setRole("farmer")}>
                  🌱 Farmer
                </button>
                <button className={`role-btn ${role === "agronomist" ? "active" : ""}`} onClick={() => setRole("agronomist")}>
                  🔬 Agronomist / Admin
                </button>
              </div>
            </div>
          )}

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

            {mode === "signup" && (
              <div>
                <label>Full name</label>
                <input type="text" placeholder="e.g. Jane Wanjiku" />
              </div>
            )}

            {mode === "signup" && role === "farmer" && (
              <div>
                <label>Location / County</label>
                <input type="text" placeholder="e.g. Kisii, Nyanza" />
              </div>
            )}

            <div>
              <label>Email address</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div>
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            {mode === "signup" && (
              <div>
                <label>Confirm password</label>
                <input type="password" placeholder="••••••••" />
              </div>
            )}

            {mode === "signin" && (
              <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button className="btn-primary">
              {mode === "signin" ? "Sign in →" : "Create account →"}
            </button>
          </div>

          {/* Switch mode */}
          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.85rem", color: "rgba(232,240,225,0.4)" }}>
            {mode === "signin" ? (
              <>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode("signup"); }}>Sign up</a></>
            ) : (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode("signin"); }}>Sign in</a></>
            )}
          </p>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "1.5rem 4rem", borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "rgba(232,240,225,0.25)" }}>
        <span>© 2025 ShambaAssist</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "rgba(232,240,225,0.25)" }}>Privacy</a>
          <a href="#" style={{ color: "rgba(232,240,225,0.25)" }}>Terms</a>
        </div>
      </footer>
    </main>
  );
}