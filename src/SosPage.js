import React, { useState, useEffect } from 'react';
import './SosPage.css';
import { FaSpinner, FaPlusCircle, FaHandPaper, FaMapMarkerAlt } from 'react-icons/fa';

const API_URL = 'http://127.0.0.1:5000/api'; // backend URL

const SosPage = ({ onBack }) => {
    // --- State ---
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [userAddress, setUserAddress] = useState(''); // State to store the address
    const [sosEnabled, setSosEnabled] = useState(false);
    const [sosMessage, setSosMessage] = useState('');
    const [serviceMessage, setServiceMessage] = useState('');
    const [emergencyType, setEmergencyType] = useState('');
    const [isAddingService, setIsAddingService] = useState(false); // NEW: Loading state for the service form

    // UPDATED: Service form state now uses an 'address' field
    const [serviceForm, setServiceForm] = useState({
        service_name: '',
        service_type: '',
        address: '', // Replaces latitude and longitude
        contact_number: ''
    });

    // API Key from your map.html file
    const GOOGLE_MAPS_API_KEY = "AIzaSyAXuZiBgzAAftj2BsZjXxMB8e31m_rQHFU";

    // --- Location and Reverse Geocoding for SOS ---
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setUserLatitude(lat);
                    setUserLongitude(lon);
                    setSosEnabled(true);
                    fetchAddress(lat, lon); // Get the user's address from coordinates
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

    // --- Reverse Geocoding (Coordinates -> Address) ---
    const fetchAddress = async (lat, lon) => {
        setUserAddress('Fetching address...');
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'OK' && data.results[0]) {
                setUserAddress(data.results[0].formatted_address);
            } else {
                setUserAddress('Could not find address for this location.');
            }
        } catch (error) {
            setUserAddress('Error fetching address.');
        }
    };

    // --- Helper ---
    const displayMessage = (setter, message, isError = false) => {
        setter({ text: message, error: isError });
        setTimeout(() => setter({ text: '', error: false }), 6000);
    };

    // --- UPDATED: Add Service with Geocoding ---
    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        setIsAddingService(true);
        displayMessage(setServiceMessage, 'Finding coordinates for the address...');

        // Step 1: Geocode the address to get lat/lon
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(serviceForm.address)}&key=${GOOGLE_MAPS_API_KEY}`;
        
        let lat, lon;
        try {
            const geoResponse = await fetch(geocodeUrl);
            const geoData = await geoResponse.json();

            if (geoData.status === 'OK' && geoData.results[0]) {
                const location = geoData.results[0].geometry.location;
                lat = location.lat;
                lon = location.lng;
                displayMessage(setServiceMessage, 'Location found! Adding service...');
            } else {
                throw new Error('Address not found or invalid.');
            }
        } catch (error) {
            console.error(error);
            displayMessage(setServiceMessage, `Error: Could not find coordinates for "${serviceForm.address}". Please check the address.`, true);
            setIsAddingService(false);
            return;
        }

        // Step 2: Send the complete data (with coordinates) to your backend
        try {
            const serviceData = {
                service_name: serviceForm.service_name,
                service_type: serviceForm.service_type,
                latitude: lat,
                longitude: lon,
                contact_number: serviceForm.contact_number
            };

            const response = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            });
            const result = await response.json();
            if (response.ok) {
                displayMessage(setServiceMessage, result.message);
                setServiceForm({ service_name: '', service_type: '', address: '', contact_number: '' });
            } else {
                 displayMessage(setServiceMessage, result.error || 'Failed to add service.', true);
            }
        } catch (err) {
            console.error(err);
            displayMessage(setServiceMessage, 'Network error. Could not connect to the backend.', true);
        } finally {
            setIsAddingService(false);
        }
    };

    // --- SOS ---
    const handleSosSubmit = async (e) => {
        e.preventDefault();
        if (!userLatitude || !userLongitude) {
            displayMessage(setSosMessage, 'Location not available.', true);
            return;
        }
        if (!emergencyType) {
            displayMessage(setSosMessage, 'Select an emergency type.', true);
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
                displayMessage(setSosMessage, result.error || 'Failed to send SOS.', true);
            }
        } catch (err) {
            console.error(err);
            displayMessage(setSosMessage, 'Network error. Check console.', true);
        }
    };

    return (
        <>
            <header>
                <h1>Jeevan Raksha</h1>
                <p>Your Lifeline in Emergencies: Quick, Responsive, Empowering.</p>
                <button onClick={onBack} className="back-btn">← Back</button>
            </header>
            <main>
                {/* --- Manage Rescue Services (UPDATED) --- */}
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
                        {/* UPDATED: Replaced lat/lon with a single address input */}
                        <input type="text" placeholder="Enter Full Address of Service" value={serviceForm.address}
                            onChange={e => setServiceForm({...serviceForm, address: e.target.value})} required />
                        <input type="tel" placeholder="Contact Number" pattern="[0-9+ ]+" value={serviceForm.contact_number}
                            onChange={e => setServiceForm({...serviceForm, contact_number: e.target.value})} required />
                        <button type="submit" disabled={isAddingService}>
                            {isAddingService ? <FaSpinner className="fa-spin" /> : <FaPlusCircle />}
                            {isAddingService ? 'Adding...' : 'Add Rescue Service'}
                        </button>
                    </form>
                    {serviceMessage.text && <div className={`message ${serviceMessage.error ? 'error' : 'success'}`}>{serviceMessage.text}</div>}
                </section>

                {/* --- SOS Section --- */}
                <section className="form-container">
                    <h2><FaHandPaper /> Send Emergency SOS</h2>
                    <form onSubmit={handleSosSubmit}>
                        <p style={{textAlign:'center', color:'#5a6a7e'}}>Press the button below for immediate assistance.</p>
                        <div id="sos-current-location">
                            {userAddress
                                ? <><FaMapMarkerAlt /> {userAddress}</>
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
                    {sosMessage.text && <div className={`message ${sosMessage.error ? 'error' : 'success'}`}>{sosMessage.text}</div>}
                </section>
            </main>
        </>
    );
};

export default SosPage;

