import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShambaAssist",
  description: "AI-powered crop disease detection and soil health monitoring for smallholder farmers.",
};

export default function Home() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0e1a0f; }
        .nav-link { color: rgba(232,240,225,0.6); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        .nav-link:hover { color: #e8f0e1; }
        .btn-ghost:hover { border-color: rgba(232,240,225,0.5) !important; }
        .btn-primary:hover { background: #9dd96a !important; transform: translateY(-1px); }
        .feature-card:hover { border-color: rgba(126,200,80,0.3) !important; }
        .sensor-bar { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-top: 1rem; overflow: hidden; }
        @keyframes grow { from { width: 0; } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .hero-visual { grid-template-columns: 1fr !important; }
          nav { padding: 1.25rem 1.5rem !important; }
          .hero-section { padding: 4rem 1.5rem 3rem !important; }
          .features { padding: 3rem 1.5rem !important; }
          h1 { font-size: 2.5rem !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 4rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", letterSpacing: "-0.02em" }}>
          Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
        </div>
        <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#how-it-works" className="nav-link">How it works</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button className="btn-ghost" style={{ background: "transparent", color: "#e8f0e1", border: "0.5px solid rgba(232,240,225,0.25)", padding: "0.55rem 1.25rem", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s" }}>
            Sign in
          </button>
          <button className="btn-primary" style={{ background: "#7ec850", color: "#0e1a0f", border: "none", padding: "0.55rem 1.25rem", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
            Create account
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ padding: "7rem 4rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: "750px", marginBottom: "1.5rem" }}>
          Smart farming for <em style={{ fontStyle: "italic", color: "#7ec850" }}>every</em> Kenyan shamba
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(232,240,225,0.6)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "3rem", fontWeight: 300 }}>
          AI-powered crop disease detection and soil health monitoring — combining IoT sensor data with image analysis to give smallholder farmers actionable, affordable insights.
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button className="btn-primary" style={{ background: "#7ec850", color: "#0e1a0f", border: "none", padding: "0.85rem 2rem", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
            Get started →
          </button>
          <button className="btn-ghost" style={{ background: "transparent", color: "#e8f0e1", border: "0.5px solid rgba(232,240,225,0.25)", padding: "0.85rem 2rem", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }}>
            Learn more
          </button>
        </div>
      </section>

      {/* SENSOR DASHBOARD PREVIEW */}
      <div style={{ margin: "3rem 4rem", maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {[
          { label: "Soil moisture", value: "68", unit: "%", note: "Optimal range: 60–80%", color: "#7ec850", fill: 68 },
          { label: "Temperature", value: "24", unit: "°C", note: "Ambient field reading", color: "#f0a500", fill: 55 },
          { label: "Humidity", value: "71", unit: "%", note: "Relative humidity", color: "#5ab4e8", fill: 71 },
        ].map((s) => (
          <div key={s.label} className="feature-card" style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.25rem", transition: "border-color 0.2s" }}>
            <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{s.label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 500, color: s.color, lineHeight: 1 }}>{s.value}<span style={{ fontSize: "1rem" }}>{s.unit}</span></div>
            <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.4)", marginTop: "0.25rem" }}>{s.note}</div>
            <div className="sensor-bar">
              <div style={{ height: "100%", width: `${s.fill}%`, background: s.color, borderRadius: "2px", animation: "grow 2s ease forwards" }} />
            </div>
          </div>
        ))}
        <div style={{ gridColumn: "1 / -1", background: "rgba(126,200,80,0.08)", border: "0.5px solid rgba(126,200,80,0.2)", borderRadius: "10px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.875rem" }}>
          <div style={{ width: "28px", height: "28px", background: "rgba(126,200,80,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px" }}>✓</div>
          <div style={{ color: "rgba(232,240,225,0.8)" }}>
            <strong style={{ color: "#7ec850", fontWeight: 500 }}>AI diagnosis:</strong> Maize crop in Field A shows early signs of grey leaf spot — recommend applying fungicide within 48 hours. NPK levels suggest nitrogen top-dressing needed.
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="features" style={{ padding: "5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(232,240,225,0.35)", marginBottom: "1rem" }}>What we do</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "3.5rem", lineHeight: 1.15 }}>One platform.<br />Full picture.</h2>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {[
            { icon: "🌱", bg: "rgba(126,200,80,0.15)", title: "Sensor fusion", desc: "Combines soil moisture, NPK, temperature and humidity into a unified health score — not just raw numbers." },
            { icon: "📷", bg: "rgba(240,165,0,0.15)", title: "Crop image analysis", desc: "Upload a photo of your leaves, roots, or fruit. Our ML model identifies diseases trained on East African crop varieties." },
            { icon: "📱", bg: "rgba(90,180,232,0.15)", title: "SMS alerts", desc: "No internet? No problem. Critical alerts are delivered via SMS — designed for low-bandwidth areas." },
          ].map((f) => (
            <div key={f.title} className="feature-card" style={{ border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.75rem", transition: "border-color 0.2s" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", fontSize: "18px" }}>{f.icon}</div>
              <div style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.5rem" }}>{f.title}</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(232,240,225,0.5)", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "2rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "rgba(232,240,225,0.3)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>
          Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
        </div>
        <span>© 2025 ShambaAssist. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "rgba(232,240,225,0.3)", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "rgba(232,240,225,0.3)", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "rgba(232,240,225,0.3)", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>

    </main>
  );
}