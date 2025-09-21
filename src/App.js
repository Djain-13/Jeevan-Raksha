import React, { useState } from "react";
import LandingPage from "./landingpage";
import LoginPage from "./login";
import HelplineContacts from "./HelplineContacts";
import Register from "./Register";
import HomePage from "./HomePage";
import QuizPage from "./quiz_main"; // Component for the quiz
import SosPage from "./SosPage";
import Alert from "./Alert";
import DrillGame from "./drill";   // ⬅ import your drill page
import ModulesPage from "./Module"; // ⬅ import your learning modules page



function App() {
  // State to manage which page is currently displayed
  const [currentPage, setCurrentPage] = useState("landing");

  // --- Navigation Handlers ---
  const handleLoginClick = () => setCurrentPage("login");
  const handleBackToLanding = () => setCurrentPage("landing");
  const handleHelplineClick = () => setCurrentPage("helplines");
  const handleRegisterClick = () => setCurrentPage("register");
  const handleGoToHome = () => setCurrentPage("home");
  const handleSosClick = () => setCurrentPage("sos");
  const handleAlertClick = () => setCurrentPage("alert");
  // Handler to switch to the quiz page
  const handleQuizClick = () => setCurrentPage("quiz");
  const handleDrillClick = () => setCurrentPage("drill"); 
  const handleLearningClick = () => setCurrentPage("modules");   // ⬅ NEW
  

  return (
    <div>
      {/* --- Conditional Rendering Based on State --- */}

      {currentPage === "landing" && (
        <LandingPage
          onLoginClick={handleLoginClick}
          onHelplineClick={handleHelplineClick}
          onRegisterClick={handleRegisterClick}
          onSosClick={handleSosClick}
          onAlertClick={handleAlertClick}
          onStartLearningClick={handleLoginClick}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          onBack={handleBackToLanding}
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleGoToHome}
        />
      )}

      {currentPage === "helplines" && (
        <HelplineContacts onBack={handleBackToLanding} />
      )}

      {currentPage === "register" && (
        <Register onBack={handleBackToLanding} onLoginClick={handleLoginClick} />
      )}

      {/* Pass the quiz handler to the home page */}
      {currentPage === "home" && (
        <HomePage
          onQuizClick={handleQuizClick}
          onDrillClick={handleDrillClick}
          onStartLearningClick={handleLearningClick}
          onBack={handleBackToLanding}
        />
      )}

      {currentPage === "sos" && <SosPage onBack={handleBackToLanding} />}
      
      {currentPage === "alert" && <Alert onBack={handleBackToLanding} />}

      {/* Render the quiz page when its state is active */}
      {currentPage === "quiz" && <QuizPage onBack={handleGoToHome} />}
      {currentPage === "drill" && <DrillGame onBack={handleGoToHome} />} 
      {currentPage === "modules" && <ModulesPage  onBack={handleGoToHome}/>}
      
    </div>
  );
}

export default App;