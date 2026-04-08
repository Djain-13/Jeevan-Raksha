import React, { useState, useEffect } from "react";
import "./Module.css";
import InternalNav from './InternalNav';

function ModulesPages({ onBack, onHome, onProfile, onLogout }) {
  const [activeDisaster, setActiveDisaster] = useState("earthquake");
  const [activeTab, setActiveTab] = useState("prepare");

  // Progress tracking via localStorage
  const STORAGE_KEY = 'jeevanraksha_module_progress';
  const [visited, setVisited] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  // Mark current disaster+tab as visited on every change
  useEffect(() => {
    setVisited(prev => {
      const key = `${activeDisaster}_${activeTab}`;
      if (prev[key]) return prev; // already visited, no update needed
      const next = { ...prev, [key]: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, [activeDisaster, activeTab]);

  const TOTAL_SECTIONS = 4 * 4; // 4 disasters Ã— 4 tabs
  const visitedCount = Object.keys(visited).length;
  const progressPct = Math.round((visitedCount / TOTAL_SECTIONS) * 100);

  // Is an entire disaster (all 4 tabs) complete?
  const isDisasterComplete = (disasterId) => {
    const tabIds = ["prepare", "during", "after", "resources"];
    return tabIds.every(t => visited[`${disasterId}_${t}`]);
  };

  const disasters = [
    {
      id: "earthquake",
      name: "Earthquakes",
      icon: "fas fa-exclamation-triangle",
    },
    { id: "drought", name: "Drought", icon: "fas fa-sun" },
    { id: "flood", name: "Flood", icon: "fas fa-water" },
    { id: "wildfire", name: "Wildfire", icon: "fas fa-fire" },
  ];

  const tabs = [
    { id: "prepare", name: "Prepare Before" },
    { id: "during", name: "Stay Safe During" },
    { id: "after", name: "Stay Safe After" },
    { id: "resources", name: "Additional Resources" },
  ];

  const handleDisasterChange = (disasterId) => {
    setActiveDisaster(disasterId);
    setActiveTab("prepare");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(`${activeDisaster}-${tabId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <InternalNav title="Learning Modules" onBack={onBack} onHome={onHome} onProfile={onProfile} onLogout={onLogout} />
      <div className="modules-container">
      {/* Sidebar */}
      <div className="modules-sidebar">
        <div className="modules-sidebar-header">
          <h2>Disaster Preparedness</h2>
          {/* Progress bar */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '5px' }}>
              <span>Your Progress</span>
              <span style={{ fontWeight: 700, color: progressPct === 100 ? '#16a34a' : '#3b82f6' }}>{progressPct}%</span>
            </div>
            <div style={{ height: '6px', borderRadius: '10px', background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{
                width: `${progressPct}%`, height: '100%', borderRadius: '10px',
                background: progressPct === 100 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : 'linear-gradient(90deg,#3b82f6,#06b6d4)',
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        </div>
        <ul className="modules-disaster-menu">
          {disasters.map((disaster) => (
            <li
              key={disaster.id}
              className={activeDisaster === disaster.id ? "active" : ""}
              onClick={() => handleDisasterChange(disaster.id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span><i className={disaster.icon}></i> {disaster.name}</span>
              {isDisasterComplete(disaster.id) && (
                <span style={{ color: '#16a34a', fontSize: '0.85rem', marginLeft: 'auto' }}>âœ“</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="modules-main-content">
        {/* Header with image */}
        <div className="modules-header">
          <h1>Disaster Preparedness Hub</h1>
          <p>
            Your comprehensive guide to staying safe before, during, and after
            natural disasters
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="modules-nav-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`modules-nav-tab ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
            </div>
          ))}
        </div>

        {/* Content Sections */}
        {activeDisaster === "earthquake" && (
          <EarthquakeContent activeTab={activeTab} />
        )}
        {activeDisaster === "drought" && (
          <DroughtContent activeTab={activeTab} />
        )}
        {activeDisaster === "flood" && <FloodContent activeTab={activeTab} />}
        {activeDisaster === "wildfire" && (
          <WildfireContent activeTab={activeTab} />
        )}
      </div>
    </div>
  </div>
  );
}

// Component for Earthquake Content
const EarthquakeContent = ({ activeTab }) => {
  return (
    <div id="earthquake-content" className="earthquake-content-section">
      {/* Prepare Before Section */}
      <div id="earthquake-prepare" className="earthquake-content-section">
        <span className="earthquake-section-indicator" id="prepare"></span>
        <h2 className="earthquake-section-title">
          <i className="fas fa-clipboard-list"></i> Prepare Before an Earthquake
        </h2>

        {/* YouTube Video */}
        <div className="earthquake-video-container">
          <div className="earthquake-video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/BLEPakj1YTY"
              title="Earthquake Preparedness Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <p>
          <strong>
            The best time to prepare for any disaster is before it happens.
          </strong>
        </p>

        <div className="earthquake-component-section">
          <h3 className="earthquake-component-title">
            Understanding Earthquake
          </h3>
          <div className="earthquake-info">
            <h2 style={{ color: "rgb(0,121,158)" }}>Earthquakes</h2>
            <p>
              <strong>Definition:</strong> Sudden shaking of the ground due to
              tectonic movement.
            </p>

            <h3 style={{ color: "rgb(0,121,158)" }}>Causes</h3>
            <ul>
              <li>Movement of Earth's tectonic plates.</li>
              <li>Stress release along geological faults.</li>
              <li>Volcanic activity.</li>
              <li>Human activities (mining, deep drilling, large dams).</li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Effects</h3>
            <ul>
              <li>Ground shaking collapses buildings, roads, and bridges.</li>
              <li>Can trigger landslides, tsunamis, and fires.</li>
              <li>Thousands of lives can be lost in strong quakes.</li>
              <li>Economic destruction and long recovery periods.</li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Why They Occur</h3>
            <p>
              Earth's crust is divided into plates that constantly move. Stress
              builds up at boundaries and is released suddenly as seismic waves.
            </p>

            <h3 style={{ color: "rgb(0,121,158)" }}>Additional Notes</h3>
            <ul>
              <li>
                Mostly occur in seismic zones like the "Pacific Ring of Fire."
              </li>
              <li>
                Hard to predict, but earthquake-resistant construction reduces
                damage.
              </li>
            </ul>
          </div>

          <div className="earthquake-steps-container">
            <div className="earthquake-step-card">
              <h4>Secure Your Space</h4>
              <p>
                Identify hazards and secure movable items to reduce damage and
                risk of injury.
              </p>
              <ul>
                <li>Anchor heavy furniture</li>
                <li>Secure appliances</li>
                <li>Fasten water heater to wall</li>
              </ul>
            </div>

            <div className="earthquake-step-card">
              <h4>Plan to be Safe</h4>
              <p>
                Create a family emergency communications plan and have a shelter
                plan.
              </p>
              <ul>
                <li>Create emergency plan</li>
                <li>Identify safe spots in each room</li>
                <li>Practice drop, cover, hold on</li>
              </ul>
            </div>
          </div>

          <div className="earthquake-step-card">
            <h4>Organize Disaster Supplies</h4>
            <p>
              Have emergency supplies ready at home, at work, and in your
              vehicle.
            </p>
            <ul>
              <li>Water (1 gallon per person per day)</li>
              <li>Non-perishable food</li>
              <li>First aid kit and medications</li>
              <li>Flashlight and extra batteries</li>
            </ul>
          </div>
        </div>

        <div className="earthquake-info-grid">
          <div className="earthquake-info-card">
            <div className="earthquake-card-img">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.1otJ1f1JJS8yopuaHfxEPAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Family making an emergency plan with a kit ready."
              />
            </div>
            <div className="earthquake-card-content">
              <h3>Make an Emergency Plan</h3>
              <p>
                Create a family emergency communications plan that has an
                out-of-state contact. Plan where to meet if you get separated.
              </p>
              <ul>
                <li>Make a supply kit with food and water for several days</li>
                <li>Include a flashlight, fire extinguisher, and whistle</li>
                <li>Ensure everyone knows the plan</li>
              </ul>
            </div>
          </div>

          <div className="earthquake-info-card">
            <div className="earthquake-card-img">
              <img
                src="https://blog.strongtie.com/wp-content/uploads/2018/01/earthquake-featured.jpg"
                alt="Secure Home"
              />
            </div>
            <div className="earthquake-card-content">
              <h3>Protect Your Home</h3>
              <p>
                Secure heavy items in your home to prevent injuries and damage
                during earthquakes.
              </p>
              <ul>
                <li>Secure bookcases, refrigerators, and water heaters</li>
                <li>Fasten televisions and objects that hang on walls</li>
                <li>Store heavy objects on low shelves</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Earthquake Statistics */}
        <div className="earthquake-component-section">
          <h3 className="earthquake-component-title">
            Earthquake Facts & Statistics
          </h3>
          <div className="earthquake-stats-container">
            <div className="earthquake-stat-box">
              <div className="earthquake-stat-number">500,000</div>
              <p>Detectable earthquakes occur annually worldwide</p>
            </div>
            <div className="earthquake-stat-box">
              <div className="earthquake-stat-number">100</div>
              <p>Earthquakes cause damage each year</p>
            </div>
            <div className="earthquake-stat-box">
              <div className="earthquake-stat-number">20</div>
              <p>Major earthquakes (M7.0+) occur each year</p>
            </div>
          </div>
        </div>
      </div>

      {/* During an Earthquake Section */}
      <div id="earthquake-during" className="earthquake-content-section">
        <span className="earthquake-section-indicator" id="during"></span>
        <h2 className="earthquake-section-title">
          <i className="fas fa-exclamation-circle"></i> During an Earthquake
        </h2>

        <div className="earthquake-component-section">
          <p>
            Knowing what to do during an earthquake can help prevent injuries
          </p>

          <div className="earthquake-steps-container">
            <div className="earthquake-step-card">
              <h4>1. If You Are Inside</h4>
              <p>
                Stay inside. Do not run outside or stay in doorways. Move away
                from windows, hanging objects, and tall furniture that could
                fall.
              </p>
            </div>

            <div className="earthquake-step-card">
              <h4>2. If You Are in Bed</h4>
              <p>
                Turn face down and cover your head and neck with a pillow. Hold
                on to your head and neck until the shaking stops.
              </p>
            </div>
          </div>

          <div className="earthquake-steps-container">
            <div className="earthquake-step-card">
              <h4>3. If You Are Outside</h4>
              <p>
                Move to an open area away from buildings, trees, streetlights,
                and power lines. Drop and cover until shaking stops.
              </p>
            </div>

            <div className="earthquake-step-card">
              <h4>4. If You Are in a Vehicle</h4>
              <p>
                Pull over and stop. Set your parking brake. Avoid overpasses,
                bridges, power lines, and signs.
              </p>
            </div>
          </div>

          {/* Emergency Contact Info */}
          <div className="earthquake-emergency-contact">
            <h3>
              <i className="fas fa-phone-alt"></i> Emergency Contacts
            </h3>
            <p>
              <strong>Local Emergency Services:</strong> 911 (or your local
              emergency number)
            </p>
            <p>
              <strong>American Red Cross:</strong> 1-800-RED-CROSS
            </p>
            <p>
              <strong>FEMA Helpline:</strong> 1-800-621-FEMA (3362)
            </p>
          </div>
        </div>
      </div>

      {/* After an Earthquake Section */}
      <div id="earthquake-after" className="earthquake-content-section">
        <span className="earthquake-section-indicator" id="after"></span>
        <h2 className="earthquake-section-title">
          <i className="fas fa-first-aid"></i> After an Earthquake
        </h2>

        <div className="earthquake-component-section">
          <h3 className="earthquake-component-title">After an Earthquake</h3>
          <p>What to do once the shaking stops to ensure your safety</p>

          <div className="earthquake-alert-box">
            <h3>If you are a disaster survivor, please visit FEMA.gov</h3>
            <p>
              For up-to-date information on current disaster declarations and
              assistance applications
            </p>
            <p>
              <strong>Call: (800) 621-3362</strong>
            </p>
          </div>

          <div className="earthquake-steps-container">
            <div className="earthquake-step-card">
              <h4>Expect Aftershocks</h4>
              <p>
                After an earthquake, be aware that aftershocks may follow and
                can cause additional damage.
              </p>
              <ul>
                <li>Be ready to Drop, Cover, and Hold On</li>
                <li>Aftershocks can happen for weeks after</li>
                <li>Check for new structural damage after each one</li>
              </ul>
            </div>

            <div className="earthquake-step-card">
              <h4>Check for Damage</h4>
              <p>
                Inspect your home for damage and gas leaks. If you smell gas,
                evacuate immediately.
              </p>
              <ul>
                <li>Check for gas leaks</li>
                <li>Look for electrical system damage</li>
                <li>Inspect water and sewage lines</li>
                <li>Check for building damage</li>
              </ul>
            </div>
          </div>

          <div className="earthquake-step-card">
            <h4>Provide First Aid</h4>
            <p>
              Check yourself and others for injuries. Provide first aid for
              anyone who needs it.
            </p>
            <ul>
              <li>Treat minor injuries</li>
              <li>Seek help for serious injuries</li>
              <li>Help others if you have training</li>
            </ul>
          </div>

          {/* Recovery Checklist */}
          <div className="earthquake-checklist">
            <h3 className="earthquake-component-title">
              Post-Earthquake Recovery Checklist
            </h3>
            <div className="earthquake-checklist-item">
              <div className="earthquake-checklist-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h4>Check for Injuries</h4>
                <p>
                  Provide first aid to those in need. Do not move seriously
                  injured people unless they are in immediate danger.
                </p>
              </div>
            </div>
            <div className="earthquake-checklist-item">
              <div className="earthquake-checklist-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h4>Inspect Utilities</h4>
                <p>
                  Check for gas leaks, electrical system damage, and sewage and
                  water line damage.
                </p>
              </div>
            </div>
            <div className="earthquake-checklist-item">
              <div className="earthquake-checklist-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h4>Clean Up Spills</h4>
                <p>
                  Clean up spilled medicines, bleaches, gasoline, or other
                  flammable liquids immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources Section */}
      <div id="earthquake-resources" className="earthquake-content-section">
        <span className="earthquake-section-indicator" id="resources"></span>
        <h2 className="earthquake-section-title">
          <i className="fas fa-book"></i> Additional Resources
        </h2>

        <div className="earthquake-component-section">
          <h3 className="earthquake-component-title">
            Educational materials and tools to help you prepare for earthquakes
          </h3>

          <div className="earthquake-resource-grid">
            <div className="earthquake-resource-card">
              <h4>Videos</h4>
              <ul>
                <li>
                  <a
                    href="https://www.king5.com/video/tech/science/environment/when-the-earth-shakes-environment-northwest-earthquake-special/281-91d90d04-00b3-4178-97ea-a878f5a9cac2?utm_source=chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    When the Earth Shakes
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=sqiV-fWRXQ8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Earthquake Preparedness: How to Stay Safe
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=a3VJb3O_0BE"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Earthquake Safety Video Series
                  </a>
                </li>
              </ul>
            </div>

            <div className="earthquake-resource-card">
              <h4>Social Media and Graphics</h4>
              <ul>
                <li>
                  <a
                    href="https://www.cdc.gov/earthquakes/safety/stay-safe-during-an-earthquake.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CDC â€“ Safety Guidelines During an Earthquake
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ready.gov/earthquakes-social-media-toolkit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ready.gov â€“ Earthquake Social Media Toolkit
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.usgs.gov/index.php/media/images/earthquake-social-media"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USGS â€“ Earthquake Social Media Graphics
                  </a>
                </li>
              </ul>
            </div>

            <div className="earthquake-resource-card">
              <h4>Tip Sheets</h4>
              <ul>
                <li>
                  <a
                    href="https://www.cdc.gov/earthquakes/safety/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CDC â€“ Preparing for Earthquakes
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.samhsa.gov/resource/dbhis/earthquake-preparedness-checklist-english"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SAMHSA â€“ Earthquake Preparedness Checklist (English)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Drought Content
const DroughtContent = ({ activeTab }) => {
  return (
    <div id="drought-content" className="drought-content-section">
      {/* Prepare Before Section */}
      <div id="drought-prepare" className="drought-content-section">
        <span className="drought-section-indicator" id="prepare"></span>
        <h2 className="drought-section-title">
          <i className="fas fa-clipboard-list"></i> Prepare for Drought
        </h2>

        {/* YouTube Video */}
        <div className="drought-video-container">
          <div className="drought-video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/FIx50wkbEUg"
              title="Drought Preparedness Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="drought-component-section">
          <h3 className="drought-component-title">Understanding Drought</h3>
          <div className="drought-info">
            <h2 style={{ color: "rgb(0,121,158)" }}>Droughts</h2>
            <p>
              <strong>Definition:</strong> Long periods of little or no rainfall
              causing water shortages.
            </p>

            <h3 style={{ color: "rgb(0,121,158)" }}>Causes</h3>
            <ul>
              <li>Below-average precipitation for months or years.</li>
              <li>High evaporation due to extreme heat.</li>
              <li>El NiÃ±o and other climate variations.</li>
              <li>Human misuse of water (over-irrigation, deforestation).</li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Effects</h3>
            <ul>
              <li>Crop failure and livestock deaths â†’ famine.</li>
              <li>Rivers, lakes, and groundwater dry up.</li>
              <li>Migration and conflicts over water resources.</li>
              <li>Economic collapse in agriculture-based regions.</li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Why They Occur</h3>
            <p>
              Natural climate cycles combined with rising global temperatures.
              Poor land management makes droughts worse.
            </p>

            <h3 style={{ color: "rgb(0,121,158)" }}>Additional Notes</h3>
            <ul>
              <li>Unlike floods/earthquakes, droughts develop slowly.</li>
              <li>
                Pushes societies to conserve water and use drought-resistant
                crops.
              </li>
            </ul>
          </div>

          <div className="drought-info-grid">
            <div className="drought-info-card">
              <div className="drought-card-img">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20230803155225/WaterConserve.png"
                  alt="Water conservation"
                />
              </div>
              <div className="drought-card-content">
                <h3>Water Conservation</h3>
                <p>
                  Implement water-saving measures before drought conditions
                  worsen:
                </p>
                <ul>
                  <li>Fix leaky faucets and pipes</li>
                  <li>Install water-efficient fixtures</li>
                  <li>Use drought-resistant plants in landscaping</li>
                  <li>Collect rainwater for outdoor use</li>
                </ul>
              </div>
            </div>

            <div className="drought-info-card">
              <div className="drought-card-img">
                <img
                  src="https://www.watercanada.net/wp-content/uploads/2022/08/Emergency-Water-Distribution-System-2048x1152-1.jpeg"
                  alt="Water storage"
                />
              </div>
              <div className="drought-card-content">
                <h3>Emergency Water Supply</h3>
                <p>Store water for emergency use during drought conditions:</p>
                <ul>
                  <li>Store at least 3 gallons of water per person</li>
                  <li>Keep bottled water for drinking and cooking</li>
                  <li>Have water purification methods available</li>
                  <li>Know alternative water sources in your area</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="drought-section-title">
          <i className="fas fa-tint-slash"></i> Water Conservation Tips
        </h3>

        <div className="drought-pictographic-steps">
          <div className="drought-picto-step">
            <img
              src="https://th.bing.com/th/id/OIP.zwEBn4Y1Lc7scwdssWyeTQHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3"
              alt="Shorter showers icon"
            />
            <h4>Shorter Showers</h4>
            <p>Limit showers to 5 minutes</p>
          </div>
          <div className="drought-picto-step">
            <img
              src="https://cdn-icons-png.flaticon.com/512/284/284500.png"
              alt="Faucet icon"
            />
            <h4>Fix Leaks</h4>
            <p>Repair dripping faucets promptly</p>
          </div>
          <div className="drought-picto-step">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2385/2385863.png"
              alt="Dishwasher icon"
            />
            <h4>Full Loads Only</h4>
            <p>Run dishwashers and washing machines only when full</p>
          </div>
          <div className="drought-picto-step">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2911/2911800.png"
              alt="Plant icon"
            />
            <h4>Native Plants</h4>
            <p>They require less water to thrive</p>
          </div>
        </div>

        {/* Drought Impact Stats */}
        <div className="drought-component-section">
          <h3 className="drought-component-title">Drought Impact Statistics</h3>
          <div className="drought-stats-container">
            <div className="drought-stat-box">
              <div className="drought-stat-number">55M</div>
              <p>People affected by drought annually worldwide</p>
            </div>
            <div className="drought-stat-box">
              <div className="drought-stat-number">6-8B</div>
              <p>Annual US losses from drought</p>
            </div>
            <div className="drought-stat-box">
              <div className="drought-stat-number">40%</div>
              <p>Of the world's population faces water scarcity</p>
            </div>
          </div>
        </div>
      </div>

      {/* During a Drought Section */}
      <div id="drought-during" className="drought-content-section">
        <span className="drought-section-indicator" id="during"></span>
        <h2 className="drought-section-title">
          <i className="fas fa-exclamation-circle"></i> During a Drought
        </h2>

        <div className="drought-component-section">
          <h3 className="drought-component-title">
            Managing During Drought Conditions
          </h3>
          <p>
            When drought conditions persist, it's important to implement water
            conservation measures and stay informed.
          </p>

          <div className="drought-steps-container">
            <div className="drought-step-card">
              <h4>Indoor Water Conservation</h4>
              <p>Reduce indoor water usage with these strategies:</p>
              <ul>
                <li>Take shorter showers (5 minutes or less)</li>
                <li>Turn off water while brushing teeth or shaving</li>
                <li>Only run full loads in dishwashers and washing machines</li>
                <li>
                  Fix leaks promptly - a dripping faucet can waste 20 gallons
                  per day
                </li>
              </ul>
            </div>

            <div className="drought-step-card">
              <h4>Outdoor Water Conservation</h4>
              <p>Minimize outdoor water usage during drought:</p>
              <ul>
                <li>
                  Water plants early in the morning or late in the evening
                </li>
                <li>Use drip irrigation systems for efficiency</li>
                <li>Use mulch around plants to reduce evaporation</li>
                <li>Collect rainwater for outdoor use</li>
              </ul>
            </div>
          </div>

          <div className="drought-alert-box">
            <h3>Follow Local Water Restrictions</h3>
            <p>
              During severe drought, local authorities may implement water use
              restrictions. Stay informed about current restrictions in your
              area and comply with all guidelines.
            </p>
          </div>

          {/* Water Saving Tips */}
          <div className="drought-pictographic-steps">
            <div className="drought-picto-step">
              <img
                src="https://cdn-icons-png.flaticon.com/512/251/251763.png"
                alt="Bucket icon"
              />
              <h4>Reuse Water</h4>
              <p>Collect shower warm-up water for plants</p>
            </div>
            <div className="drought-picto-step">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2936/2936736.png"
                alt="Toilet icon"
              />
              <h4>Fix Toilets</h4>
              <p>Leaking toilets can waste 200 gallons daily</p>
            </div>
            <div className="drought-picto-step">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2911/2911800.png"
                alt="Plant icon"
              />
              <h4>Choose Native Plants</h4>
              <p>They require less water to thrive</p>
            </div>
            <div className="drought-picto-step">
              <img
                src="https://cdn-icons-png.flaticon.com/512/284/284500.png"
                alt="Faucet icon"
              />
              <h4>Aerate Faucets</h4>
              <p>Install faucet aerators to reduce flow</p>
            </div>
          </div>
        </div>
      </div>

      {/* After a Drought Section */}
      <div id="drought-after" className="drought-content-section">
        <span className="drought-section-indicator" id="after"></span>
        <h2 className="drought-section-title">
          <i className="fas fa-first-aid"></i> After a Drought
        </h2>

        <div className="drought-component-section">
          <h3 className="drought-component-title">
            Recovering From Drought Conditions
          </h3>
          <p>
            Even after drought conditions improve, it's important to continue
            water conservation practices and assess any damage.
          </p>

          <div className="drought-steps-container">
            <div className="drought-step-card">
              <h4>Assess Property Damage</h4>
              <p>Check your property for drought-related damage:</p>
              <ul>
                <li>Inspect foundations for cracking from soil contraction</li>
                <li>Check plumbing for leaks that may have developed</li>
                <li>Assess trees and landscaping for damage</li>
                <li>Evaluate well systems if applicable</li>
              </ul>
            </div>

            <div className="drought-step-card">
              <h4>Long-Term Water Conservation</h4>
              <p>Implement permanent water-saving measures:</p>
              <ul>
                <li>Install water-efficient fixtures and appliances</li>
                <li>Consider xeriscaping with drought-tolerant plants</li>
                <li>Install rain barrels for water collection</li>
                <li>Develop a water-wise landscape design</li>
              </ul>
            </div>
          </div>

          {/* Recovery Checklist */}
          <div className="drought-checklist">
            <h3 className="drought-component-title">
              Post-Drought Recovery Checklist
            </h3>
            <div className="drought-checklist-item">
              <div className="drought-checklist-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h4>Inspect Foundations</h4>
                <p>
                  Check for cracks in your home's foundation caused by soil
                  contraction.
                </p>
              </div>
            </div>
            <div className="drought-checklist-item">
              <div className="drought-checklist-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h4>Evaluate Landscaping</h4>
                <p>
                  Assess which plants survived and replace with
                  drought-resistant varieties.
                </p>
              </div>
            </div>
            <div className="drought-checklist-item">
              <div className="drought-checklist-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h4>Check Plumbing</h4>
                <p>
                  Inspect for leaks that may have developed during dry
                  conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources Section */}
      <div id="drought-resources" className="drought-content-section">
        <span className="drought-section-indicator" id="resources"></span>
        <h2 className="drought-section-title">
          <i className="fas fa-book"></i> Additional Resources
        </h2>

        <div className="drought-component-section">
          <h3 className="drought-component-title">
            Educational materials and tools to help you prepare for drought
          </h3>

          <div className="drought-resource-grid">
            <div className="drought-resource-card">
              <h4>Government Resources</h4>
              <ul>
                <li>
                  <a
                    href="https://www.epa.gov/water-research/drought-resilience-and-water-conservation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Drought.gov / National Integrated Drought Information System
                    & EPA Drought Resilience
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nrcs.usda.gov/programs-initiatives/watersmart-initiative"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USDA WaterSMART Initiative
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.epa.gov/water-research/drought-resilience-and-water-conservation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EPA WaterSense Program & Water Conservation Tools
                  </a>
                </li>
              </ul>
            </div>

            <div className="drought-resource-card">
              <h4>Conservation Tips</h4>
              <ul>
                <li>
                  <a
                    href="https://vikaspedia.in/energy/environment/know-your-environment/water/water-conservation-tips"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Water Conservation Tips â€“ Vikaspedia
                  </a>
                </li>
                <li>
                  <a
                    href="https://cwas.org.in/cwas-resources/rainwater-harvesting-in-rural-areas-booklet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rainwater Harvesting in Rural Areas Booklet â€“ CWAS/CEPT
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.indiawaterportal.org/groundwater/rainwater-harvesting/technical-manual-rainwater-harvesting/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Technical Manual for Rainwater Harvesting â€“ IndiaWaterPortal
                  </a>
                </li>
                <li>
                  <a
                    href="https://mppcb.mp.gov.in/RWH.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rainwater Harvesting Guidelines â€“ MPPCB
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.epa.gov/watersense/homes-technical-reference-manual"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Indoor Water Efficiency / WaterSense Homes Manual â€“ EPA
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Flood Content

const FloodContent = ({ activeTab }) => {
  return (
    <div className="flood-disaster-content">
      {/* Prepare Section */}
      <div id="flood-prepare" className="flood-content-section">
        <span className="flood-section-indicator" id="prepare"></span>
        <h2 className="flood-section-title">
          <i className="fas fa-clipboard-list"></i> Prepare for a Flood
        </h2>

        {/* YouTube Video */}
        <div className="flood-video-container">
          <div className="flood-video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/43M5mZuzHF8"
              title="Flood Preparedness Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flood-component-section">
          <h3 className="flood-component-title">Understanding Floods</h3>
          <p>
            Prepare now to protect yourself, your home, and your family during a
            flood.
          </p>

          <div className="flood-info">
            <h2 style={{ color: "rgb(0,121,158)" }}>Floods</h2>
            <p>
              <strong>Definition:</strong> Overflow of water onto land that is
              usually dry.
            </p>

            <h3 style={{ color: "rgb(0,121,158)" }}>Causes</h3>
            <ul>
              <li>Heavy or prolonged rainfall.</li>
              <li>Storm surges from cyclones or tsunamis.</li>
              <li>Melting snow or glaciers.</li>
              <li>Dam breaks or river overflow.</li>
              <li>
                Poor drainage and urbanization (concrete surfaces block
                absorption).
              </li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Human Impact</h3>
            <ul>
              <li>Destroys homes, roads, bridges, and farmland.</li>
              <li>Causes loss of life and displacement of people.</li>
              <li>Spreads water-borne diseases like cholera and diarrhea.</li>
              <li>Major economic losses due to damaged infrastructure.</li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Environmental Effects</h3>
            <ul>
              <li>Soil erosion and habitat destruction.</li>
              <li>
                Deposits fertile silt in floodplains, improving agriculture.
              </li>
            </ul>

            <h3 style={{ color: "rgb(0,121,158)" }}>Why They Occur</h3>
            <p>
              Floods occur due to a natural imbalance in rainfall and water
              flow, but human activities like deforestation and climate change
              worsen their frequency and severity.
            </p>
          </div>

          {/* Info Grid */}
          <div className="flood-info-grid">
            <div className="flood-info-card">
              <div className="flood-card-img">
                <img
                  src="https://nationalfirstresponse.com/wp-content/uploads/2023/01/How-to-Prepare-an-Emergency-Kit-for-Any-Disaster.jpeg"
                  alt="Emergency kit supplies"
                />
              </div>
              <div className="flood-card-content">
                <h3>Prepare an Emergency Kit</h3>
                <p>
                  Having a ready-to-go kit ensures you and your family can stay
                  safe during a flood.
                </p>
                <ul>
                  <li>Store at least 3 days' supply of food and water</li>
                  <li>Carry important documents in a waterproof bag</li>
                  <li>Pack essential medicines and a first aid kit</li>
                  <li>Include cash, extra clothes, and hygiene items</li>
                </ul>
              </div>
            </div>

            <div className="flood-info-card">
              <div className="flood-card-img">
                <img
                  src="https://lh7-us.googleusercontent.com/xenl60kxm9ZIQrSQ9__sCe9UO_FzlzHJkT0ZwIyGJxO1rJkkDY6UPL99D9kU8dy1QIuzXXkYoTjt7bc2qBkwAvC-WXwtGi_uZuf7qEnbxzU2UGVAHE-BiKMSi8uu7BhGMOxc2ReqBCt0gaQ9MZQx-gw"
                  alt="Family with an evacuation plan"
                />
              </div>
              <div className="flood-card-content">
                <h3>Make an Evacuation Plan</h3>
                <p>
                  Know your local evacuation routes and have a plan for a safe
                  place to go during a flood.
                </p>
                <ul>
                  <li>Map out multiple evacuation routes</li>
                  <li>Designate a safe meeting place</li>
                  <li>Prepare a "go-bag" with essentials</li>
                  <li>Practice your plan with your family</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* During Section */}
      <div id="flood-during" className="flood-content-section">
        <span className="flood-section-indicator" id="during"></span>
        <h2 className="flood-section-title">
          <i className="fas fa-exclamation-circle"></i> During a Flood
        </h2>
        <div className="flood-component-section">
          <h3 className="flood-component-title">
            Staying Safe When Flooding Occurs
          </h3>
          <div className="flood-steps-container">
            <div className="flood-step-card">
              <h4>Stay Informed</h4>
              <p>
                During a flood, stay updated via local news, weather apps, and
                emergency alerts.
              </p>
            </div>
            <div className="flood-step-card">
              <h4>Avoid Floodwater</h4>
              <p>
                Never attempt to walk, swim, or drive through floodwater. Stay
                on higher ground.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* After Section */}
      <div id="flood-after" className="flood-content-section">
        <span className="flood-section-indicator" id="after"></span>
        <h2 className="flood-section-title">
          <i className="fas fa-first-aid"></i> After a Flood
        </h2>
        <div className="flood-component-section">
          <h3 className="flood-component-title">Recovery Steps</h3>
          <div className="flood-steps-container">
            <div className="flood-step-card">
              <h4>Return When Safe</h4>
              <p>
                Only return home after authorities confirm safety. Avoid
                standing water and hazardous debris.
              </p>
            </div>
            <div className="flood-step-card">
              <h4>Document Damage</h4>
              <p>
                Take photos and videos to support insurance claims. Avoid major
                repairs until professionals assess the property.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div id="flood-resources" className="flood-content-section">
        <span className="flood-section-indicator" id="resources"></span>
        <h2 className="flood-section-title">
          <i className="fas fa-book"></i> Additional Resources
        </h2>
        <div className="flood-component-section">
          <h3 className="flood-component-title">
            Tools and information to help you prepare for floods
          </h3>
          <div className="flood-resource-grid">
            <div className="flood-resource-card">
              <h4>FEMA Resources</h4>
              <ul>
                <li>
                  <a
                    href="https://www.fema.gov/flood-maps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FEMA Flood Map Service Center
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.fema.gov/what-do-during-flood"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    What to do During a Flood
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.fema.gov/what-do-after-flood"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    What to do After a Flood
                  </a>
                </li>
              </ul>
            </div>
            <div className="flood-resource-card">
              <h4>Red Cross</h4>
              <ul>
                <li>
                  <a
                    href="https://www.redcross.org/get-help-how-to-prepare-for-emergencies/types-of-emergencies/flood.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Flood Safety Tips
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.redcross.org/get-help-how-to-prepare-for-emergencies/disaster-and-safety-kit-resources.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Disaster & Safety Kit Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Wildfire Content
const WildfireContent = ({ activeTab }) => {
  return (
    <div id="wildfire-content" className="wildfire-disaster-content">

      {/* â”€â”€ PREPARE â”€â”€ */}
      {activeTab === "prepare" && (
        <div id="wildfire-prepare" className="wildfire-content-section">
          <h2 className="wildfire-section-title">
            <i className="fas fa-fire"></i> Prepare for a Wildfire
          </h2>

          <div className="wildfire-video-container">
            <div className="wildfire-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/AcnKlSFqm3Y"
                title="Wildfire Preparedness Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="wildfire-component-section">
            <h3 className="wildfire-component-title">Understanding Wildfires</h3>
            <div className="wildfire-info">
              <h2 style={{ color: "rgb(0,121,158)" }}>Wildfires</h2>
              <p><strong>Definition:</strong> Uncontrolled fires that spread rapidly through vegetation, forests, or grasslands.</p>
              <h3 style={{ color: "rgb(0,121,158)" }}>Causes</h3>
              <ul>
                <li>Lightning strikes during dry conditions.</li>
                <li>Human activities â€” campfires, discarded cigarettes, power lines.</li>
                <li>Prolonged drought and heat waves.</li>
                <li>Strong winds that spread embers over long distances.</li>
              </ul>
              <h3 style={{ color: "rgb(0,121,158)" }}>Effects</h3>
              <ul>
                <li>Destruction of homes, forests, and wildlife habitats.</li>
                <li>Air quality deterioration from smoke.</li>
                <li>Loss of life and forced evacuations.</li>
                <li>Long-term soil erosion and landscape changes.</li>
              </ul>
            </div>

            <div className="wildfire-info-grid">
              <div className="wildfire-info-card">
                <div className="wildfire-card-img">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.NKwf98ETsHV1L6aj9uz2BgHaDV?rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Defensible space zones around a house."
                  />
                </div>
                <div className="wildfire-card-content">
                  <h3>Create Defensible Space</h3>
                  <p>Clear a perimeter around your home to reduce fire risk.</p>
                  <ul>
                    <li>Clear a 30-foot perimeter around your home</li>
                    <li>Remove dead leaves and debris from roof and gutters</li>
                    <li>Stack firewood at least 30 feet from your home</li>
                  </ul>
                </div>
              </div>

              <div className="wildfire-info-card">
                <div className="wildfire-card-img">
                  <img
                    src="https://i.etsystatic.com/12674449/r/il/f4fe26/1926597203/il_fullxfull.1926597203_pvqd.jpg"
                    alt="Emergency go-bag with supplies."
                  />
                </div>
                <div className="wildfire-card-content">
                  <h3>Evacuation Planning</h3>
                  <p>Know your routes and have a ready go-bag.</p>
                  <ul>
                    <li>Have a go-bag ready with water, meds, documents</li>
                    <li>Plan for pets and livestock</li>
                    <li>Know your community's early warning systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="wildfire-steps-container" style={{ marginTop: '24px' }}>
              <div className="wildfire-step-card">
                <h4>Harden Your Home</h4>
                <p>Use fire-resistant materials on roofs, vents, decks, and windows to reduce the chance of embers igniting your home.</p>
              </div>
              <div className="wildfire-step-card">
                <h4>Emergency Kit</h4>
                <ul>
                  <li>3 days' food & water per person</li>
                  <li>N95 masks for smoke</li>
                  <li>Battery radio & flashlight</li>
                  <li>Important documents (waterproofed)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ DURING â”€â”€ */}
      {activeTab === "during" && (
        <div id="wildfire-during" className="wildfire-content-section">
          <h2 className="wildfire-section-title">
            <i className="fas fa-exclamation-circle"></i> During a Wildfire
          </h2>
          <div className="wildfire-component-section">
            <h3 className="wildfire-component-title">What to Do During a Wildfire</h3>
            <div className="wildfire-steps-container">
              <div className="wildfire-step-card">
                <h4>1. Evacuate Early</h4>
                <p>If authorities issue an evacuation order, leave <strong>immediately</strong>. Do not wait â€” roads become congested and smoke reduces visibility fast.</p>
                <ul>
                  <li>Take your go-bag</li>
                  <li>Follow official evacuation routes</li>
                  <li>Inform a contact of your plan</li>
                </ul>
              </div>
              <div className="wildfire-step-card">
                <h4>2. Stay Informed</h4>
                <p>Monitor local radio, TV, and emergency alerts continuously. Official instructions always take priority over other information sources.</p>
                <ul>
                  <li>Keep phone charged + backup power ready</li>
                  <li>Follow NDRF / state disaster authority updates</li>
                </ul>
              </div>
              <div className="wildfire-step-card">
                <h4>3. Protect Against Smoke</h4>
                <p>Smoke inhalation is a serious health risk. Wear an N95 mask outdoors and keep windows closed indoors.</p>
              </div>
              <div className="wildfire-step-card">
                <h4>4. If Trapped in a Vehicle</h4>
                <p>Park off the road, turn off engine, turn on headlights, get on the floor, and cover yourself with a blanket. Avoid driving through smoke.</p>
              </div>
            </div>

            <div className="wildfire-emergency-contact" style={{ marginTop: '24px' }}>
              <h3><i className="fas fa-phone-alt"></i> Emergency Contacts</h3>
              <p><strong>National Emergency Number:</strong> 112</p>
              <p><strong>Forest Department Helpline:</strong> 1926</p>
              <p><strong>NDRF Helpline:</strong> 011-24363260</p>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ AFTER â”€â”€ */}
      {activeTab === "after" && (
        <div id="wildfire-after" className="wildfire-content-section">
          <h2 className="wildfire-section-title">
            <i className="fas fa-first-aid"></i> After a Wildfire
          </h2>
          <div className="wildfire-component-section">
            <h3 className="wildfire-component-title">Recovery and Safety</h3>
            <div className="wildfire-steps-container">
              <div className="wildfire-step-card">
                <h4>Return Only When Safe</h4>
                <p>Only return home after authorities confirm it's safe. Areas may still have hot spots, weakened structures, and damaged power lines.</p>
                <ul>
                  <li>Wear protective clothing and gloves</li>
                  <li>Avoid touching or moving debris</li>
                  <li>If you smell smoke or see instability â€” leave immediately</li>
                </ul>
              </div>
              <div className="wildfire-step-card">
                <h4>Assess & Document Damage</h4>
                <p>Photograph and video all damage carefully before touching anything â€” this is critical for insurance claims and disaster assistance.</p>
                <ul>
                  <li>Check structural integrity before entering</li>
                  <li>Don't attempt major repairs alone if structure is unstable</li>
                  <li>Contact insurance provider promptly</li>
                </ul>
              </div>
              <div className="wildfire-step-card">
                <h4>Health After a Fire</h4>
                <p>Ash and soot contain toxic chemicals. Wear N95 masks and gloves when cleaning up. Wash thoroughly after contact with ash.</p>
              </div>
              <div className="wildfire-step-card">
                <h4>Mental Health</h4>
                <p>Wildfires are traumatic. It's normal to feel anxious or overwhelmed. Seek support from community organizations or counselors.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ RESOURCES â”€â”€ */}
      {activeTab === "resources" && (
        <div id="wildfire-resources" className="wildfire-content-section">
          <h2 className="wildfire-section-title">
            <i className="fas fa-book"></i> Additional Resources
          </h2>
          <div className="wildfire-component-section">
            <h3 className="wildfire-component-title">Tools and information to help you prepare for wildfires</h3>
            <div className="wildfire-resource-grid">
              <div className="wildfire-resource-card">
                <h4>India â€” Official Resources</h4>
                <ul>
                  <li><a href="https://ndma.gov.in/" target="_blank" rel="noopener noreferrer">NDMA â€” National Disaster Management Authority</a></li>
                  <li><a href="https://forest.nic.in/" target="_blank" rel="noopener noreferrer">Ministry of Environment, Forest & Climate Change</a></li>
                  <li><a href="https://fsi.nic.in/" target="_blank" rel="noopener noreferrer">Forest Survey of India â€” Fire Alerts</a></li>
                </ul>
              </div>
              <div className="wildfire-resource-card">
                <h4>Global Resources</h4>
                <ul>
                  <li><a href="https://www.ready.gov/wildfires" target="_blank" rel="noopener noreferrer">Ready.gov â€” Wildfire Preparedness</a></li>
                  <li><a href="https://www.fire.ca.gov/dspace" target="_blank" rel="noopener noreferrer">Cal Fire â€” Defensible Space Guidelines</a></li>
                  <li><a href="https://www.who.int/health-topics/wildfires" target="_blank" rel="noopener noreferrer">WHO â€” Health impacts of wildfires</a></li>
                </ul>
              </div>
              <div className="wildfire-resource-card">
                <h4>Videos & Guides</h4>
                <ul>
                  <li><a href="https://www.youtube.com/watch?v=AcnKlSFqm3Y" target="_blank" rel="noopener noreferrer">Wildfire Preparedness Guide (YouTube)</a></li>
                  <li><a href="https://www.redcross.org/get-help-how-to-prepare-for-emergencies/types-of-emergencies/wildfire.html" target="_blank" rel="noopener noreferrer">Red Cross â€” Wildfire Safety</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModulesPages;
