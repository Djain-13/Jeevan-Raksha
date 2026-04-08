import React, { useState } from "react";
import {
  FaPhoneAlt, FaFireExtinguisher, FaAmbulance, FaShieldAlt,
  FaHandsHelping, FaSearch, FaMapMarkerAlt,
} from "react-icons/fa";
import "./HelplineContacts.css";
import InternalNav from './InternalNav';

// ─── Data ──────────────────────────────────────────────────────────────────
const NATIONAL_CONTACTS = [
  { name: "National Emergency Number", number: "112", icon: <FaPhoneAlt />, category: "national" },
  { name: "Police", number: "100", icon: <FaShieldAlt />, category: "national" },
  { name: "Fire", number: "101", icon: <FaFireExtinguisher />, category: "national" },
  { name: "Ambulance", number: "102", icon: <FaAmbulance />, category: "national" },
  { name: "Disaster Management Services", number: "108", icon: <FaHandsHelping />, category: "national" },
  { name: "NDMA Control Room", number: "1078 / 011-26701700", icon: <FaHandsHelping />, category: "national" },
  { name: "NDRF Headquarters", number: "011-24363260", icon: <FaHandsHelping />, category: "national" },
  { name: "Air Ambulance", number: "9540161344", icon: <FaAmbulance />, category: "national" },
  { name: "Senior Citizen Helpline", number: "14567", icon: <FaPhoneAlt />, category: "national" },
  { name: "Women Helpline", number: "1091", icon: <FaPhoneAlt />, category: "national" },
  { name: "Child Helpline", number: "1098", icon: <FaPhoneAlt />, category: "national" },
];

const STATE_CONTACTS = [
  { state: "Andhra Pradesh", sdma: "0863-2340340", police: "100", fire: "101" },
  { state: "Arunachal Pradesh", sdma: "0360-2292273", police: "100", fire: "101" },
  { state: "Assam", sdma: "0361-2237219", police: "100", fire: "101" },
  { state: "Bihar", sdma: "0612-2294204", police: "100", fire: "101" },
  { state: "Chhattisgarh", sdma: "0771-2443796", police: "100", fire: "101" },
  { state: "Goa", sdma: "0832-2419550", police: "100", fire: "101" },
  { state: "Gujarat", sdma: "079-23251900", police: "100", fire: "101" },
  { state: "Haryana", sdma: "0172-2560750", police: "100", fire: "101" },
  { state: "Himachal Pradesh", sdma: "0177-2624060", police: "100", fire: "101" },
  { state: "Jammu & Kashmir", sdma: "0191-2566201", police: "100", fire: "101" },
  { state: "Jharkhand", sdma: "0651-2490128", police: "100", fire: "101" },
  { state: "Karnataka", sdma: "080-22340676", police: "100", fire: "101" },
  { state: "Kerala", sdma: "0471-2364424", police: "100", fire: "101" },
  { state: "Madhya Pradesh", sdma: "0755-2441520", police: "100", fire: "101" },
  { state: "Maharashtra", sdma: "022-22025001", police: "100", fire: "101" },
  { state: "Manipur", sdma: "0385-2450137", police: "100", fire: "101" },
  { state: "Meghalaya", sdma: "0364-2502873", police: "100", fire: "101" },
  { state: "Mizoram", sdma: "0389-2315528", police: "100", fire: "101" },
  { state: "Nagaland", sdma: "0370-2271355", police: "100", fire: "101" },
  { state: "Odisha", sdma: "0674-2534177", police: "100", fire: "101" },
  { state: "Punjab", sdma: "0172-2740610", police: "100", fire: "101" },
  { state: "Rajasthan", sdma: "0141-2227805", police: "100", fire: "101" },
  { state: "Sikkim", sdma: "03592-202090", police: "100", fire: "101" },
  { state: "Tamil Nadu", sdma: "044-28524500", police: "100", fire: "101" },
  { state: "Telangana", sdma: "040-23450226", police: "100", fire: "101" },
  { state: "Tripura", sdma: "0381-2315879", police: "100", fire: "101" },
  { state: "Uttar Pradesh", sdma: "0522-2236919", police: "100", fire: "101" },
  { state: "Uttarakhand", sdma: "0135-2710334", police: "100", fire: "101" },
  { state: "West Bengal", sdma: "033-22143526", police: "100", fire: "101" },
  { state: "Delhi", sdma: "011-23438252", police: "100", fire: "101" },
];

const HelplineContacts = ({ onBack, onHome, onProfile, onLogout }) => {
  const [tab, setTab] = useState("national"); // "national" | "state"
  const [search, setSearch] = useState("");

  const filteredStates = STATE_CONTACTS.filter(s =>
    s.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="helpline-page-container">
      <InternalNav title="Emergency Helplines" onBack={onBack} onHome={onHome} onProfile={onProfile} onLogout={onLogout} />
      <header className="helpline-header" style={{ paddingTop: '20px' }}>
        <h1 className="helpline-title">Emergency Helplines</h1>
        <p className="helpline-subtitle">
          Quick access to national and state emergency numbers — stay safe, stay prepared.
        </p>
      </header>

      {/* Tab switcher */}
      <div style={{
        display: 'flex', gap: '12px', justifyContent: 'center',
        padding: '0 20px 24px', maxWidth: '900px', margin: '0 auto',
      }}>
        {["national", "state"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 28px', borderRadius: '12px', border: 'none',
              fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
              transition: 'all 0.2s',
              background: tab === t ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'rgba(255,255,255,0.8)',
              color: tab === t ? '#fff' : '#64748b',
              boxShadow: tab === t ? '0 4px 15px rgba(59,130,246,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {t === "national" ? "🇮🇳 National Helplines" : "🗺️ State-wise Helplines"}
          </button>
        ))}
      </div>

      <main className="helpline-main">
        {tab === "national" ? (
          <div className="contacts-grid">
            {NATIONAL_CONTACTS.map((contact, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon">{contact.icon}</div>
                <div className="contact-content">
                  <div className="contact-name">{contact.name}</div>
                  <a href={`tel:${contact.number.replace(/[^0-9]/g, "")}`} className="contact-number">
                    {contact.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '14px', padding: '12px 18px', marginBottom: '24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}>
              <FaSearch style={{ color: '#94a3b8', flexShrink: 0 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search state (e.g. Kerala, Gujarat...)"
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: '0.95rem', color: '#0f172a', width: '100%',
                }}
              />
            </div>

            {/* State cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {filteredStates.map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '16px', padding: '20px 22px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <FaMapMarkerAlt style={{ color: '#3b82f6', fontSize: '1rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{s.state}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                    {[
                      { label: "SDMA", number: s.sdma, color: '#ea580c' },
                      { label: "Police", number: s.police, color: '#1d4ed8' },
                      { label: "Fire", number: s.fire, color: '#dc2626' },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontWeight: 500 }}>{item.label}</span>
                        <a
                          href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                          style={{ color: item.color, fontWeight: 700, textDecoration: 'none', fontSize: '0.92rem' }}
                        >
                          📞 {item.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {filteredStates.length === 0 && (
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                No state found for "{search}"
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HelplineContacts;