import React, { useState, useEffect } from "react";
import "./Alert.css";
import { FaSpinner, FaPaperPlane, FaBullhorn, FaSatelliteDish, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaHouseDamage, FaSkullCrossbones } from "react-icons/fa";
import InternalNav from './InternalNav';
import API_URL from './config';

const severityIcons = {
  Low: <FaCheckCircle />,
  Medium: <FaExclamationTriangle />,
  High: <FaHouseDamage />,
  Critical: <FaSkullCrossbones />
};

const severityColors = {
  Low: '#16a34a',
  Medium: '#d97706',
  High: '#ea580c',
  Critical: '#dc2626'
};

// Demo alerts shown when backend is unavailable
const DEMO_ALERTS = [
  {
    id: "demo-1",
    title: "Cyclone Warning — Andhra Pradesh Coast",
    message: "A severe cyclonic storm is approaching the Andhra Pradesh coast with wind speeds of 120–140 km/h. Coastal districts advised to evacuate low-lying areas immediately.",
    severity: "Critical",
    region: "Andhra Pradesh",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-2",
    title: "Flash Flood Alert — Uttarakhand",
    message: "Heavy monsoon rainfall has triggered flash floods in Chamoli and Rudraprayag districts. NDRF teams deployed. Residents near riverbanks must move to higher ground.",
    severity: "High",
    region: "Uttarakhand",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-3",
    title: "Earthquake Tremors — Gujarat",
    message: "A magnitude 4.2 earthquake was recorded near Bhuj, Gujarat. No major damage reported. Citizens advised to stay alert for aftershocks.",
    severity: "Medium",
    region: "Gujarat",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-4",
    title: "Heat Wave Advisory — Rajasthan",
    message: "Temperatures expected to exceed 46°C in Barmer, Jaisalmer and Jalore districts. Citizens advised to avoid outdoor activity between 11am–4pm and stay hydrated.",
    severity: "High",
    region: "Rajasthan",
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-5",
    title: "Flood Watch — Assam",
    message: "The Brahmaputra river is near danger mark at Guwahati and Dibrugarh. Riverine flooding possible in low-lying areas. Residents requested to stay vigilant.",
    severity: "Medium",
    region: "Assam",
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-6",
    title: "All Clear — Kerala Flood Season",
    message: "Water levels in major reservoirs have receded below red mark. Normal activities can resume in Wayanad and Idukki districts. Authorities continue monitoring.",
    severity: "Low",
    region: "Kerala",
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString()
  }
];

const Alert = ({onBack, onHome, onProfile, onLogout}) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    severity: "Medium",
    region: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${API_URL}/alerts`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setAlerts(data);
        setIsDemo(false);
      } else {
        setAlerts(DEMO_ALERTS);
        setIsDemo(true);
      }
    } catch {
      setAlerts(DEMO_ALERTS);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, region: formData.region || "All India" })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || res.statusText);
      }
      setFormData({ title: "", message: "", severity: "Medium", region: "" });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      fetchAlerts();
    } catch {
      // In demo mode, add the alert locally
      const newAlert = {
        id: `local-${Date.now()}`,
        title: formData.title,
        message: formData.message,
        severity: formData.severity,
        region: formData.region || "All India",
        timestamp: new Date().toISOString()
      };
      setAlerts(prev => [newAlert, ...prev]);
      setFormData({ title: "", message: "", severity: "Medium", region: "" });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="alert-page">
      <InternalNav title="Alert Dashboard" onBack={onBack} onHome={onHome} onProfile={onProfile} onLogout={onLogout} />
      <header className="alert-header" style={{ paddingTop: '20px' }}>
        <h1>Jeevan Raksha</h1>
        <p>Real-time Disaster Alert Dashboard: Stay Informed, Stay Safe.</p>
      </header>

      <main className="alert-main">
        {/* ── Broadcast Form ── */}
        <section className="form-container">
          <h2><FaBullhorn /> Broadcast New Alert</h2>
          {submitSuccess && (
            <div style={{
              background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
              borderRadius: '12px', padding: '12px 16px', marginBottom: '16px',
              color: '#15803d', WebkitTextFillColor: '#15803d',
              fontWeight: 600, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <FaCheckCircle /> Alert broadcasted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              id="title"
              type="text"
              placeholder="Alert Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              id="message"
              placeholder="Detailed alert message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <select id="severity" value={formData.severity} onChange={handleChange}>
              <option value="Low">Severity: Low (Minor Impact)</option>
              <option value="Medium">Severity: Medium (Moderate Risk)</option>
              <option value="High">Severity: High (Significant Threat)</option>
              <option value="Critical">Severity: Critical (Immediate Danger)</option>
            </select>
            <input
              id="region"
              type="text"
              placeholder="Affected Region"
              value={formData.region}
              onChange={handleChange}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? <><FaSpinner className="spin" /> Broadcasting...</> : <><FaPaperPlane /> Create &amp; Broadcast Alert</>}
            </button>
          </form>
        </section>

        {/* ── Live Feed ── */}
        <section className="alerts-display">
          <h2>
            <FaSatelliteDish /> Live Alert Feed
            {isDemo && (
              <span style={{
                marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 500,
                background: 'rgba(59,130,246,0.1)', color: '#2563eb',
                WebkitTextFillColor: '#2563eb',
                padding: '3px 10px', borderRadius: '20px',
                border: '1px solid rgba(59,130,246,0.2)'
              }}>
                Demo Mode
              </span>
            )}
          </h2>

          <div className="alerts-container">
            {loading && <div className="loading-indicator" />}

            {!loading && alerts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#64748b', WebkitTextFillColor: '#64748b', padding: '30px 0' }}>
                No active alerts. All systems clear and safe. ✅
              </p>
            )}

            {!loading && alerts.map((alert) => {
              const borderColor = severityColors[alert.severity] || '#64748b';
              return (
                <div key={alert.id} style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  borderLeft: `4px solid ${borderColor}`,
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderLeftColor: borderColor,
                  borderLeftWidth: '4px',
                  borderLeftStyle: 'solid',
                  padding: '20px 22px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}>
                  {/* Title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.3rem', color: borderColor }}>
                      {severityIcons[alert.severity] || <FaExclamationTriangle />}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', WebkitTextFillColor: '#0f172a', lineHeight: 1.3 }}>
                      {alert.title}
                    </span>
                  </div>
                  {/* Message */}
                  <p style={{ margin: '0 0 12px 0', color: '#334155', WebkitTextFillColor: '#334155', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {alert.message}
                  </p>
                  {/* Meta */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px',
                    fontSize: '0.8rem', flexWrap: 'wrap', gap: '6px',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', WebkitTextFillColor: '#475569' }}>
                      <FaMapMarkerAlt style={{ color: borderColor }} />
                      <strong style={{ color: '#334155', WebkitTextFillColor: '#334155' }}>Region:</strong> {alert.region}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', WebkitTextFillColor: '#94a3b8' }}>
                      <FaClock /> {new Date(alert.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Alert;
