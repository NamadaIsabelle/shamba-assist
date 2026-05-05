"use client";
import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "My farm", id: "farm", href: "/dashboard/farmer" },
  { icon: "📋", label: "Diagnoses", id: "diagnoses", href: "/dashboard/farmer/diagnoses" },
  { icon: "🤖", label: "AI insights", id: "insights", href: "/dashboard/farmer/insights" },
  { icon: "👨‍🌾", label: "Agronomists", id: "agronomists", href: "/dashboard/farmer/agronomists" },
  { icon: "⚙️", label: "Settings", id: "settings", href: "/dashboard/farmer/settings" },
];

const agronomists = [
  {
    id: 1,
    name: "Dr. Achieng Otieno",
    initials: "AO",
    color: "#7ec850",
    title: "Senior Agronomist",
    location: "Kisii Town",
    distance: "3.2 km",
    speciality: ["Maize", "Beans", "Soil health"],
    rating: 4.9,
    reviews: 38,
    assigned: true,
    visitFee: "KSh 800",
    available: true,
    bio: "10+ years working with smallholder farmers in Nyanza and Western Kenya. Specialises in integrated soil and crop management.",
  },
  {
    id: 2,
    name: "Moses Kiplagat",
    initials: "MK",
    color: "#5ab4e8",
    title: "Agronomist",
    location: "Kisii Central",
    distance: "7.1 km",
    speciality: ["Tea", "Pyrethrum", "Horticulture"],
    rating: 4.6,
    reviews: 21,
    assigned: false,
    visitFee: "KSh 600",
    available: true,
    bio: "Specialises in cash crops and export horticulture. Works closely with cooperatives across Kisii and Nyamira counties.",
  },
  {
    id: 3,
    name: "Grace Nyambura",
    initials: "GN",
    color: "#f0a500",
    title: "Agronomist",
    location: "Ogembo",
    distance: "11.4 km",
    speciality: ["Maize", "Vegetables", "Irrigation"],
    rating: 4.7,
    reviews: 15,
    assigned: false,
    visitFee: "KSh 700",
    available: false,
    bio: "Focus on water-efficient farming and vegetable production. Has helped over 60 farmers adopt drip irrigation in Kisii County.",
  },
  {
    id: 4,
    name: "James Mwangi",
    initials: "JM",
    color: "#7ec850",
    title: "Junior Agronomist",
    location: "Suneka",
    distance: "14.8 km",
    speciality: ["Maize", "Soil testing", "Fertiliser"],
    rating: 4.4,
    reviews: 9,
    assigned: false,
    visitFee: "KSh 500",
    available: true,
    bio: "Recently certified agronomist passionate about soil science and helping young farmers adopt data-driven practices.",
  },
];

