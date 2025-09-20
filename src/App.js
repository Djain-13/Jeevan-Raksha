import React, { useState } from "react";
import LandingPage from "./landingpage";
import LoginPage from "./login";
import HelplineContacts from "./HelplineContacts"; // ✅ import helpline page

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

  return (
    <div>
      {currentPage === "landing" && (<LandingPage onLoginClick={handleLoginClick}onHelplineClick={handleHelplineClick}/>)}
      {currentPage === "login" && (<LoginPage onBack={handleBackToLanding}/>)}
      
      {currentPage === "helplines" && (
        <HelplineContacts onBack={handleBackToLanding} />
      )}
    </div>
  );
}

export default App;
