"use client";
import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "My farm", id: "farm", href: "/dashboard/farmer" },
  { icon: "📋", label: "Diagnoses", id: "diagnoses", href: "/dashboard/farmer/diagnoses" },
  { icon: "🤖", label: "AI insights", id: "insights", href: "/dashboard/farmer/insights" },
  { icon: "👨‍🌾", label: "Agronomists", id: "agronomists", href: "/dashboard/farmer/agronomists" },
  { icon: "⚙️", label: "Settings", id: "settings", href: "/dashboard/farmer/settings" },
];

const insights = [
  {
    id: 1,
    category: "Fertiliser",
    icon: "🌿",
    color: "#7ec850",
    title: "Apply nitrogen top-dressing this week",
    detail: "Your nitrogen levels have been low for 2 consecutive readings. Based on your maize growth stage and current soil moisture, this is the optimal window to apply CAN fertiliser at 50kg per acre. Do this before the next rain forecast.",
    urgency: "high",
  },
  {
    id: 2,
    category: "Irrigation",
    icon: "💧",
    color: "#5ab4e8",
    title: "Reduce irrigation frequency slightly",
    detail: "Soil moisture is consistently sitting at 68–72%, which is within range but trending upward. With humidity also high at 71%, reducing irrigation by one session per week will prevent waterlogging and reduce disease risk.",
    urgency: "low",
  },
  {
    id: 3,
    category: "Planting",
    icon: "🌱",
    color: "#7ec850",
    title: "Best window to plant beans is in 3 weeks",
    detail: "Based on your soil temperature trends and historical rainfall patterns for Kisii in May, the optimal planting window for a second bean crop opens in approximately 3 weeks. Prepare your Field B now.",
    urgency: "medium",
  },
  {
    id: 4,
    category: "Disease risk",
    icon: "⚠️",
    color: "#f0a500",
    title: "High humidity increases blight risk",
    detail: "Humidity has been above 70% for 5 days. Combined with your previous bacterial blight diagnosis in Field B, conditions are favourable for recurrence. Consider a preventive copper-based fungicide spray this week.",
    urgency: "high",
  },
  {
    id: 5,
    category: "Yield forecast",
    icon: "📈",
    color: "#7ec850",
    title: "Maize yield forecast: above average",
    detail: "Based on current soil health scores, sensor trends, and your crop history, ShambaAssist forecasts a yield of approximately 18–22 bags per acre this season — above the regional average of 15 bags. Maintain current care and address the nitrogen deficiency.",
    urgency: "low",
  },
  {
    id: 6,
    category: "Soil health",
    icon: "🪱",
    color: "#5ab4e8",
    title: "Consider crop rotation after this season",
    detail: "Your Field A has grown maize for 2 consecutive seasons. Soil phosphorus and potassium are holding steady but long-term monocropping risks nutrient depletion. A legume crop (beans or groundnuts) next season will naturally restore nitrogen.",
    urgency: "low",
  },
];
const urgencyStyle = (u: string): React.CSSProperties => {
  const map: Record<string, React.CSSProperties> = {
    high: { background: "rgba(224,85,85,0.12)", color: "#e05555", border: "0.5px solid rgba(224,85,85,0.2)" },
    medium: { background: "rgba(240,165,0,0.12)", color: "#f0a500", border: "0.5px solid rgba(240,165,0,0.2)" },
    low: { background: "rgba(126,200,80,0.12)", color: "#7ec850", border: "0.5px solid rgba(126,200,80,0.2)" },
  };
  return map[u];
};

