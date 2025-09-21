import React from "react";
import "./HomePage.css";
import { FaArrowLeft } from "react-icons/fa";

const HomePage = ({ onQuizClick, onDrillClick, onStartLearningClick, onBack }) => {
  return (
    <div className="container">
      {/* Back button at top left */}
      {onBack && (
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft style={{ marginRight: "0.5rem" }} />
          Back
        </button>
      )}
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
          <p>
            Saving lives through preparedness building a disaster ready nation
          </p>
        </header>

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
                <p>
                  Learn essential disaster preparedness skills through our
                  comprehensive training modules.
                </p>
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
                <p>
                  Test your knowledge with our interactive disaster preparedness
                  quiz.
                </p>
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
                <p>
                  Learn how to respond to emergencies through interactive,
                  story-based scenarios.
                </p>
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