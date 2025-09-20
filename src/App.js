import React, { useState } from "react";
import LandingPage from "./landingpage";
import LoginPage from "./login";
import HelplineContacts from "./HelplineContacts"; 
import Register from "./Register";
import HomePage from "./HomePage";
import SosPage from "./SosPage";  // 👈 new import
import Alert from "./Alert"; // <-- add this



function App() {
  const [currentPage, setCurrentPage] = useState("landing"); // default page

  const handleLoginClick = () => {
    setCurrentPage("login"); // switch to login page
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  const handleHelplineClick = () => {
    setCurrentPage("helplines"); // switch to helpline page
  };

  const handleRegisterClick=()=>setCurrentPage("register");
  const handleGoToHome=()=>setCurrentPage("home");
  const handleSosClick = () => setCurrentPage("sos"); // 👈 new
  const handleAlertClick = () => setCurrentPage("alert"); // <-- new

  return (
    <div>
      {currentPage === "landing" && (<LandingPage onLoginClick={handleLoginClick}onHelplineClick={handleHelplineClick}
      onRegisterClick={handleRegisterClick}
      onSosClick={handleSosClick}
       onAlertClick={handleAlertClick}  // <-- pass handler to landing page
      />)}

      {currentPage === "login" && (<LoginPage onBack={handleBackToLanding} onRegisterClick={handleRegisterClick}
      onLoginSuccess={handleGoToHome}
      />)}
      
      {currentPage === "helplines" && (
        <HelplineContacts onBack={handleBackToLanding} />
      )}

       {currentPage === "register" && (
        <Register onBack={handleBackToLanding} onLoginClick={handleLoginClick} />
      )}

      {currentPage === "home" && <HomePage/>}

      {currentPage === "sos" && <SosPage onBack={handleBackToLanding} />} {/* 👈 SOS page */}
      {currentPage === "alert" && <Alert onBack={handleBackToLanding} />} 
    </div>
  );
}

export default App;