export default function InsightsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [speaking, setSpeaking] = useState<number | null>(null);

  const filtered = filter === "all" ? insights : insights.filter(i => i.urgency === filter);

  const speak = (insight: typeof insights[0]) => {
    if (speaking === insight.id) {
      window.speechSynthesis.cancel();
      setSpeaking(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${insight.title}. ${insight.detail}`);
    utterance.lang = "en-KE";
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(null);
    window.speechSynthesis.speak(utterance);
    setSpeaking(insight.id);
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .nav-item { padding: 0.7rem 0.75rem; border-radius: 8px; font-size: 0.875rem; color: rgba(232,240,225,0.5); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #e8f0e1; }
        .nav-item.active { background: rgba(126,200,80,0.12); color: #7ec850; }
        .insight-card { background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.1rem 1.25rem; cursor: pointer; transition: all 0.2s; }
        .insight-card:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); }
        .insight-card.open { border-color: rgba(126,200,80,0.25); background: rgba(126,200,80,0.04); }
        .filter-btn { padding: 5px 14px; border-radius: 100px; border: 0.5px solid rgba(255,255,255,0.1); background: transparent; color: rgba(232,240,225,0.45); font-family: 'DM Sans', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: rgba(126,200,80,0.12); color: #7ec850; border-color: rgba(126,200,80,0.25); }
        .btn-speak { display: inline-flex; align-items: center; gap: 6px; background: rgba(126,200,80,0.12); color: #7ec850; border: 0.5px solid rgba(126,200,80,0.25); padding: 5px 12px; border-radius: 100px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; transition: all 0.2s; margin-top: 0.75rem; }
        .btn-speak.speaking { background: rgba(224,85,85,0.12); color: #e05555; border-color: rgba(224,85,85,0.25); }
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
    <a key={item.id} href={item.href} className={`nav-item ${item.id === "insights" ? "active" : ""}`} style={{ textDecoration: "none", justifyContent: collapsed ? "center" : "flex-start" }} title={collapsed ? item.label : ""}>
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
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>AI Insights</div>
          <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.35)" }}>Updated today · based on your sensor data</div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem 2rem", overflowY: "auto", flex: 1 }}>

          {/* Summary bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "1.75rem" }}>
            {[
              { label: "High priority", count: insights.filter(i => i.urgency === "high").length, color: "#e05555", bg: "rgba(224,85,85,0.08)", border: "rgba(224,85,85,0.2)" },
              { label: "Medium priority", count: insights.filter(i => i.urgency === "medium").length, color: "#f0a500", bg: "rgba(240,165,0,0.08)", border: "rgba(240,165,0,0.2)" },
              { label: "Low priority", count: insights.filter(i => i.urgency === "low").length, color: "#7ec850", bg: "rgba(126,200,80,0.08)", border: "rgba(126,200,80,0.2)" },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, border: `0.5px solid ${s.border}`, borderRadius: "12px", padding: "1rem 1.25rem" }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{s.label}</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 500, color: s.color, lineHeight: 1 }}>{s.count}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
            {(["all", "high", "medium", "low"] as const).map(f => (
              <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>
                {f === "all" ? "All insights" : `${f} priority`}
              </button>
            ))}
          </div>

          {/* Insight cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map(insight => (
              <div key={insight.id} className={`insight-card ${expanded === insight.id ? "open" : ""}`} onClick={() => setExpanded(expanded === insight.id ? null : insight.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `rgba(${insight.color === "#7ec850" ? "126,200,80" : insight.color === "#5ab4e8" ? "90,180,232" : "240,165,0"},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                    {insight.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{insight.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.7rem", color: "rgba(232,240,225,0.35)", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "100px" }}>{insight.category}</span>
                        <span style={{ ...urgencyStyle(insight.urgency), fontSize: "10px", padding: "2px 8px", borderRadius: "100px", textTransform: "capitalize" }}>{insight.urgency}</span>
                        <span style={{ color: "rgba(232,240,225,0.3)", fontSize: "0.8rem" }}>{expanded === insight.id ? "▲" : "▼"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === insight.id && (
                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: "0.875rem", color: "rgba(232,240,225,0.65)", lineHeight: 1.75 }}>{insight.detail}</div>
                    <button className={`btn-speak ${speaking === insight.id ? "speaking" : ""}`} onClick={(e) => { e.stopPropagation(); speak(insight); }}>
                      {speaking === insight.id ? "🔇 Stop" : "🔊 Read aloud"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}