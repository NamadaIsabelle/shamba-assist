"use client";
import { useState, useRef } from "react";

const sensors = [
  { label: "Soil moisture", value: "68", unit: "%", note: "Optimal: 60–80%", color: "#7ec850", fill: 68 },
  { label: "Temperature", value: "24", unit: "°C", note: "Ambient reading", color: "#f0a500", fill: 55 },
  { label: "Humidity", value: "71", unit: "%", note: "Relative humidity", color: "#5ab4e8", fill: 71 },
  { label: "Nitrogen (N)", value: "Low", unit: "", note: "Needs top-dressing", color: "#e05555", fill: 28 },
  { label: "Phosphorus (P)", value: "OK", unit: "", note: "Within range", color: "#7ec850", fill: 65 },
  { label: "Potassium (K)", value: "OK", unit: "", note: "Within range", color: "#7ec850", fill: 70 },
];

const diagnosis = `Your maize crop shows early signs of grey leaf spot. Apply recommended fungicide within 48 hours. Combined with low nitrogen levels, consider foliar feeding after treatment. Soil moisture and humidity are within acceptable range.`;

const navItems = [
  { icon: "⊞", label: "My farm", id: "farm", href: "/dashboard/farmer" },
  { icon: "📋", label: "Diagnoses", id: "diagnoses", href: "/dashboard/farmer/diagnoses" },
  { icon: "🤖", label: "AI insights", id: "insights", href: "/dashboard/farmer/insights" },
  { icon: "👨‍🌾", label: "Agronomists", id: "agronomists", href: "/dashboard/farmer/agronomists" },
  { icon: "⚙️", label: "Settings", id: "settings", href: "/dashboard/farmer/settings" },
];
export default function FarmerDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [speaking, setSpeaking] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const large = fontSize === "large";

  const speak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(diagnosis);
    utterance.lang = "en-KE";
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadStatus("uploading");
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      setTimeout(() => setUploadStatus("done"), 1500);
    };
    reader.readAsDataURL(file);
  };

  const fs = {
    xs: large ? "0.85rem" : "0.72rem",
    sm: large ? "0.95rem" : "0.8rem",
    base: large ? "1.05rem" : "0.875rem",
    md: large ? "1.15rem" : "1rem",
    lg: large ? "1.3rem" : "1.1rem",
    xl: large ? "2rem" : "1.6rem",
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .nav-item { padding: 0.7rem 0.75rem; border-radius: 8px; font-size: 0.875rem; color: rgba(232,240,225,0.5); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.6rem; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #e8f0e1; }
        .nav-item.active { background: rgba(126,200,80,0.12); color: #7ec850; }
        .card { background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.25rem; }
        .sensor-card { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.1rem; }
        .bar { height: 4px; background: rgba(255,255,255,0.07); border-radius: 2px; margin-top: 0.75rem; overflow: hidden; }
        .upload-box { border: 0.5px dashed rgba(255,255,255,0.15); border-radius: 12px; padding: 2rem; text-align: center; cursor: pointer; transition: border-color 0.2s; }
        .upload-box:hover { border-color: rgba(126,200,80,0.4); }
        .btn-speak { display: flex; align-items: center; gap: 6px; background: rgba(126,200,80,0.12); color: #7ec850; border: 0.5px solid rgba(126,200,80,0.25); padding: 6px 14px; border-radius: 100px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-speak:hover { background: rgba(126,200,80,0.2); }
        .btn-speak.speaking { background: rgba(224,85,85,0.12); color: #e05555; border-color: rgba(224,85,85,0.25); }
        .size-toggle { display: flex; background: rgba(255,255,255,0.05); border-radius: 100px; padding: 3px; gap: 2px; }
        .size-btn { padding: 4px 12px; border-radius: 100px; border: none; background: transparent; color: rgba(232,240,225,0.4); font-family: 'DM Sans', sans-serif; font-size: 0.78rem; cursor: pointer; transition: all 0.2s; }
        .size-btn.active { background: rgba(126,200,80,0.15); color: #7ec850; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: collapsed ? "60px" : "210px", minHeight: "100vh", borderRight: "0.5px solid rgba(255,255,255,0.08)", padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0, transition: "width 0.25s ease", overflow: "hidden" }}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", padding: "0 0.25rem", marginBottom: "1.5rem" }}>
    {!collapsed && (
      <div style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
        Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
      </div>
    )}
    <button onClick={() => setCollapsed(!collapsed)} style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(232,240,225,0.4)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.4rem", fontSize: "0.85rem" }}>
      {collapsed ? "→" : "←"}
    </button>
  </div>
  {navItems.map(item => (
    <a key={item.id} href={item.href} className={`nav-item ${item.id === "farm" ? "active" : ""}`} style={{ textDecoration: "none", justifyContent: collapsed ? "center" : "flex-start" }} title={collapsed ? item.label : ""}>
      <span style={{ fontSize: "15px", width: "18px", textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
      {!collapsed && item.label}
    </a>
  ))}
  {!collapsed && (
    <div style={{ marginTop: "auto", padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "rgba(232,240,225,0.3)" }}>
      Jane Wanjiku<br />
      <span style={{ color: "rgba(232,240,225,0.2)", fontSize: "0.72rem" }}>Kisii · 2.4 acres</span>
    </div>
  )}
</aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <div style={{ padding: "1.25rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: fs.lg, fontWeight: 500 }}>My farm — Kisii 👋</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Text size toggle */}
            <div className="size-toggle">
              <button className={`size-btn ${fontSize === "normal" ? "active" : ""}`} onClick={() => setFontSize("normal")}>A</button>
              <button className={`size-btn ${fontSize === "large" ? "active" : ""}`} onClick={() => setFontSize("large")} style={{ fontSize: "1rem" }}>A</button>
            </div>
            <span style={{ background: "rgba(240,165,0,0.12)", color: "#f0a500", fontSize: fs.xs, padding: "4px 10px", borderRadius: "100px", border: "0.5px solid rgba(240,165,0,0.2)" }}>
              1 warning
            </span>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(126,200,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#7ec850", fontWeight: 500 }}>
              JW
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.75rem 2rem", overflowY: "auto", flex: 1 }}>

          {/* Health score */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.25rem" }}>
            <div style={{ width: large ? "80px" : "68px", height: large ? "80px" : "68px", borderRadius: "50%", border: "2.5px solid #7ec850", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexShrink: 0 }}>
              <div style={{ fontSize: large ? "1.6rem" : "1.4rem", fontWeight: 500, color: "#7ec850", lineHeight: 1 }}>74</div>
              <div style={{ fontSize: "0.6rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>score</div>
            </div>
            <div>
              <div style={{ fontSize: fs.md, fontWeight: 500, marginBottom: "0.3rem" }}>Good overall health</div>
              <div style={{ fontSize: fs.sm, color: "rgba(232,240,225,0.5)", lineHeight: 1.6, fontWeight: 300 }}>
                Soil moisture and humidity are within range. Nitrogen levels are slightly low — your agronomist has been notified.
              </div>
            </div>
          </div>

          {/* Sensor grid */}
          <div style={{ fontSize: fs.xs, color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Sensor readings</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "1.75rem" }}>
            {sensors.map(s => (
              <div key={s.label} className="sensor-card">
                <div style={{ fontSize: fs.xs, color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>{s.label}</div>
                <div style={{ fontSize: fs.xl, fontWeight: 500, color: s.color, lineHeight: 1 }}>{s.value}<span style={{ fontSize: fs.md }}>{s.unit}</span></div>
                <div style={{ fontSize: fs.xs, color: "rgba(232,240,225,0.35)", marginTop: "0.2rem" }}>{s.note}</div>
                <div className="bar"><div style={{ height: "100%", width: `${s.fill}%`, background: s.color, borderRadius: "2px" }} /></div>
              </div>
            ))}
          </div>

          {/* Diagnosis + Upload */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.25rem" }}>

            {/* Diagnosis */}
            <div>
              <div style={{ fontSize: fs.xs, color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Latest AI diagnosis</div>
              <div style={{ background: "rgba(126,200,80,0.07)", border: "0.5px solid rgba(126,200,80,0.18)", borderRadius: "12px", padding: "1.1rem 1.25rem", marginBottom: "0.75rem" }}>
                <div style={{ fontSize: fs.base, fontWeight: 500, color: "#7ec850", marginBottom: "0.5rem" }}>⚠ Early grey leaf spot detected</div>
                <div style={{ fontSize: fs.base, color: "rgba(232,240,225,0.65)", lineHeight: 1.7 }}>{diagnosis}</div>
                <div style={{ marginTop: "1rem" }}>
                  <button className={`btn-speak ${speaking ? "speaking" : ""}`} onClick={speak} style={{ fontSize: fs.sm }}>
                    {speaking ? "🔇 Stop" : "🔊 Read aloud"}
                  </button>
                </div>
              </div>
            </div>

            {/* Image upload */}
            <div>
              <div style={{ fontSize: fs.xs, color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Upload crop image</div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

              {uploadedImage ? (
                <div style={{ borderRadius: "12px", overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.08)", position: "relative" }}>
                  <img src={uploadedImage} alt="Uploaded crop" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
                  {uploadStatus === "uploading" && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(14,26,15,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs.base, color: "#7ec850" }}>
                      Analysing...
                    </div>
                  )}
                  {uploadStatus === "done" && (
                    <div style={{ padding: "0.75rem 1rem", background: "rgba(126,200,80,0.08)", borderTop: "0.5px solid rgba(126,200,80,0.15)", fontSize: fs.sm, color: "#7ec850" }}>
                      ✓ Image sent to AI + your agronomist for review
                    </div>
                  )}
                  <button onClick={() => { setUploadedImage(null); setUploadStatus("idle"); }} style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(14,26,15,0.8)", border: "0.5px solid rgba(255,255,255,0.15)", borderRadius: "100px", color: "rgba(232,240,225,0.6)", fontSize: "11px", padding: "3px 8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="upload-box" onClick={() => fileRef.current?.click()}>
                  <div style={{ fontSize: "28px", marginBottom: "0.5rem" }}>📷</div>
                  <div style={{ fontSize: fs.base, color: "rgba(232,240,225,0.5)", marginBottom: "0.25rem" }}>Tap to upload a photo</div>
                  <div style={{ fontSize: fs.sm, color: "rgba(232,240,225,0.25)" }}>Leaves, roots or fruit</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}