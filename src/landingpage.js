import React from "react";
import { useNavigate,Link } from "react-router-dom";

import "./App.css";
import DisasterMap from './DisasterMap'; 

function LandingPage({onLoginClick,onHelplineClick,onRegisterClick,onSosClick,onAlertClick}) {
  const navigate = useNavigate();

  // Handler functions for navigation
  const handleSosClick = () => navigate("/sos");
  const handleAlertClick = () => navigate("/alert");

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar" >
        <div className="logo">JEEVAN RAKSHA</div>
        <div className="nav-right">
          <div className="nav-buttons" >
            <button className="nav-btn" onClick={onHelplineClick}>
              Helpline Contacts
            </button>
            {/* SOS Floating Icon Button (between Helpline and Log In) */}
            <button className="floating-sos-btn" title="Emergency SOS" onClick={onSosClick}>
        <span>SOS</span>
      </button>
    
          {/* <div className="auth-buttons" > */}
            <button className="login-btn-nav" onClick={onLoginClick}>Log In</button>
            <button className="register-btn" onClick={onRegisterClick}>Register</button>
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
            <button className="start-btn-hero" onClick={onRegisterClick}>Start Learning Now 🚀</button>
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
        <h2 className="fancy-title">⚠ Safety Steps for Disasters ⚠</h2>
        <p className="subtitle">Stay safe before, during, and after any disaster</p>
        
        <div className="safety-flex">
          {/* Before */}
          <div className="safety-card fancy">
            <h3>
              <span className="card-icon">
                <i className="fa-regular fa-clock" style={{color:"#888a8c"}}></i>
              </span> Before a Disaster
            </h3>
            <div className="icon-grid">
              <div className="icon-item glow">
                <span><i className="fa-solid fa-list-check" style={{color:"#888a8c"}}></i></span>
                <p>Plan</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-kit-medical" style={{color:"#888a8c"}}></i></span>
                <p>Emergency Kit</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-boxes-stacked" style={{color:"#888a8c"}}></i></span>
                <p>Stock Supplies</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-phone-volume" style={{color:"#888a8c"}}></i></span>
                <p>Know Helplines</p>
              </div>
            </div>
          </div>
          {/* During */}
          <div className="safety-card fancy">
            <h3>
              <span className="card-icon">
                <i className="fa-solid fa-triangle-exclamation" style={{color:"#888a8c"}}></i>
              </span> During a Disaster
            </h3>
            <div className="icon-grid">
              <div className="icon-item glow">
                <span><i className="fa-solid fa-brain" style={{color:"#888a8c"}}></i></span>
                <p>Stay Calm</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-shield-halved" style={{color:"#888a8c"}}></i></span>
                <p>Protect Yourself</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-bullhorn" style={{color:"#888a8c"}}></i></span>
                <p>Alert Others</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-person-walking" style={{color:"#888a8c"}}></i></span>
                <p>Move to Safety</p>
              </div>
            </div>
          </div>
          {/* After */}
          <div className="safety-card fancy">
            <h3>
              <span className="card-icon">
                <i className="fa-solid fa-phone" style={{color:"#888a8c"}}></i>
              </span> After a Disaster
            </h3>
            <div className="icon-grid">
              <div className="icon-item glow">
                <span><i className="fa-solid fa-user-nurse" style={{color:"#888a8c"}}></i></span>
                <p>Check Injuries</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-phone" style={{color:"#888a8c"}}></i></span>
                <p>Reports Incidents</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-hand-holding-heart" style={{color:"#888a8c"}}></i></span>
                <p>Care for Victims</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-satellite-dish" style={{color:"#888a8c"}}></i></span>
                <p>Stay Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Floating Icon (Bottom Right) */}
      <button
        
        className="floating-alert-btn"
        title="Live Disaster Alerts"
        onClick={onAlertClick}
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
          zIndex: 1000
        }}
      >
        <i className="fa-solid fa-bullhorn"></i>
      </button>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Jeevan Raksha. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
