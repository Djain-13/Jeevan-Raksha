import React from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import DisasterMap from './DisasterMap'; 

function LandingPage({onLoginClick,onHelplineClick}) {
  const navigate = useNavigate();

  // Handler functions for navigation
  const handleSosClick = () => navigate("/sos");
  const handleAlertClick = () => navigate("/alert");

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar" style={{position: "relative"}}>
        <div className="logo">🌍 JEEVAN RAKSHA</div>
        <div className="nav-right" style={{position: "relative"}}>
          <nav className="nav-links" style={{display: "flex", alignItems: "center", position: "relative"}}>
            <button className="nav-btn" onClick={onHelplineClick}>
              Helpline Contacts
            </button>
            {/* SOS Floating Icon Button (between Helpline and Log In) */}
            <span style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
              marginRight: "0"
            }}>
              <a
                href="/sos%20route.html"
                className="floating-sos-btn"
                title="Emergency SOS"
                style={{
                  position: "static",
                  margin: "0",
                  width: "48px",
                  height: "48px",
                  fontSize: "1.1rem",
                  animation: "sosPulse 2s infinite",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  textDecoration: "none"
                }}
              >
                <span style={{
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  color: "#e74c3c",
                  lineHeight: "1"
                }}>SOS</span>
              </a>
            </span>
          </nav>
          <div className="auth-buttons" style={{marginLeft: "0"}}>
            <button className="login-btn-nav" onClick={onLoginClick}>Log In</button>
            <button className="register-btn">Register</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="text-content">
            <h1>
              Be Prepared, <span>Stay Safe</span>.
            </h1>
            <p>
              Learn how to protect yourself and others during natural disasters
              with interactive, life-saving modules.
            </p>
            <button className="start-btn-hero">Start Learning Now 🚀</button>
          </div>
          <div className="image-content">
            <div className="template-preview">
              <img
                src="https://cdn.mos.cms.futurecdn.net/kdNW9mfuKWuTRr35YZjEp5.jpg"
                alt="Disaster Preparedness Education Modules"
              />
            </div>
          </div>
        </div>

        {/* Wave Animation */}
        <div className="wave-container">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              className="wave1"
              d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            ></path>
            <path
              className="wave2"
              d="M0,0 C200,80 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
            ></path>
            <path
              className="wave3"
              d="M0,0 C250,100 450,0 600,50 C750,100 950,0 1200,50 L1200,120 L0,120 Z"
            ></path>
          </svg>
        </div>
      </main>

      {/* Maps Section */}
      <section className="maps-section" id="maps">
        <div className="container">
          <center>
            <h2>🗺️ Disaster Risk Map</h2>
          </center>
          <div className="map-container">
            <DisasterMap />
          </div>
        </div>
      </section>

      {/* Safety Steps Section */}
      <section className="safety-section" id="safety">
        <h2 className="fancy-title">🌟 Safety Steps for Disasters 🌟</h2>
        <p className="subtitle">Stay safe before, during, and after any disaster</p>
        
        <div className="safety-flex">
          {/* Before */}
          <div className="safety-card fancy">
            <h3>⏳ Before a Disaster</h3>
            <div className="icon-grid">
              <div className="icon-item glow"><span>📝</span><p>Plan</p></div>
              <div className="icon-item glow"><span>🎒</span><p>Emergency Kit</p></div>
              <div className="icon-item glow"><span>📦</span><p>Stock Supplies</p></div>
              <div className="icon-item glow"><span>📞</span><p>Know Helplines</p></div>
            </div>
          </div>
          {/* During */}
          <div className="safety-card fancy">
            <h3>⚠️ During a Disaster</h3>
            <div className="icon-grid">
              <div className="icon-item glow"><span>🧘</span><p>Stay Calm</p></div>
              <div className="icon-item glow"><span>🛡️</span><p>Protect Yourself</p></div>
              <div className="icon-item glow"><span>📢</span><p>Alert Others</p></div>
              <div className="icon-item glow"><span>🚶</span><p>Move to Safety</p></div>
            </div>
          </div>
          {/* After */}
          <div className="safety-card fancy">
            <h3>🌈 After a Disaster</h3>
            <div className="icon-grid">
              <div className="icon-item glow"><span>⛑️</span><p>Check Injuries</p></div>
              <div className="icon-item glow"><span>📞</span><p>Reports Incidents</p></div>
              <div className="icon-item glow"><span>❤️</span><p>Care for Victims</p></div>
              <div className="icon-item glow"><span>📡</span><p>Stay Connected</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Floating Icon (Bottom Right) */}
      <a
        href="/alert%20route.html"
        className="floating-alert-btn"
        title="Live Disaster Alerts"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "62px",
          height: "62px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.1rem",
          borderRadius: "50%",
          border: "2px solid #b3e0ff",
          background: "linear-gradient(135deg, #e0f2f7 60%, #f0f4f8 100%)",
          color: "#3498db",
          boxShadow: "0 6px 24px rgba(52, 152, 219, 0.18)",
          cursor: "pointer",
          transition: "transform 0.18s, box-shadow 0.18s",
          textDecoration: "none",
          zIndex: 1000
        }}
      >
        <i className="fa-solid fa-bullhorn"></i>
      </a>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DisasterEd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
