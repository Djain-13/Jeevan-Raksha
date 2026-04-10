import React, { useState, useEffect } from "react";

import "./App.css";
import DisasterMap from './DisasterMap';

// ============================================
// Helper: assign an icon based on disaster type name
// ============================================
function getDisasterIcon(typeName) {
  const t = (typeName || '').toLowerCase();
  if (t.includes('flood')) return '🌊';
  if (t.includes('cyclone') || t.includes('storm') || t.includes('typhoon')) return '🌀';
  if (t.includes('earthquake')) return '🔴';
  if (t.includes('drought')) return '🏜️';
  if (t.includes('heat') || t.includes('cold') || t.includes('wave')) return '🌡️';
  if (t.includes('fire')) return '🔥';
  if (t.includes('land') || t.includes('slide') || t.includes('mud')) return '🏔️';
  if (t.includes('tsunami')) return '🌊';
  if (t.includes('volcano') || t.includes('eruption')) return '🌋';
  if (t.includes('epidemic') || t.includes('pandemic')) return '🦠';
  return '⚠️';
}

// ── Fallback disaster data (module-level constant — stable reference) ──
const FALLBACK_DISASTERS = [
  { id: 'f1',  name: 'India: Floods and Landslides – Jul 2024',          type: 'Flood',            date: '30 July 2024' },
  { id: 'f2',  name: 'India: Wayanad Landslides – Jul 2024',             type: 'Land Slide',       date: '30 July 2024' },
  { id: 'f3',  name: 'India: Cyclone Remal – May 2024',                  type: 'Tropical Cyclone', date: '26 May 2024' },
  { id: 'f4',  name: 'India: Sikkim Flash Flood & GLOF – Oct 2023',      type: 'Flash Flood',      date: '4 October 2023' },
  { id: 'f5',  name: 'India: Cyclone Michaung – Dec 2023',               type: 'Tropical Cyclone', date: '3 December 2023' },
  { id: 'f6',  name: 'India: North India Floods – Jul 2023',             type: 'Flood',            date: '10 July 2023' },
  { id: 'f7',  name: 'India: Cyclone Biparjoy – Jun 2023',               type: 'Tropical Cyclone', date: '15 June 2023' },
  { id: 'f8',  name: 'India: Joshimath Land Subsidence – Jan 2023',      type: 'Land Slide',       date: '7 January 2023' },
  { id: 'f9',  name: 'India: Floods – Assam & Northeast – Jun 2022',    type: 'Flood',            date: '14 June 2022' },
  { id: 'f10', name: 'India: Cyclone Asna – Aug 2024',                   type: 'Tropical Cyclone', date: '31 August 2024' },
  { id: 'f11', name: 'India: Andhra Pradesh & Telangana Floods – Sep 2024', type: 'Flood',         date: '1 September 2024' },
  { id: 'f12', name: 'India: Kerala Floods – Aug 2018',                  type: 'Flood',            date: '8 August 2018' },
].map(d => ({ ...d, icon: getDisasterIcon(d.type) }));

