import React, { useState } from "react";
import "./App.css";

// A simple modal component for login/register forms
const AuthModal = ({ mode, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = mode === 'register' ? { username, email, password } : { username, password };
    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{mode === 'login' ? 'Log In' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {mode === 'register' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="modal-submit-btn">
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
        <button className="modal-close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};


function App() {
  const [modalMode, setModalMode] = useState(null); // 'login', 'register', or null

  // Function to handle API requests
  const handleAuth = async (formData) => {
    const isLogin = modalMode === 'login';
    const endpoint = isLogin ? '/api/login' : '/api/register';
    const url = `http://127.0.0.1:5000${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Success: ${data.message}`);
        setModalMode(null); // Close modal on success
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("There was an error connecting to the server:", error);
      alert("Could not connect to the backend server.");
    }
  };

  return (
    <>
      {modalMode && (
        <AuthModal
          mode={modalMode}
          onClose={() => setModalMode(null)}
          onSubmit={handleAuth}
        />
      )}
      <div className="landing-page">
        {/* Navbar */}
        <header className="navbar">
          <div className="logo">🌍 JEEVAN RAKSHA</div>
          <div className="nav-right">
            <nav className="nav-links">
              <a href="#safety">Safety Steps</a>
              <a href="#maps">Risk Map</a>
            </nav>
            <div className="auth-buttons">
              <button className="login-btn-nav" onClick={() => setModalMode('login')}>Log In</button>
              <button className="register-btn" onClick={() => setModalMode('register')}>Register</button>
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711156066!2d73.78056543181198!3d18.524598599378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1667830233660!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Disaster Risk Map"
                className="map-iframe"
              ></iframe>
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

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 Jeevan Raksha. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;

