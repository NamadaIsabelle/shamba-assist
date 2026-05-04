"use client";
import { useState } from "react";

const farmers = [
  { name: "Jane Wanjiku", location: "Kisii", realSensors: 1, simSensors: 3, status: "healthy", requestedVisit: true, requestedDaysAgo: 0 },
  { name: "Musa Otieno", location: "Homabay", realSensors: 1, simSensors: 2, status: "warning", requestedVisit: true, requestedDaysAgo: 2 },
  { name: "Grace Chebet", location: "Bomet", realSensors: 0, simSensors: 4, status: "alert", requestedVisit: true, requestedDaysAgo: 3 },
  { name: "Peter Kamau", location: "Nyeri", realSensors: 2, simSensors: 5, status: "healthy", requestedVisit: false, requestedDaysAgo: 0 },
  { name: "Aisha Mwangi", location: "Nakuru", realSensors: 1, simSensors: 2, status: "healthy", requestedVisit: false, requestedDaysAgo: 0 },
  { name: "John Kipchoge", location: "Eldoret", realSensors: 0, simSensors: 3, status: "warning", requestedVisit: false, requestedDaysAgo: 0 },
];

const navItems = [
  { icon: "⊞", label: "Overview", id: "overview" },
  { icon: "👥", label: "My farmers", id: "farmers" },
  { icon: "📡", label: "Sensors", id: "sensors" },
  { icon: "🔬", label: "Diagnoses", id: "diagnoses" },
  { icon: "📍", label: "Visit requests", id: "visits", badge: 3 },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [visitStatuses, setVisitStatuses] = useState<Record<string, "pending" | "accepted" | "declined">>(
    Object.fromEntries(farmers.filter(f => f.requestedVisit).map(f => [f.name, "pending"]))
  );

  const handleVisit = (name: string, action: "accepted" | "declined") => {
    setVisitStatuses(prev => ({ ...prev, [name]: action }));
  };

  const visitRequests = farmers.filter(f => f.requestedVisit);
  const totalSensors = farmers.reduce((a, f) => a + f.realSensors + f.simSensors, 0);
  const realSensors = farmers.reduce((a, f) => a + f.realSensors, 0);
  const simSensors = farmers.reduce((a, f) => a + f.simSensors, 0);
  const alerts = farmers.filter(f => f.status === "alert").length;
  const healthy = farmers.filter(f => f.status === "healthy").length;
  const warning = farmers.filter(f => f.status === "warning").length;

  const statusBadge = (status: string) => {
    const styles: Record<string, React.CSSProperties> = {
      healthy: { background: "rgba(126,200,80,0.12)", color: "#7ec850", border: "0.5px solid rgba(126,200,80,0.2)" },
      warning: { background: "rgba(240,165,0,0.12)", color: "#f0a500", border: "0.5px solid rgba(240,165,0,0.2)" },
      alert: { background: "rgba(224,85,85,0.12)", color: "#e05555", border: "0.5px solid rgba(224,85,85,0.2)" },
    };
    return (
      <span style={{ ...styles[status], fontSize: "11px", padding: "3px 8px", borderRadius: "100px", fontWeight: 500, textTransform: "capitalize" }}>
        {status}
      </span>
    );
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .nav-item { padding: 0.6rem 0.75rem; border-radius: 8px; font-size: 0.85rem; color: rgba(232,240,225,0.5); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.6rem; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #e8f0e1; }
        .nav-item.active { background: rgba(126,200,80,0.12); color: #7ec850; }
        .stat-card { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem 1.25rem; }
        .card { background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.25rem; }
        table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        th { text-align: left; font-size: 0.72rem; color: rgba(232,240,225,0.3); font-weight: 400; padding: 0 0 0.6rem; border-bottom: 0.5px solid rgba(255,255,255,0.06); }
        td { padding: 0.65rem 0; border-bottom: 0.5px solid rgba(255,255,255,0.04); color: rgba(232,240,225,0.8); vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        .btn-accept { background: rgba(126,200,80,0.15); color: #7ec850; border: 0.5px solid rgba(126,200,80,0.25); padding: 4px 10px; border-radius: 100px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .btn-decline { background: rgba(224,85,85,0.1); color: #e05555; border: 0.5px solid rgba(224,85,85,0.2); padding: 4px 10px; border-radius: 100px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .sensor-pill { font-size: 11px; padding: 2px 7px; border-radius: 100px; background: rgba(90,180,232,0.1); color: #5ab4e8; border: 0.5px solid rgba(90,180,232,0.2); margin-right: 3px; }
        .sensor-pill.sim { background: rgba(232,240,225,0.06); color: rgba(232,240,225,0.4); border: 0.5px solid rgba(255,255,255,0.1); }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: "220px", minHeight: "100vh", borderRight: "0.5px solid rgba(255,255,255,0.08)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0 }}>
        <div style={{ fontSize: "1.1rem", padding: "0 0.5rem", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
        </div>
        {navItems.map(item => (
          <div key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
            <span style={{ fontSize: "14px", width: "16px", textAlign: "center" }}>{item.icon}</span>
            {item.label}
            {item.badge && (
              <span style={{ background: "rgba(224,85,85,0.2)", color: "#e05555", fontSize: "10px", padding: "1px 6px", borderRadius: "100px", marginLeft: "auto" }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "0.5rem 0.75rem", fontSize: "0.78rem", color: "rgba(232,240,225,0.3)" }}>
          Dr. Achieng O.<br />
          <span style={{ color: "rgba(232,240,225,0.2)", fontSize: "0.72rem" }}>Agronomist</span>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <div style={{ padding: "1.25rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>Good morning, Dr. Achieng 👋</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {alerts > 0 && (
              <span style={{ background: "rgba(224,68,68,0.15)", color: "#f08080", fontSize: "11px", padding: "3px 8px", borderRadius: "100px", border: "0.5px solid rgba(224,68,68,0.2)" }}>
                {alerts} alert{alerts > 1 ? "s" : ""}
              </span>
            )}
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(126,200,80,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#7ec850", fontWeight: 500 }}>
              AO
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.75rem 2rem", overflowY: "auto", flex: 1 }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "1.75rem" }}>
            {[
              { label: "Total farmers", value: farmers.length, sub: "2 added this month", color: "#7ec850" },
              { label: "Active sensors", value: totalSensors, sub: `${realSensors} real · ${simSensors} simulated`, color: "#5ab4e8" },
              { label: "Pending alerts", value: alerts, sub: "Needs your review", color: "#e05555" },
              { label: "Visit requests", value: visitRequests.length, sub: "This week", color: "#f0a500" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>{s.label}</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 500, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.35)", marginTop: "0.3rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Farmer table + right column */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>

            {/* Farmer table */}
            <div className="card">
              <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Farmer overview</div>
              <table>
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Location</th>
                    <th>Sensors</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map(f => (
                    <tr key={f.name}>
                      <td style={{ fontWeight: 500 }}>{f.name}</td>
                      <td style={{ color: "rgba(232,240,225,0.45)", fontSize: "0.78rem" }}>{f.location}</td>
                      <td>
                        {f.realSensors > 0 && <span className="sensor-pill">{f.realSensors} real</span>}
                        {f.simSensors > 0 && <span className="sensor-pill sim">{f.simSensors} sim</span>}
                      </td>
                      <td>{statusBadge(f.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* Visit requests */}
              <div className="card">
                <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Visit requests</div>
                {visitRequests.map(f => (
                  <div key={f.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>{f.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginTop: "2px" }}>
                        {f.location} · {f.requestedDaysAgo === 0 ? "Today" : `${f.requestedDaysAgo} days ago`}
                      </div>
                    </div>
                    {visitStatuses[f.name] === "pending" ? (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn-accept" onClick={() => handleVisit(f.name, "accepted")}>Accept</button>
                        <button className="btn-decline" onClick={() => handleVisit(f.name, "declined")}>Decline</button>
                      </div>
                    ) : (
                      <span style={{ fontSize: "11px", color: visitStatuses[f.name] === "accepted" ? "#7ec850" : "#e05555", fontWeight: 500, textTransform: "capitalize" }}>
                        {visitStatuses[f.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Crop health breakdown */}
              <div className="card">
                <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Crop health breakdown</div>
                {[
                  { label: "Healthy", count: healthy, total: farmers.length, color: "#7ec850" },
                  { label: "Warning", count: warning, total: farmers.length, color: "#f0a500" },
                  { label: "Alert", count: alerts, total: farmers.length, color: "#e05555" },
                ].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ fontSize: "0.78rem", color: "rgba(232,240,225,0.5)", width: "60px", flexShrink: 0 }}>{b.label}</div>
                    <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.round((b.count / b.total) * 100)}%`, background: b.color, borderRadius: "3px" }} />
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)" }}>{b.count}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}