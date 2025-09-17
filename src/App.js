import React from "react";
import "./App.css";

function App() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">🌍 DisasterEd</div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn-nav">Log In</button>
          <button className="start-btn">Get Started</button>
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
      </main>

      {/* Modules Section */}
      <section className="designs-section" id="features">
        <h2>🌟 Life-Saving Modules for Every Disaster</h2>
        <div className="designs-container">
          <div className="design-card">
            <img
              src="https://i.natgeofe.com/n/79dd0b3b-0038-4d3c-a947-a8e3a0ecb9d5/52801.jpg"
              alt="Earth Disaster"
            />
            <div className="design-text">🌍 Land Disasters</div>
          </div>
          <div className="design-card">
            <img
              src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/57FB/production/_87032522_87032521.jpg"
              alt="Water Disaster"
            />
            <div className="design-text">🌊 Water Disasters</div>
          </div>
          <div className="design-card">
            <img
              src="https://cdn.hswstatic.com/gif/gettyimages-161135620.jpg"
              alt="Air Disaster"
            />
            <div className="design-text">🌪️ Air Disasters</div>
          </div>
        </div>
        <button className="explore-btn">Explore All Modules →</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DisasterEd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;