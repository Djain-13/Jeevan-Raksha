import React from "react";

import "./App.css";
import MapComponent from "./MapComponent";


function LandingPage({onLoginClick,onHelplineClick}) {
  return (
   
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">🌍 JEEVAN RAKSHA</div>
        <div className="nav-right">
        <nav className="nav-links">
         <button className="nav-btn" onClick={onHelplineClick}>
              Helpline Contacts
            </button>
        </nav>
        <div className="auth-buttons">
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
            <MapComponent />
          </div>
        </div>
      </section>

      {/* Safety Steps Section */}
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


      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DisasterEd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