// ============================================
// RecentDisastersSection — Live from ReliefWeb API
// ============================================
const RecentDisastersSection = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchDisasters = async () => {
      // ── Strategy 1: ReliefWeb v2 POST (correct format) ──
      try {
        const body = {
          limit: 50,
          sort: ['date.created:desc'],
          filter: {
            operator: 'AND',
            conditions: [
              { field: 'country', value: 'India' },
            ]
          },
          fields: {
            include: ['name', 'date', 'type', 'status', 'country']
          }
        };

        const res = await fetch(
          'https://api.reliefweb.int/v2/disasters?appname=jeevanraksha',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );

        if (!res.ok) throw new Error(`ReliefWeb v2 responded ${res.status}`);
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          const items = data.data.map(d => {
            const fields = d.fields;
            const typeName = fields.type?.[0]?.name || 'Disaster';
            const dateCreated = fields.date?.created;
            let dateStr = '';
            if (dateCreated) {
              const dt = new Date(dateCreated);
              dateStr = dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
            }
            return {
              id: d.id,
              name: fields.name || 'Unknown Disaster',
              type: typeName,
              icon: getDisasterIcon(typeName),
              date: dateStr,
              status: fields.status || '',
            };
          });
          setDisasters(items);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('ReliefWeb v2 POST failed:', err.message);
      }

      // ── Strategy 2: ReliefWeb v2 GET fallback (no appname required for basic queries) ──
      try {
        const res = await fetch(
          'https://api.reliefweb.int/v2/disasters?appname=jeevanraksha&filter[field]=country&filter[value]=India&sort[]=date.created:desc&limit=50&fields[include][]=name&fields[include][]=date&fields[include][]=type&fields[include][]=status'
        );
        if (!res.ok) throw new Error(`ReliefWeb GET responded ${res.status}`);
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          const items = data.data.map(d => {
            const fields = d.fields;
            const typeName = fields.type?.[0]?.name || 'Disaster';
            const dateCreated = fields.date?.created;
            let dateStr = '';
            if (dateCreated) {
              const dt = new Date(dateCreated);
              dateStr = dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
            }
            return {
              id: d.id,
              name: fields.name || 'Unknown Disaster',
              type: typeName,
              icon: getDisasterIcon(typeName),
              date: dateStr,
              status: fields.status || '',
            };
          });
          setDisasters(items);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('ReliefWeb v2 GET also failed:', err.message);
      }

      // ── Strategy 3: Use updated fallback ──
      setDisasters(FALLBACK_DISASTERS);
      setLoading(false);
    };

    fetchDisasters();
  }, []); // FALLBACK_DISASTERS is a stable module-level constant


  return (
    <section className="recent-disasters-section" id="recent-disasters">
      <div className="container">
        <h2 className="section-title">Recent Disasters in India</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <div style={{
              width: 36, height: 36, border: '3px solid rgba(59,130,246,0.15)',
              borderTop: '3px solid #3b82f6', borderRadius: '50%',
              animation: 'spin 1s linear infinite', margin: '0 auto 12px',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Loading recent disasters...
          </div>
        ) : disasters.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px 0' }}>No recent disaster data available.</p>
        ) : (
          <>
            <div style={{ textAlign: 'right', marginBottom: '12px', fontSize: '0.82rem', color: '#64748b' }}>
              Showing {Math.min(visibleCount, disasters.length)} of {disasters.length} events
            </div>
            <div className="disasters-grid" style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '10px' }}>
              {disasters.slice(0, visibleCount).map(d => (
                <div
                  key={d.id}
                  className="disaster-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', minWidth: '380px', flexShrink: 0 }}
                >
                  <div className="disaster-icon">{d.icon}</div>
                  <div className="disaster-info" style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', lineHeight: 1.3 }}>{d.name}</h3>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: 'rgba(59,130,246,0.08)', color: '#2563eb',
                        padding: '2px 10px', borderRadius: '12px', fontWeight: 600, fontSize: '0.75rem',
                      }}>{d.type}</span>
                      {d.date && <span style={{ color: 'var(--text-muted)' }}>{d.date}</span>}
                      {d.status && (
                        <span style={{
                          background: d.status === 'ongoing' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
                          color: d.status === 'ongoing' ? '#dc2626' : '#16a34a',
                          padding: '2px 8px', borderRadius: '10px', fontWeight: 600, fontSize: '0.72rem',
                          textTransform: 'capitalize',
                        }}>{d.status}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {visibleCount < disasters.length && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setVisibleCount(v => v + 6)}
                  style={{
                    padding: '10px 28px', background: 'rgba(59,130,246,0.08)',
                    color: '#2563eb', border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseOver={e => e.target.style.background = 'rgba(59,130,246,0.15)'}
                  onMouseOut={e => e.target.style.background = 'rgba(59,130,246,0.08)'}
                >
                  Load More ({disasters.length - visibleCount} remaining) ↓
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const apiKey = 'f6271a621dc735d99c8f04f81f85b9cb';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString(undefined, options));
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const fetchWeatherByCoords = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) {
          setWeather(data);
        }
      } catch (err) {
        console.warn('Weather fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchWeatherByCity = async (city = 'New Delhi') => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) setWeather(data);
      } catch (err) {
        console.warn('Weather fetch by city failed:', err);
      } finally {
        setLoading(false);
      }
    };

    // Try geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeatherByCity('New Delhi'), // fallback if denied
        { timeout: 8000 }
      );
    } else {
      fetchWeatherByCity('New Delhi');
    }
  }, []);



  const getWeatherIcon = (iconCode) => {
    const icons = {
      '01d': '☀', '02d': '⛅', '03d': '☁', '04d': '☁',
      '09d': '🌧', '10d': '🌦', '11d': '⛈', '13d': '❄',
      '50d': '🌫', '01n': '🌙', '02n': '☁'
    };
    return icons[iconCode] || '☁';
  };

  return (
    <div style={{
      width: '550px',
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      border: '1px solid var(--glass-border)',
      margin: '0 0 20px 150px'
    }}>
      <div style={{ textAlign: 'left', marginBottom: '12px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '12px', marginBottom: '4px' }}>{currentDate}</div>
        <div style={{ fontSize: '11px' }}>{currentTime}</div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '30px', fontSize: '14px' }}>Loading weather...</div>
      ) : weather ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-main)' }}>
            {weather.name}, {weather.sys.country}
          </div>
          <div style={{ fontSize: '48px', margin: '12px 0' }}>
            {getWeatherIcon(weather.weather[0].icon)}
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-main)' }}>
            {Math.round(weather.main.temp)}°C
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'capitalize', marginBottom: '16px' }}>
            {weather.weather[0].description}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>{weather.main.humidity}%</div>
              <div>Humidity</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>{weather.wind.speed} m/s</div>
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Weather unavailable</div>
      )}
    </div>
  );
};

