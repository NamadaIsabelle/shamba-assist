"use client";
import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "My farm", id: "farm", href: "/dashboard/farmer" },
  { icon: "📋", label: "Diagnoses", id: "diagnoses", href: "/dashboard/farmer/diagnoses" },
  { icon: "🤖", label: "AI insights", id: "insights", href: "/dashboard/farmer/insights" },
  { icon: "👨‍🌾", label: "Agronomists", id: "agronomists", href: "/dashboard/farmer/agronomists" },
  { icon: "⚙️", label: "Settings", id: "settings", href: "/dashboard/farmer/settings" },
];

export default function SettingsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [alertSensitivity, setAlertSensitivity] = useState<"low" | "medium" | "high">("medium");
  const [cropTypes, setCropTypes] = useState(["Maize", "Beans"]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} style={{ width: "40px", height: "22px", borderRadius: "100px", background: on ? "#7ec850" : "rgba(255,255,255,0.1)", cursor: "pointer", transition: "background 0.2s", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: "3px", left: on ? "20px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
    </div>
  );

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .nav-item { padding: 0.7rem 0.75rem; border-radius: 8px; font-size: 0.875rem; color: rgba(232,240,225,0.5); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #e8f0e1; }
        .nav-item.active { background: rgba(126,200,80,0.12); color: #7ec850; }
        .nav-item.collapsed { justify-content: center; padding: 0.7rem; }
        .section { background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.25rem; margin-bottom: 1.25rem; }
        .section-title { font-size: 0.72rem; color: rgba(232,240,225,0.35); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.1rem; }
        .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0; border-bottom: 0.5px solid rgba(255,255,255,0.05); }
        .setting-row:last-child { border-bottom: none; padding-bottom: 0; }
        .setting-label { font-size: 0.875rem; font-weight: 500; }
        .setting-desc { font-size: 0.75rem; color: rgba(232,240,225,0.4); margin-top: 2px; }
        input[type="text"], input[type="tel"] { background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 0.6rem 0.85rem; color: #e8f0e1; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; outline: none; transition: border-color 0.2s; width: 100%; }
        input[type="text"]:focus, input[type="tel"]:focus { border-color: #7ec850; }
        .sensitivity-btn { flex: 1; padding: 0.5rem; border-radius: 8px; border: 0.5px solid rgba(255,255,255,0.1); background: transparent; color: rgba(232,240,225,0.4); font-family: 'DM Sans', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; text-transform: capitalize; }
        .sensitivity-btn.active { background: rgba(126,200,80,0.12); color: #7ec850; border-color: rgba(126,200,80,0.3); }
        .size-toggle { display: flex; background: rgba(255,255,255,0.05); border-radius: 100px; padding: 3px; gap: 2px; }
        .size-btn { padding: 4px 14px; border-radius: 100px; border: none; background: transparent; color: rgba(232,240,225,0.4); font-family: 'DM Sans', sans-serif; font-size: 0.78rem; cursor: pointer; transition: all 0.2s; }
        .size-btn.active { background: rgba(126,200,80,0.15); color: #7ec850; }
        .crop-tag { font-size: 0.78rem; padding: 4px 10px; border-radius: 100px; background: rgba(126,200,80,0.1); color: #7ec850; border: 0.5px solid rgba(126,200,80,0.2); display: flex; align-items: center; gap: 4px; }
        .crop-tag button { background: none; border: none; color: #7ec850; cursor: pointer; font-size: 12px; padding: 0; line-height: 1; }
        .btn-save { background: #7ec850; color: #0e1a0f; border: none; padding: 0.75rem 2rem; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-save:hover { background: #9dd96a; }
        .btn-save.saved { background: rgba(126,200,80,0.2); color: #7ec850; border: 0.5px solid rgba(126,200,80,0.3); cursor: default; }
        .collapse-btn { background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 8px; color: rgba(232,240,225,0.4); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; padding: 0.4rem; }
        .collapse-btn:hover { background: rgba(255,255,255,0.08); color: #e8f0e1; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: collapsed ? "60px" : "210px", minHeight: "100vh", borderRight: "0.5px solid rgba(255,255,255,0.08)", padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0, transition: "width 0.25s ease", overflow: "hidden" }}>

        {/* Logo + collapse button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", padding: "0 0.25rem", marginBottom: "1.5rem" }}>
          {!collapsed && (
            <div style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
              Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
            </div>
          )}
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} title={collapsed ? "Expand" : "Collapse"}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav items */}
        {navItems.map(item => (
          <a key={item.id} href={item.href} className={`nav-item ${item.id === "settings" ? "active" : ""} ${collapsed ? "collapsed" : ""}`} style={{ textDecoration: "none" }} title={collapsed ? item.label : ""}>
            <span style={{ fontSize: "15px", width: "18px", textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && item.label}
          </a>
        ))}

        {/* User info */}
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
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>Settings</div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem 2rem", overflowY: "auto", flex: 1, maxWidth: "680px" }}>

          {/* Profile */}
          <div className="section">
            <div className="section-title">Profile</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginBottom: "0.4rem" }}>Full name</div>
                <input type="text" defaultValue="Jane Wanjiku" />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginBottom: "0.4rem" }}>Phone number</div>
                <input type="tel" defaultValue="+254 712 345 678" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginBottom: "0.4rem" }}>Email address</div>
              <input type="text" defaultValue="jane.wanjiku@example.com" />
            </div>
          </div>

          {/* Farm details */}
          <div className="section">
            <div className="section-title">Farm details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginBottom: "0.4rem" }}>Location / County</div>
                <input type="text" defaultValue="Kisii, Nyanza" />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginBottom: "0.4rem" }}>Farm size (acres)</div>
                <input type="text" defaultValue="2.4" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginBottom: "0.6rem" }}>Crop types</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                {cropTypes.map(c => (
                  <div key={c} className="crop-tag">
                    {c}
                    <button onClick={() => setCropTypes(cropTypes.filter(x => x !== c))}>✕</button>
                  </div>
                ))}
              </div>
              <input type="text" placeholder="Add a crop and press Enter" onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  setCropTypes([...cropTypes, e.currentTarget.value.trim()]);
                  e.currentTarget.value = "";
                }
              }} />
            </div>
          </div>

          {/* Notifications */}
          <div className="section">
            <div className="section-title">Notifications</div>
            <div className="setting-row">
              <div>
                <div className="setting-label">SMS alerts</div>
                <div className="setting-desc">Receive crop warnings and diagnoses via SMS</div>
              </div>
              <Toggle on={smsAlerts} onToggle={() => setSmsAlerts(!smsAlerts)} />
            </div>
            <div className="setting-row">
              <div>
                <div className="setting-label">Email alerts</div>
                <div className="setting-desc">Receive weekly farm summary by email</div>
              </div>
              <Toggle on={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
            </div>
            <div className="setting-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.6rem" }}>
              <div>
                <div className="setting-label">Alert sensitivity</div>
                <div className="setting-desc">How quickly ShambaAssist flags issues</div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                {(["low", "medium", "high"] as const).map(s => (
                  <button key={s} className={`sensitivity-btn ${alertSensitivity === s ? "active" : ""}`} onClick={() => setAlertSensitivity(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="section">
            <div className="section-title">Accessibility</div>
            <div className="setting-row">
              <div>
                <div className="setting-label">Text size</div>
                <div className="setting-desc">Increase text size for easier reading</div>
              </div>
              <div className="size-toggle">
                <button className={`size-btn ${fontSize === "normal" ? "active" : ""}`} onClick={() => setFontSize("normal")}>A</button>
                <button className={`size-btn ${fontSize === "large" ? "active" : ""}`} onClick={() => setFontSize("large")} style={{ fontSize: "1rem" }}>A</button>
              </div>
            </div>
          </div>

          {/* Save */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className={`btn-save ${saved ? "saved" : ""}`} onClick={handleSave}>
              {saved ? "✓ Changes saved" : "Save changes"}
            </button>
            {saved && <span style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.4)" }}>All settings updated</span>}
          </div>
        </div>
      </div>
    </main>
  );
}