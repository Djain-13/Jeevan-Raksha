import React, { useState, useEffect } from "react";
import LandingPage from "./landingpage";
import LoginPage from "./login";
import HelplineContacts from "./HelplineContacts";
import Register from "./Register";
import HomePage from "./HomePage";
import QuizPage from "./quiz_main";
import SosPage from "./SosPage";
import Alert from "./Alert";
import DrillGame from "./drill";
import ModulesPage from "./Module";
import UserProfile from "./UserProfile";

// Inline fade-transition styles (no extra CSS file needed)
const pageStyle = {
  animation: "pageFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
};

// Inject the keyframe once
const injectKeyframes = () => {
  if (document.getElementById("jr-page-keyframes")) return;
  const style = document.createElement("style");
  style.id = "jr-page-keyframes";
  style.textContent = `
    @keyframes pageFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
  `;
  document.head.appendChild(style);
};

function App() {
  // ── Persistent login: start on "home" if a valid token exists ──
  const getInitialPage = () => {
    const token = localStorage.getItem("access_token");
    return token ? "home" : "landing";
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isLoggedIn, setIsLoggedIn]   = useState(() => !!localStorage.getItem("access_token"));
  const [renderKey, setRenderKey]     = useState(0);

  // Inject animation keyframe on first render
  useEffect(() => { injectKeyframes(); }, []);

  // Wrapped navigator — increments key to replay animation on every page change
  const navigate = (page) => {
    setCurrentPage(page);
    setRenderKey(k => k + 1);
  };

  // --- Auth Handlers ---
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("landing");
  };

  // --- Navigation Handlers ---
  const handleLoginClick      = () => navigate("login");
  const handleBackToLanding   = () => navigate("landing");
  const handleHelplineClick   = () => navigate("helplines");
  const handleRegisterClick   = () => navigate("register");
  const handleGoToHome        = () => navigate("home");
  const handleSosClick        = () => navigate("sos");
  const handleAlertClick      = () => navigate("alert");
  const handleQuizClick       = () => navigate("quiz");
  const handleDrillClick      = () => navigate("drill");
  const handleLearningClick   = () => navigate("modules");
  const handleProfileClick    = () => navigate("profile");

  // If already logged in and user clicks "Start Learning", go to home directly
  const handleStartLearning = () => isLoggedIn ? navigate("home") : navigate("login");

  const page = (children) => (
    <div key={renderKey} style={pageStyle}>{children}</div>
  );

  return (
    <div>
      {currentPage === "landing" && page(
        <LandingPage
          onLoginClick={handleLoginClick}
          onHelplineClick={handleHelplineClick}
          onRegisterClick={handleRegisterClick}
          onSosClick={handleSosClick}
          onAlertClick={handleAlertClick}
          onStartLearningClick={handleStartLearning}
          isLoggedIn={isLoggedIn}
          onGoToHome={handleGoToHome}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "login" && page(
        <LoginPage
          onBack={handleBackToLanding}
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentPage === "helplines" && page(
        <HelplineContacts onBack={handleGoToHome} onHome={handleGoToHome} onProfile={handleProfileClick} onLogout={handleLogout} />
      )}

      {currentPage === "register" && page(
        <Register onBack={handleBackToLanding} onLoginClick={handleLoginClick} />
      )}

      {currentPage === "home" && page(
        <HomePage
          onQuizClick={handleQuizClick}
          onDrillClick={handleDrillClick}
          onStartLearningClick={handleLearningClick}
          onBack={handleBackToLanding}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
        />
      )}

      {currentPage === "sos"     && page(<SosPage    onBack={handleGoToHome} onHome={handleGoToHome} onProfile={handleProfileClick} onLogout={handleLogout} />)}
      {currentPage === "alert"   && page(<Alert       onBack={handleGoToHome} onHome={handleGoToHome} onProfile={handleProfileClick} onLogout={handleLogout} />)}
      {currentPage === "quiz"    && page(<QuizPage    onBack={handleGoToHome} onGoToHome={handleGoToHome} onProfileClick={handleProfileClick} onLogout={handleLogout} />)}
      {currentPage === "drill"   && page(<DrillGame   onBack={handleGoToHome} onHome={handleGoToHome} onProfile={handleProfileClick} onLogout={handleLogout} />)}
      {currentPage === "modules" && page(<ModulesPage onBack={handleGoToHome} onHome={handleGoToHome} onProfile={handleProfileClick} onLogout={handleLogout} />)}
      {currentPage === "profile" && page(<UserProfile onBack={handleGoToHome} onHome={handleGoToHome} onLogout={handleLogout} />)}
    </div>
  );
}

export default App;