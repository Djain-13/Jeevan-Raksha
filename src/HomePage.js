import React, { useState, useEffect } from "react";
import "./HomePage.css";
import InternalNav from "./InternalNav";

const MODULE_IDS = ["earthquake", "drought", "flood", "wildfire"];
const MODULE_TABS = ["prepare", "during", "after", "resources"];
const MODULE_INFO = {
  earthquake: { label: "Earthquakes", icon: "🔴", color: "#ef4444" },
  drought:    { label: "Drought",     icon: "🏜️", color: "#f59e0b" },
  flood:      { label: "Flood",       icon: "🌊", color: "#3b82f6" },
  wildfire:   { label: "Wildfire",    icon: "🔥", color: "#ea580c" },
};

const HomePage = ({ onQuizClick, onDrillClick, onStartLearningClick, onBack, onLogout, onProfileClick }) => {
  const [moduleProgress, setModuleProgress] = useState({});
  const [quizStats, setQuizStats] = useState({ level: 1, xp: 0, badgesEarned: [] });

  useEffect(() => {
    try {
      const mods = localStorage.getItem("jeevanraksha_module_progress");
      if (mods) setModuleProgress(JSON.parse(mods));
      const quiz = localStorage.getItem("disasterQuizUser");
      if (quiz) setQuizStats(JSON.parse(quiz));
    } catch {}
  }, []);

  const getModulePct = (id) => {
    const done = MODULE_TABS.filter(t => moduleProgress[`${id}_${t}`]).length;
    return Math.round((done / MODULE_TABS.length) * 100);
  };

  const totalSections = MODULE_IDS.length * MODULE_TABS.length;
  const visitedSections = Object.keys(moduleProgress).length;
  const overallPct = Math.round((visitedSections / totalSections) * 100);

  const xpToNext = quizStats.level * 100;
  const xpPct = Math.min(100, Math.round((quizStats.xp % xpToNext) / xpToNext * 100));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main, #f8fafc)" }}>
      {/* ── Shared Navbar ── */}
      <InternalNav
        title="Dashboard"
        onBack={onBack}
        onHome={null}          /* already on home */
        onProfile={onProfileClick}
        onLogout={onLogout}
        showHome={false}
      />

      <div className="homepage-container">
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>

        <header className="header">
          <h1>
            <i className="fas fa-shield-alt"></i> JEEVAN RAKSHA
          </h1>
          <p>Saving lives through preparedness — building a disaster-ready nation</p>
        </header>

        {/* ── Progress Summary Card ── */}
        <div style={{
          background: "var(--glass-bg, rgba(255,255,255,0.8))",
          border: "1px solid var(--glass-border, rgba(0,0,0,0.07))",
          borderRadius: "20px",
          padding: "24px 28px",
          marginBottom: "36px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0f172a" }}>
              📊 Your Progress
            </h2>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#3b82f6", lineHeight: 1 }}>{quizStats.level}</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>Level</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f59e0b", lineHeight: 1 }}>{quizStats.badgesEarned?.length || 0}</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>Badges</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: overallPct === 100 ? "#16a34a" : "#3b82f6", lineHeight: 1 }}>{overallPct}%</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>Modules</div>
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748b", marginBottom: "5px" }}>
              <span>XP — Level {quizStats.level} → {quizStats.level + 1}</span>
              <span style={{ fontWeight: 700, color: "#3b82f6" }}>{xpPct}%</span>
            </div>
            <div style={{ height: "8px", borderRadius: "10px", background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <div style={{
                width: `${xpPct}%`, height: "100%", borderRadius: "10px",
                background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>

          {/* Module tracker grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
            {MODULE_IDS.map(id => {
              const pct = getModulePct(id);
              const info = MODULE_INFO[id];
              return (
                <div
                  key={id}
                  onClick={onStartLearningClick}
                  style={{
                    background: pct === 100 ? "rgba(22,163,74,0.06)" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${pct === 100 ? "rgba(22,163,74,0.2)" : "rgba(0,0,0,0.07)"}`,
                    borderRadius: "12px", padding: "12px 14px",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.currentTarget.style.transform = "none"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
                      {info.icon} {info.label}
                    </span>
                    {pct === 100 && <span style={{ color: "#16a34a", fontSize: "0.9rem" }}>✓</span>}
                  </div>
                  <div style={{ height: "5px", borderRadius: "6px", background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
                    <div style={{
                      width: `${pct}%`, height: "100%", borderRadius: "6px",
                      background: pct === 100
                        ? "linear-gradient(90deg,#16a34a,#22c55e)"
                        : `linear-gradient(90deg, ${info.color}, ${info.color}aa)`,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "4px" }}>
                    {pct === 100 ? "Complete!" : `${pct}% done`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <main className="main-content">
          <div className="flexbox">
            <div>
              <div className="flexbox-header">
                <div className="flexbox-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h2 className="flexbox-title">Training Modules</h2>
              </div>
              <div className="flexbox-content">
                <p>Learn essential disaster preparedness skills through our comprehensive training modules.</p>
              </div>
            </div>
            <button className="cta-button" onClick={onStartLearningClick}>
              <i className="fas fa-play"></i> Start Learning
            </button>
          </div>

          <div className="flexbox">
            <div>
              <div className="flexbox-header">
                <div className="flexbox-icon">
                  <i className="fas fa-question-circle"></i>
                </div>
                <h2 className="flexbox-title">Disaster Quiz</h2>
              </div>
              <div className="flexbox-content">
                <p>Test your knowledge with our interactive disaster preparedness quiz.</p>
              </div>
            </div>
            <button className="cta-button" onClick={onQuizClick}>
              <i className="fas fa-rocket"></i> Take Quiz Now
            </button>
          </div>

          <div className="flexbox">
            <div>
              <div className="flexbox-header">
                <div className="flexbox-icon">
                  <i className="fas fa-vr-cardboard"></i>
                </div>
                <h2 className="flexbox-title">Virtual Drills</h2>
              </div>
              <div className="flexbox-content">
                <p>Learn how to respond to emergencies through interactive, story-based scenarios.</p>
              </div>
            </div>
            <button className="cta-button" onClick={onDrillClick}>
              <i className="fas fa-laptop-code"></i> Start Drill
            </button>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2025 JEEVAN RAKSHA. Empowering communities, saving lives.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;