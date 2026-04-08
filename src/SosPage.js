import React, { useState, useEffect } from 'react';
import './SosPage.css';
import { FaSpinner, FaHandPaper, FaMapMarkerAlt } from 'react-icons/fa';
import InternalNav from './InternalNav';
import API_URL from './config';

const SosPage = ({ onBack, onHome, onProfile, onLogout }) => {
    const [userLatitude, setUserLatitude]   = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [userAddress, setUserAddress]     = useState('');
    const [sosEnabled, setSosEnabled]       = useState(false);
    const [emergencyType, setEmergencyType] = useState('');
    const [message, setMessage]             = useState({ text: '', error: false });

    // --- Geolocation on mount ---
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setUserLatitude(lat);
                    setUserLongitude(lon);
                    setSosEnabled(true);
                    fetchAddress(lat, lon);
                },
                (err) => {
                    console.error(err);
                    setSosEnabled(false);
                    showMsg('Unable to get your location. Enable location services and refresh.', true);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
            );
        } else {
            showMsg('Geolocation not supported by your browser.', true);
        }
    }, []);

    // --- Reverse Geocoding (OpenStreetMap Nominatim — free, no API key) ---
    const fetchAddress = async (lat, lon) => {
        setUserAddress('Fetching your location...');
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            if (data?.address) {
                const { city, town, village, state, country } = data.address;
                const place = city || town || village || '';
                setUserAddress(`${place}${place ? ', ' : ''}${state || ''}, ${country || 'India'}`);
            } else {
                setUserAddress('Location detected (address unavailable)');
            }
        } catch {
            setUserAddress('Location detected (address unavailable)');
        }
    };

    // --- Helpers ---
    const showMsg = (text, error = false) => {
        setMessage({ text, error });
        setTimeout(() => setMessage({ text: '', error: false }), 6000);
    };

    // --- SOS Submit ---
    const handleSosSubmit = async (e) => {
        e.preventDefault();
        if (!userLatitude || !userLongitude) { showMsg('Location not available.', true); return; }
        if (!emergencyType)                  { showMsg('Please select an emergency type.', true); return; }

        showMsg('Sending SOS signal...');
        try {
            const response = await fetch(`${API_URL}/sos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emergency_type: emergencyType, latitude: userLatitude, longitude: userLongitude })
            });
            const result = await response.json();
            if (response.ok) {
                let msg = result.message || 'SOS sent successfully! Help is on the way.';
                if (result.notified_service) {
                    msg += ` Nearest help: ${result.notified_service.name} (${result.notified_service.contact})`;
                }
                showMsg(msg);
            } else {
                showMsg(result.error || 'Failed to send SOS.', true);
            }
        } catch (err) {
            console.error(err);
            showMsg('Could not reach the server. Call 112 directly for emergencies.', true);
        }
    };

    return (
        <div className="sos-page-container">
            <InternalNav title="Emergency SOS" onBack={onBack} onHome={onHome} onProfile={onProfile} onLogout={onLogout} />
            <header className="sos-header" style={{ paddingTop: '20px' }}>
                <h1>Jeevan Raksha</h1>
                <p>Your Lifeline in Emergencies: Quick, Responsive, Empowering.</p>
            </header>

            <main className="sos-main" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <section className="form-container">
                    <h2><FaHandPaper /> Send Emergency SOS</h2>
                    <form onSubmit={handleSosSubmit}>
                        <p style={{ textAlign: 'center', color: '#5a6a7e', margin: '0 0 8px' }}>
                            Press the button below for immediate assistance.
                        </p>

                        {/* Location display */}
                        <div id="sos-current-location">
                            {userAddress
                                ? <><FaMapMarkerAlt /> {userAddress}</>
                                : <><FaSpinner className="fa-spin" /> Acquiring precise location...</>
                            }
                        </div>

                        {/* Emergency type */}
                        <select value={emergencyType} onChange={e => setEmergencyType(e.target.value)} required>
                            <option value="">Select Emergency Type</option>
                            <option value="Fire">🔥 Fire Emergency</option>
                            <option value="Medical">🚑 Medical Emergency</option>
                            <option value="Flood">🌊 Flood Situation</option>
                            <option value="Earthquake">🔴 Earthquake Damage</option>
                            <option value="Police">🚔 Crime / Security</option>
                            <option value="General">⚠️ Other Urgent Help</option>
                        </select>

                        <button type="submit" disabled={!sosEnabled}>
                            <FaHandPaper /> SOS: GET HELP NOW!
                        </button>
                    </form>

                    {/* Feedback message */}
                    {message.text && (
                        <div className={`message ${message.error ? 'error' : 'success'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Direct call fallback */}
                    <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#94a3b8', marginTop: '16px' }}>
                        Or call directly: <a href="tel:112" style={{ color: '#ef4444', fontWeight: 700 }}>112</a> (National Emergency)
                    </p>
                </section>
            </main>
        </div>
    );
};

export default SosPage;