export default function AgronomistsPage() {
  const [selected, setSelected] = useState<number | null>(1);
  const [collapsed, setCollapsed] = useState(false);
  const [requested, setRequested] = useState<number[]>([]);

  const selectedAgro = agronomists.find(a => a.id === selected);

  const handleRequest = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRequested(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#0e1a0f", color: "#e8f0e1", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .nav-item { padding: 0.7rem 0.75rem; border-radius: 8px; font-size: 0.875rem; color: rgba(232,240,225,0.5); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #e8f0e1; }
        .nav-item.active { background: rgba(126,200,80,0.12); color: #7ec850; }
        .agro-row { display: flex; align-items: center; gap: 0.85rem; padding: 0.85rem 1rem; border-radius: 12px; border: 0.5px solid rgba(255,255,255,0.07); cursor: pointer; transition: all 0.2s; margin-bottom: 0.65rem; background: rgba(255,255,255,0.02); }
        .agro-row:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.04); }
        .agro-row.active { border-color: rgba(126,200,80,0.3); background: rgba(126,200,80,0.05); }
        .tag { font-size: 11px; padding: 3px 8px; border-radius: 100px; background: rgba(255,255,255,0.06); color: rgba(232,240,225,0.5); border: 0.5px solid rgba(255,255,255,0.1); }
        .btn-primary { background: #7ec850; color: #0e1a0f; border: none; padding: 0.7rem 1.5rem; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s; width: 100%; }
        .btn-primary:hover { background: #9dd96a; }
        .btn-requested { background: rgba(126,200,80,0.12); color: #7ec850; border: 0.5px solid rgba(126,200,80,0.25); padding: 0.7rem 1.5rem; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; width: 100%; cursor: default; }
        .btn-unavailable { background: rgba(255,255,255,0.04); color: rgba(232,240,225,0.3); border: 0.5px solid rgba(255,255,255,0.08); padding: 0.7rem 1.5rem; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; width: 100%; cursor: not-allowed; }
        .stars { color: #f0a500; font-size: 0.78rem; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: "210px", minHeight: "100vh", borderRight: "0.5px solid rgba(255,255,255,0.08)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0 }}>
        <div style={{ fontSize: "1.05rem", padding: "0 0.5rem", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          Shamba<span style={{ color: "#7ec850" }}>Ass<strong style={{ color: "#7ec850" }}>AI</strong>st</span>
        </div>
        {navItems.map(item => (
          <a key={item.id} href={item.href} className={`nav-item ${item.id === "agronomists" ? "active" : ""}`} style={{ textDecoration: "none" }}>
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
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>Agronomists near you</div>
          <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.35)" }}>Kisii area · {agronomists.length} found</div>
        </div>

        {/* Content — two column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", flex: 1, overflow: "hidden" }}>

          {/* Left — list */}
          <div style={{ padding: "1.5rem 1.5rem", overflowY: "auto", borderRight: "0.5px solid rgba(255,255,255,0.07)" }}>
            {agronomists.map(a => (
              <div key={a.id} className={`agro-row ${selected === a.id ? "active" : ""}`} onClick={() => setSelected(a.id)}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `rgba(${a.color === "#7ec850" ? "126,200,80" : a.color === "#5ab4e8" ? "90,180,232" : "240,165,0"},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: a.color, fontWeight: 500, flexShrink: 0 }}>
                  {a.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {a.name}
                      {a.assigned && <span style={{ fontSize: "9px", background: "rgba(126,200,80,0.15)", color: "#7ec850", border: "0.5px solid rgba(126,200,80,0.25)", padding: "1px 6px", borderRadius: "100px" }}>Your agronomist</span>}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.35)", flexShrink: 0 }}>{a.distance}</div>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.4)", marginTop: "2px" }}>{a.title} · {a.location}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "4px" }}>
                    <span className="stars">{"★".repeat(Math.floor(a.rating))}</span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.35)" }}>{a.rating} ({a.reviews})</span>
                    {!a.available && <span style={{ fontSize: "10px", color: "#e05555", marginLeft: "4px" }}>Unavailable</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — profile detail */}
          {selectedAgro && (
            <div style={{ padding: "1.5rem 2rem", overflowY: "auto" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: `rgba(${selectedAgro.color === "#7ec850" ? "126,200,80" : selectedAgro.color === "#5ab4e8" ? "90,180,232" : "240,165,0"},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: selectedAgro.color, fontWeight: 500, flexShrink: 0 }}>
                  {selectedAgro.initials}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>{selectedAgro.name}</div>
                    {selectedAgro.assigned && <span style={{ fontSize: "10px", background: "rgba(126,200,80,0.15)", color: "#7ec850", border: "0.5px solid rgba(126,200,80,0.25)", padding: "2px 8px", borderRadius: "100px" }}>Your agronomist</span>}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(232,240,225,0.45)" }}>{selectedAgro.title} · {selectedAgro.location}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "4px" }}>
                    <span className="stars">{"★".repeat(Math.floor(selectedAgro.rating))}</span>
                    <span style={{ fontSize: "0.78rem", color: "rgba(232,240,225,0.4)" }}>{selectedAgro.rating} · {selectedAgro.reviews} reviews</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>About</div>
                <div style={{ fontSize: "0.875rem", color: "rgba(232,240,225,0.65)", lineHeight: 1.7 }}>{selectedAgro.bio}</div>
              </div>

              {/* Specialities */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>Specialities</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {selectedAgro.speciality.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>

              {/* Visit fee + distance */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "1.5rem" }}>
                {[
                  { label: "Visit fee", value: selectedAgro.visitFee },
                  { label: "Distance", value: selectedAgro.distance },
                ].map(d => (
                  <div key={d.label} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "0.75rem 1rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "rgba(232,240,225,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{d.label}</div>
                    <div style={{ fontSize: "1rem", fontWeight: 500 }}>{d.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {requested.includes(selectedAgro.id) ? (
                <div className="btn-requested">✓ Visit requested — awaiting confirmation</div>
              ) : !selectedAgro.available ? (
                <div className="btn-unavailable">Currently unavailable</div>
              ) : (
                <button className="btn-primary" onClick={(e) => handleRequest(selectedAgro.id, e)}>
                  Request a farm visit · {selectedAgro.visitFee}
                </button>
              )}

              {selectedAgro.assigned && (
                <p style={{ fontSize: "0.75rem", color: "rgba(232,240,225,0.3)", textAlign: "center", marginTop: "0.75rem" }}>
                  This is your assigned agronomist. They already have access to your farm data.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}