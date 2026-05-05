"use client";
import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "My farm", id: "farm", href: "/dashboard/farmer" },
  { icon: "📋", label: "Diagnoses", id: "diagnoses", href: "/dashboard/farmer/diagnoses" },
  { icon: "🤖", label: "AI insights", id: "insights", href: "/dashboard/farmer/insights" },
  { icon: "👨‍🌾", label: "Agronomists", id: "agronomists", href: "/dashboard/farmer/agronomists" },
  { icon: "⚙️", label: "Settings", id: "settings", href: "/dashboard/farmer/settings" },
];

const diagnoses = [
  {
    id: 1,
    date: "May 2, 2025",
    crop: "Maize",
    field: "Field A",
    severity: "warning",
    title: "Early grey leaf spot detected",
    summary: "Early signs of grey leaf spot found on maize leaves. Fungicide application recommended within 48 hours. Nitrogen levels also low — foliar feeding advised after treatment.",
    image: null,
    agronomistReview: "Confirmed by Dr. Achieng Otieno",
    sensors: { moisture: "68%", temp: "24°C", nitrogen: "Low" },
  },
  {
    id: 2,
    date: "Apr 24, 2025",
    crop: "Maize",
    field: "Field A",
    severity: "healthy",
    title: "Crop in good health",
    summary: "No diseases detected. Soil moisture, NPK and temperature all within optimal range. Continue current care routine.",
    image: null,
    agronomistReview: null,
    sensors: { moisture: "72%", temp: "22°C", nitrogen: "OK" },
  },
  {
    id: 3,
    date: "Apr 15, 2025",
    crop: "Beans",
    field: "Field B",
    severity: "alert",
    title: "Bacterial blight detected",
    summary: "Bacterial blight identified on bean leaves. Immediate removal of infected plants recommended. Avoid overhead irrigation. Agronomist visit was requested and completed.",
    image: null,
    agronomistReview: "Visited by Dr. Achieng Otieno on Apr 17",
    sensors: { moisture: "85%", temp: "26°C", nitrogen: "OK" },
  },
  {
    id: 4,
    date: "Apr 5, 2025",
    crop: "Maize",
    field: "Field A",
    severity: "warning",
    title: "Low potassium levels",
    summary: "Potassium levels dropped below optimal range. Soil may need potassium-rich fertiliser. No disease detected in crop images.",
    image: null,
    agronomistReview: "Confirmed by Dr. Achieng Otieno",
    sensors: { moisture: "65%", temp: "23°C", nitrogen: "OK" },
  },
  {
    id: 5,
    date: "Mar 28, 2025",
    crop: "Beans",
    field: "Field B",
    severity: "healthy",
    title: "Crop in good health",
    summary: "All sensor readings and image analysis show healthy crop conditions. Continue current irrigation schedule.",
    image: null,
    agronomistReview: null,
    sensors: { moisture: "70%", temp: "21°C", nitrogen: "OK" },
  },
];

