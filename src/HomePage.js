import React, { useEffect } from "react";
import "./HomePage.css";
import {
  FaShieldAlt,
  FaGraduationCap,
  FaExclamationTriangle,
  FaBook,
  FaQuestionCircle,
  FaCheckCircle,
  FaTrophy,
  FaPalette,
  FaPlay,
  FaRocket,
} from "react-icons/fa";

function App() {
  useEffect(() => {
    // CTA Button Ripple Effect
    const ctaButtons = document.querySelectorAll(".cta-button");
    ctaButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.6)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s linear";

        const rect = this.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        ripple.style.width = "20px";
        ripple.style.height = "20px";
        ripple.style.marginLeft = "-10px";
        ripple.style.marginTop = "-10px";

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Module card hover effect
    const moduleCards = document.querySelectorAll(".module-card");
    moduleCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.background = "linear-gradient(135deg, #bbdefb, #e1bee7)";
      });
      card.addEventListener("mouseleave", function () {
        this.style.background = "linear-gradient(135deg, #e3f2fd, #f3e5f5)";
      });
    });

    // Inject ripple keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="container">
      {/* Floating Circles */}
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      {/* Header */}
      <header className="header">
        <h1>
          <FaShieldAlt /> JEEVAN RAKSHA
        </h1>
        <p>
          Your trusted partner in disaster preparedness and emergency response
          training.
        </p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Training Modules */}
        <div className="flexbox">
          <div className="flexbox-header">
            <div className="flexbox-icon">
              <FaGraduationCap />
            </div>
            <h2 className="flexbox-title">Training Modules</h2>
          </div>
          <div className="flexbox-content">
            <p>
              Learn essential disaster preparedness skills through our
              comprehensive training modules.
            </p>
            <div className="modules-grid">
              <div className="module-card">
                <div className="module-icon">
                  <FaShieldAlt />
                </div>
                <div className="module-title">Safety Measures</div>
              </div>
              <div className="module-card">
                <div className="module-icon">
                  <FaExclamationTriangle />
                </div>
                <div className="module-title">Precautions</div>
              </div>
              <div className="module-card">
                <div className="module-icon">
                  <FaBook />
                </div>
                <div className="module-title">Disaster Knowledge</div>
              </div>
            </div>
            <button className="cta-button">
              <FaPlay /> Start Learning
            </button>
          </div>
        </div>

        {/* Disaster Quiz */}
        <div className="flexbox">
          <div className="flexbox-header">
            <div className="flexbox-icon">
              <FaQuestionCircle />
            </div>
            <h2 className="flexbox-title">Disaster Quiz</h2>
          </div>
          <div className="flexbox-content">
            <p>
              Test your knowledge with our interactive disaster preparedness
              quiz.
            </p>
            <ul className="quiz-features">
              <li>
                <FaCheckCircle />
                <span>Multiple disaster scenarios</span>
              </li>
              <li>
                <FaTrophy />
                <span>Progress tracking</span>
              </li>
              <li>
                <FaPalette />
                <span>Engaging GUI</span>
              </li>
            </ul>
            <button className="cta-button">
              <FaRocket /> Take Quiz Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 JEEVAN RAKSHA. Empowering communities, saving lives.</p>
      </footer>
    </div>
  );
}

export default App;