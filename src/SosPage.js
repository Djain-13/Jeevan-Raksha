// SosPage.js
import React, { useState, useEffect } from 'react';
import './SosPage.css';
import { FaSpinner, FaPlusCircle, FaHandPaper, FaMapMarkerAlt } from 'react-icons/fa';

const API_URL = 'http://127.0.0.1:5000/api'; // backend URL

const SosPage = ({onBack}) => {
    // --- State ---
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [sosEnabled, setSosEnabled] = useState(false);
    const [sosMessage, setSosMessage] = useState('');
    const [serviceMessage, setServiceMessage] = useState('');
    const [emergencyType, setEmergencyType] = useState('');

    const [serviceForm, setServiceForm] = useState({
        service_name: '',
        service_type: '',
        latitude: '',
        longitude: '',
        contact_number: ''
    });

    // --- Location ---
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLatitude(position.coords.latitude);
                    setUserLongitude(position.coords.longitude);
                    setSosEnabled(true);
                },
                (err) => {
                    console.error(err);
                    setSosEnabled(false);
                    setSosMessage('Unable to get your location. Enable location services and refresh.');
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
            );
        } else {
            setSosMessage('Geolocation not supported by your browser.');
        }
    }, []);

    // --- Helper ---
    const displayMessage = (setter, message) => {
        setter(message);
        setTimeout(() => setter(''), 6000);
    };

    // --- Add Service ---
    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...serviceForm,
                    latitude: parseFloat(serviceForm.latitude),
                    longitude: parseFloat(serviceForm.longitude)
                })
            });
            const result = await response.json();
            if (response.ok) displayMessage(setServiceMessage, result.message);
            else displayMessage(setServiceMessage, result.error || 'Failed to add service.');
            setServiceForm({ service_name: '', service_type: '', latitude: '', longitude: '', contact_number: '' });
        } catch (err) {
            console.error(err);
            displayMessage(setServiceMessage, 'Network error. Check console.');
        }
    };

    // --- SOS ---
    const handleSosSubmit = async (e) => {
        e.preventDefault();
        if (!userLatitude || !userLongitude) {
            displayMessage(setSosMessage, 'Location not available.');
            return;
        }
        if (!emergencyType) {
            displayMessage(setSosMessage, 'Select an emergency type.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/sos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emergency_type: emergencyType, latitude: userLatitude, longitude: userLongitude })
            });
            const result = await response.json();
            if (response.ok) {
                let msg = result.message;
                if (result.notified_service) {
                    msg += ` Nearest help: ${result.notified_service.name} (${result.notified_service.contact})`;
                }
                displayMessage(setSosMessage, msg);
            } else {
                displayMessage(setSosMessage, result.error || 'Failed to send SOS.');
            }
        } catch (err) {
            console.error(err);
            displayMessage(setSosMessage, 'Network error. Check console.');
        }
    };

    return (
        <>
            <header>
                <h1>Jeevan Raksha</h1>
                <p>Your Lifeline in Emergencies: Quick, Responsive, Empowering.</p>
                <button onClick={onBack} className="back-btn">← Back</button>  {/* Back button */}
            </header>
            <main>
                {/* --- Manage Rescue Services --- */}
                <section className="form-container">
                    <h2><FaPlusCircle /> Manage Rescue Services</h2>
                    <form onSubmit={handleServiceSubmit}>
                        <input type="text" placeholder="Service Name" value={serviceForm.service_name}
                            onChange={e => setServiceForm({...serviceForm, service_name: e.target.value})} required />
                        <select value={serviceForm.service_type}
                            onChange={e => setServiceForm({...serviceForm, service_type: e.target.value})} required>
                            <option value="">Select Service Type</option>
                            <option value="Fire">Fire Rescue</option>
                            <option value="Medical">Medical Aid</option>
                            <option value="Flood">Flood Response</option>
                            <option value="Earthquake">Earthquake Relief</option>
                            <option value="Police">Police Assistance</option>
                            <option value="General">General Emergency</option>
                        </select>
                        <input type="number" placeholder="Latitude" step="0.000001" value={serviceForm.latitude}
                            onChange={e => setServiceForm({...serviceForm, latitude: e.target.value})} required />
                        <input type="number" placeholder="Longitude" step="0.000001" value={serviceForm.longitude}
                            onChange={e => setServiceForm({...serviceForm, longitude: e.target.value})} required />
                        <input type="tel" placeholder="Contact Number" pattern="[0-9+ ]+" value={serviceForm.contact_number}
                            onChange={e => setServiceForm({...serviceForm, contact_number: e.target.value})} required />
                        <button type="submit"><FaPlusCircle /> Add Rescue Service</button>
                    </form>
                    {serviceMessage && <div className="message success">{serviceMessage}</div>}
                </section>

                {/* --- SOS --- */}
                <section className="form-container">
                    <h2><FaHandPaper /> Send Emergency SOS</h2>
                    <form onSubmit={handleSosSubmit}>
                        <p style={{textAlign:'center', color:'#5a6a7e'}}>Press the button below for immediate assistance.</p>
                        <div id="sos-current-location">
                            {userLatitude && userLongitude
                                ? <><FaMapMarkerAlt /> Lat: {userLatitude.toFixed(6)}, Lon: {userLongitude.toFixed(6)}</>
                                : <><FaSpinner className="fa-spin" /> Acquiring precise location...</>
                            }
                        </div>
                        <select value={emergencyType} onChange={e => setEmergencyType(e.target.value)} required>
                            <option value="">Select Emergency Type</option>
                            <option value="Fire">Fire Emergency</option>
                            <option value="Medical">Medical Emergency</option>
                            <option value="Flood">Flood Situation</option>
                            <option value="Earthquake">Earthquake Damage</option>
                            <option value="Police">Crime/Security</option>
                            <option value="General">Other Urgent Help</option>
                        </select>
                        <button type="submit" disabled={!sosEnabled}><FaHandPaper /> SOS: GET HELP NOW!</button>
                    </form>
                    {sosMessage && <div className="message error">{sosMessage}</div>}
                </section>
            </main>
        </>
    );
};

export default SosPage;
