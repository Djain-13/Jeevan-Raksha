import React, { useState, useEffect } from "react";
import "./Alert.css";
import { FaSpinner, FaPaperPlane, FaBullhorn, FaSatelliteDish, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaHouseDamage, FaSkullCrossbones } from "react-icons/fa";

const API_URL = "http://127.0.0.1:5000/api"; // Update if needed

const severityIcons = {
  Low: <FaCheckCircle />,
  Medium: <FaExclamationTriangle />,
  High: <FaHouseDamage />,
  Critical: <FaSkullCrossbones />
};

const Alert = ({onBack}) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    severity: "Medium",
    region: ""
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch alerts from API
  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/alerts`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAlerts(data);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, region: formData.region || "All" })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || res.statusText);
      }
      setFormData({ title: "", message: "", severity: "Medium", region: "" });
      fetchAlerts();
    } catch (error) {
      alert(`Failed to create alert: ${error.message}`);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="alert-page">
      <header>
        <h1>Jeevan Raksha</h1>
        <button className="back-btn" onClick={onBack}>← Back</button>
        <p>Real-time Disaster Alert Dashboard: Stay Informed, Stay Safe.</p>
      </header>

      <main>
        <section className="form-container">
          <h2><FaBullhorn /> Broadcast New Alert</h2>
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
            <select
              id="severity"
              value={formData.severity}
              onChange={handleChange}
            >
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
              {submitting ? <><FaSpinner className="spin" /> Broadcasting...</> : <><FaPaperPlane /> Create & Broadcast Alert</>}
            </button>
          </form>
        </section>

        <section className="alerts-display">
          <h2><FaSatelliteDish /> Live Alert Feed</h2>
          <div className="alerts-container">
            {loading && <div className="loading-indicator"></div>}
            {!loading && alerts.length === 0 && <p>No active alerts. All systems clear and safe.</p>}
            {!loading && alerts.map((alert) => (
              <div key={alert.id} className={`alert-card severity-${alert.severity}`}>
                <div className="header">
                  <span className="severity-icon">{severityIcons[alert.severity]}</span>
                  <h3>{alert.title}</h3>
                </div>
                <p>{alert.message}</p>
                <div className="meta">
                  <span className="region-info"><FaMapMarkerAlt /> <strong>Region:</strong> {alert.region}</span>
                  <span><FaClock /> {new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Alert;