function LandingPage({ onLoginClick, onHelplineClick, onRegisterClick, onSosClick, onAlertClick, onStartLearningClick, isLoggedIn, onGoToHome, onLogout }) {
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('jeevanraksha_theme') === 'dark';
  });

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('jeevanraksha_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('jeevanraksha_theme', 'light');
    }
  }, [darkMode]);


  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo">JEEVAN RAKSHA</div>
        <div className="nav-right">
          <div className="nav-buttons">
            <button className="nav-btn" onClick={onHelplineClick}>Helpline Contacts</button>
            <button className="floating-sos-btn" title="Emergency SOS" onClick={onSosClick}><span>SOS</span></button>
            {isLoggedIn ? (
              <>
                <button className="login-btn-nav" onClick={onGoToHome}>Dashboard</button>
                <button className="register-btn" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="login-btn-nav" onClick={onLoginClick}>Log In</button>
                <button className="register-btn" onClick={onRegisterClick}>Register</button>
              </>
            )}
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(d => !d)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '10px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1,
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
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
            <button className="start-btn-hero" onClick={onStartLearningClick || onRegisterClick}>Start Learning Now 🚀</button>
          </div>
          <WeatherWidget />

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
            <h2> Risk Map </h2>
          </center>
          <div className="map-container">
            <DisasterMap />
          </div>
        </div>
      </section>

      {/* Recent Disasters Section — Live from ReliefWeb API */}
      <RecentDisastersSection />

      {/* Safety Steps Section */}
      <section className="safety-section" id="safety">
        <h2 className="fancy-title">Stay Safe. Every Step.</h2>
        <p className="subtitle">Stay safe before, during, and after any disaster</p>

        <div className="safety-flex">
          {/* Before */}
          <div className="safety-card fancy">
            <h3>
              <span className="card-icon">
                <i className="fa-regular fa-clock" style={{ color: "#888a8c" }}></i>
              </span> Before a Disaster
            </h3>
            <div className="icon-grid">
              <div className="icon-item glow">
                <span><i className="fa-solid fa-list-check" style={{ color: "#888a8c" }}></i></span>
                <p>Plan</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-kit-medical" style={{ color: "#888a8c" }}></i></span>
                <p>Emergency Kit</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-boxes-stacked" style={{ color: "#888a8c" }}></i></span>
                <p>Stock Supplies</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-phone-volume" style={{ color: "#888a8c" }}></i></span>
                <p>Know Helplines</p>
              </div>
            </div>
          </div>
          {/* During */}
          <div className="safety-card fancy">
            <h3>
              <span className="card-icon">
                <i className="fa-solid fa-triangle-exclamation" style={{ color: "#888a8c" }}></i>
              </span> During a Disaster
            </h3>
            <div className="icon-grid">
              <div className="icon-item glow">
                <span><i className="fa-solid fa-brain" style={{ color: "#888a8c" }}></i></span>
                <p>Stay Calm</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-shield-halved" style={{ color: "#888a8c" }}></i></span>
                <p>Protect Yourself</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-bullhorn" style={{ color: "#888a8c" }}></i></span>
                <p>Alert Others</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-person-walking" style={{ color: "#888a8c" }}></i></span>
                <p>Move to Safety</p>
              </div>
            </div>
          </div>
          {/* After */}
          <div className="safety-card fancy">
            <h3>
              <span className="card-icon">
                <i className="fa-solid fa-phone" style={{ color: "#888a8c" }}></i>
              </span> After a Disaster
            </h3>
            <div className="icon-grid">
              <div className="icon-item glow">
                <span><i className="fa-solid fa-user-nurse" style={{ color: "#888a8c" }}></i></span>
                <p>Check Injuries</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-phone" style={{ color: "#888a8c" }}></i></span>
                <p>Reports Incidents</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-hand-holding-heart" style={{ color: "#888a8c" }}></i></span>
                <p>Care for Victims</p>
              </div>
              <div className="icon-item glow">
                <span><i className="fa-solid fa-satellite-dish" style={{ color: "#888a8c" }}></i></span>
                <p>Stay Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Sticky floating alert button — sticks within landing page scroll */}
      <div className="floating-alert-anchor">
        <button
          className="floating-alert-btn"
          title="Live Disaster Alerts"
          onClick={onAlertClick}
        >
          <i className="fa-solid fa-bullhorn"></i>
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Jeevan Raksha. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;