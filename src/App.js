import React from "react";
import "./App.css";

function App() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">🌍 DisasterEd</div>
        <nav className="nav-links">
          <a href="#modules">Modules</a>
          <a href="#quizes">Quizes</a>
          <a href="#contact">Helpline Numbers</a>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn-nav">Log In</button>
          <button className="register-btn">Register</button>
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

      {/* 📍 Maps Section */}
      <section className="maps-section" id="maps">
        <div className="container">
         <center><h2>🗺️ Disaster Risk Map</h2></center> 
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

      

      {/* Modules Section */}
      {/* <section className="designs-section" id="features">
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
      </section> */}

      {/* New Section: Most, Recent, Least Sites */}
      <section className="designs-section" id="most-sites-section">
        <h2>🌐 Your Community's Insights</h2>
        <div className="designs-container">
          {/* Most Site Card */}
          <div className="design-card">
            <img
              src="https://api.backlinko.com/app/uploads/2024/04/most-popular-websites.png"
              alt="Most Visted"
            />
            <div className="design-text">📍 Most Visited Sites</div>
          </div>
          {/* Most Recent Card */}
          <div className="design-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWBRwwP_1g43onrq5MpybdNERBClXEHgQbSA&s"
              alt="Most Recent"
            />
            <div className="design-text">⏳ Most Recent Incidents</div>
          </div>
          {/* Least Site Card */}
          <div className="design-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc4Qk4M0yNekKAMqq5now_dYQ9iDpRgnozcw&s"
              alt="Least Visted"
            />
            <div className="design-text">🔍 Least Visited Sites</div>
          </div>
        </div>
      </section>

      {/* New Section: Advice Area */}
      <section className="designs-section advice-section" id="advice">
        <h2>💡 Practical Advice for Emergencies</h2>
        <div className="designs-container">
          <div className="design-card">
            <img
              src="https://images.pexels.com/photos/5125690/pexels-photo-5125690.jpeg"
              alt="First Aid Kit"
            />
            <div className="design-text">🩹 First Aid & Survival Tips</div>
          </div>
          <div className="design-card">
            <img
              src="https://t3.ftcdn.net/jpg/03/67/77/18/360_F_367771813_noufJlSe8XzBJV73KJADcbkGsj970vQe.jpg"
              alt="Evacuation Route"
            />
            <div className="design-text">🗺️ Evacuation & Shelter Guidance</div>
          </div>
          <div className="design-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP2GN5U5t88mqqn2Rq5IUU6rcq74t593znPg&s"
              alt="Communication"
            />
            <div className="design-text">📞 Communication Plans</div>
          </div>
        </div>
      </section>

      {/* New Section: Helpline Area */}
      <section className="designs-section helpline-section" id="helpline">
        <h2>📞 Emergency Helplines</h2>
        <div className="helpline-card">
          <div className="helpline-text">
            For immediate assistance, contact your local emergency services.
          </div>
          <div className="helpline-numbers">
            <div className="number-item">
              <span>National Disaster Helpline:</span>
              <span className="number">1-800-HELPLINE</span>
            </div>
            <div className="number-item">
              <span>Local Emergency Services:</span>
              <span className="number">911</span> (or local equivalent)
            </div>
            <div className="number-item">
              <span>Medical Emergency:</span>
              <span className="number">108</span>
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

export default App;
