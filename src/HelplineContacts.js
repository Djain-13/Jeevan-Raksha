import React from "react";
import {
  FaPhoneAlt,
  FaFireExtinguisher,
  FaAmbulance,
  FaShieldAlt,
  FaHandsHelping,
} from "react-icons/fa";
import "./HelplineContacts.css";

const App = () => {
  const contacts = [
    { name: "NATIONAL EMERGENCY NUMBER", number: "112", icon: <FaPhoneAlt /> },
    { name: "POLICE", number: "100 or 112", icon: <FaShieldAlt /> },
    { name: "FIRE", number: "101", icon: <FaFireExtinguisher /> },
    { name: "AMBULANCE", number: "102", icon: <FaAmbulance /> },
    {
      name: "Disaster Management Services",
      number: "108",
      icon: <FaHandsHelping />,
    },
    { name: "Air Ambulance", number: "9540161344", icon: <FaAmbulance /> },
    {
      name: "Disaster Management (N.D.M.A)",
      number: "1078, 011-26701700",
      icon: <FaHandsHelping />,
    },
    {
      name: "EARTHQUAKE / FLOOD / DISASTER (N.D.R.F Headquarters)",
      number: "011-24363260, 9711077372",
      icon: <FaHandsHelping />,
    },
    { name: "Senior Citizen Helpline", number: "14567", icon: <FaPhoneAlt /> },
  ];

  return (
    <div className="helpline-container">
      <div className="helpline-card">
        <h1 className="helpline-title"> Emergency Helplines</h1>
        <p className="helpline-subtitle">
          Quick access to essential emergency numbers — stay safe, stay
          prepared.
        </p>

        <div className="contacts-grid">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-item">
              <div className="contact-icon">{contact.icon}</div>
              <div className="contact-name">{contact.name}</div>
              <a
                href={`tel:${contact.number.replace(/[^0-9,]/g, "")}`}
                className="contact-number"
              >
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