export default function DiagnosesPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "healthy" | "warning" | "alert">("all");

  const [collapsed, setCollapsed] = useState(false);
  const filtered = filter === "all" ? diagnoses : diagnoses.filter(d => d.severity === filter);
  const selectedDiag = diagnoses.find(d => d.id === selected);

  const severityStyle = (s: string): React.CSSProperties => {
    const map: Record<string, React.CSSProperties> = {
      healthy: { background: "rgba(126,200,80,0.12)", color: "#7ec850", border: "0.5px solid rgba(126,200,80,0.2)" },
      warning: { background: "rgba(240,165,0,0.12)", color: "#f0a500", border: "0.5px solid rgba(240,165,0,0.2)" },
      alert: { background: "rgba(224,85,85,0.12)", color: "#e05555", border: "0.5px solid rgba(224,85,85,0.2)" },
    };
    return map[s];
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .nav-item { padding: 0.7rem 0.75rem; border-radius: 8px; font-size: 0.875rem; color: rgba(232,240,225,0.5); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #e8f0e1; }
        .nav-item.active { background: rgba(126,200,80,0.12); color: #7ec850; }
        .diag-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; border-radius: 12px; border: 0.5px solid rgba(255,255,255,0.07); cursor: pointer; transition: all 0.2s; margin-bottom: 0.75rem; background: rgba(255,255,255,0.02); }
        .diag-row:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); }
        .diag-row.active { border-color: rgba(126,200,80,0.3); background: rgba(126,200,80,0.06); }
        .filter-btn { padding: 5px 14px; border-radius: 100px; border: 0.5px solid rgba(255,255,255,0.1); background: transparent; color: rgba(232,240,225,0.45); font-family: 'DM Sans', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: rgba(126,200,80,0.12); color: #7ec850; border-color: rgba(126,200,80,0.25); }
        .sensor-pill { background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.5rem 0.75rem; font-size: 0.78rem; }
        .sensor-pill-label { color: rgba(232,240,225,0.35); font-size: 0.7rem; margin-bottom: 2px; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: "210px", minHeight: "100vh", borderRight: "0.5px solid rgba(255,255,255,0.08)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0 }}>
        <div style={{ fontSize: "1.05rem", padding: "0 0.5rem", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
        </div>
        {navItems.map(item => (
          <a key={item.id} href={item.href} className={`nav-item ${item.id === "diagnoses" ? "active" : ""}`}>
            <span style={{ fontSize: "15px", width: "18px", textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </a>
        ))}
        <div style={{ marginTop: "auto", padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "rgba(232,240,225,0.3)" }}>
          Jane Wanjiku<br />
          <span style={{ color: "rgba(232,240,225,0.2)", fontSize: "0.72rem" }}>Kisii · 2.4 acres</span>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <div style={{ padding: "1.25rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>Diagnoses</div>
          <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.35)" }}>{diagnoses.length} total records</div>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1.1fr" : "1fr", flex: 1, overflow: "hidden" }}>

          {/* List */}
          <div style={{ padding: "1.5rem 2rem", overflowY: "auto", borderRight: selected ? "0.5px solid rgba(255,255,255,0.07)" : "none" }}>

            {/* Filters */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {(["all", "healthy", "warning", "alert"] as const).map(f => (
                <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>

            {/* Diagnosis rows */}
            {filtered.map(d => (
              <div key={d.id} className={`diag-row ${selected === d.id ? "active" : ""}`} onClick={() => setSelected(selected === d.id ? null : d.id)}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.severity === "healthy" ? "#7ec850" : d.severity === "warning" ? "#f0a500" : "#e05555", marginTop: "6px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem" }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{d.title}</div>
                    <span style={{ ...severityStyle(d.severity), fontSize: "10px", padding: "2px 8px", borderRadius: "100px", textTransform: "capitalize", flexShrink: 0, marginLeft: "0.5rem" }}>{d.severity}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(232,240,225,0.4)" }}>{d.crop} · {d.field} · {d.date}</div>
                  {d.agronomistReview && (
                    <div style={{ fontSize: "0.75rem", color: "#7ec850", marginTop: "0.3rem" }}>✓ {d.agronomistReview}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && selectedDiag && (
            <div style={{ padding: "1.5rem 2rem", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div>
                  <span style={{ ...severityStyle(selectedDiag.severity), fontSize: "11px", padding: "3px 10px", borderRadius: "100px", textTransform: "capitalize" }}>{selectedDiag.severity}</span>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginTop: "0.6rem", lineHeight: 1.3 }}>{selectedDiag.title}</h2>
                  <div style={{ fontSize: "0.78rem", color: "rgba(232,240,225,0.4)", marginTop: "0.3rem" }}>{selectedDiag.crop} · {selectedDiag.field} · {selectedDiag.date}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "100px", color: "rgba(232,240,225,0.4)", fontSize: "0.8rem", padding: "4px 10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>✕ Close</button>
              </div>

              {/* Summary */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>AI diagnosis</div>
                <div style={{ fontSize: "0.875rem", color: "rgba(232,240,225,0.75)", lineHeight: 1.7 }}>{selectedDiag.summary}</div>
              </div>

              {/* Sensor readings at time of diagnosis */}
              <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>Sensor readings at diagnosis</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "1.25rem" }}>
                {Object.entries(selectedDiag.sensors).map(([key, val]) => (
                  <div key={key} className="sensor-pill">
                    <div className="sensor-pill-label" style={{ textTransform: "capitalize" }}>{key}</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Agronomist review */}
              {selectedDiag.agronomistReview && (
                <div style={{ background: "rgba(126,200,80,0.07)", border: "0.5px solid rgba(126,200,80,0.18)", borderRadius: "12px", padding: "0.85rem 1.1rem" }}>
                  <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>Agronomist review</div>
                  <div style={{ fontSize: "0.875rem", color: "#7ec850" }}>✓ {selectedDiag.agronomistReview}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}