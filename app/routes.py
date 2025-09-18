from flask import Blueprint, request, jsonify
from app.models import User, DisasterModule, Alert, RescueService
from app import db
from app.models import Alert
from app.models import RescueService 
from math import radians, sin, cos, sqrt, atan2

# Create a Blueprint, which is a way to organize a group of related routes.
# All routes defined here will be prefixed with '/api'.
api_bp = Blueprint('api', __name__, url_prefix='/api')

# --- Status Route ---

@api_bp.route('/status', methods=['GET'])
def status():
    """A simple route to check if the API is running."""
    return jsonify({"status": "Backend is running!"})

# --- User Management Routes ---

@api_bp.route('/register', methods=['POST'])
def register():
    """Endpoint for user registration."""
    data = request.get_json()

    # Basic validation
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({"error": "Username, email, and password are required."}), 400

    # Check if user or email already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists."}), 409
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email address already registered."}), 409

    # Create a new user instance
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])  # This hashes the password

    # Add the new user to the database
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully."}), 201


@api_bp.route('/login', methods=['POST'])
def login():
    """Endpoint for user login."""
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Username and password are required."}), 400

    user = User.query.filter_by(username=data['username']).first()

    # Check if user exists and password is correct
    if user is None or not user.check_password(data['password']):
        return jsonify({"error": "Invalid username or password."}), 401

    # In a real app, you would generate and return a JWT (JSON Web Token) here.
    # For now, we'll just return a success message.
    return jsonify({
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "username": user.username,
            "role": user.role
        }
    })

# --- Module Management Routes ---

@api_bp.route('/modules', methods=['POST'])
def create_module():
    """Endpoint to create a new disaster module."""
    data = request.get_json()

    if not data or not data.get('title') or not data.get('content'):
        return jsonify({"error": "Title and content are required."}), 400

    # In a real app, you would check if the user is an admin here.
    
    new_module = DisasterModule(
        title=data['title'],
        content=data['content'],
        category=data.get('category', 'General') # Default category is 'General'
    )
    db.session.add(new_module)
    db.session.commit()

    return jsonify({"message": "Module created successfully.", "id": new_module.id}), 201


@api_bp.route('/modules', methods=['GET'])
def get_all_modules():
    """Endpoint to retrieve all disaster modules."""
    modules = DisasterModule.query.order_by(DisasterModule.created_at.desc()).all()
    
    # Convert module objects to a list of dictionaries
    results = [
        {
            "id": module.id,
            "title": module.title,
            "content": module.content,
            "category": module.category,
            "created_at": module.created_at
        } for module in modules
    ]
    
    return jsonify(results)


@api_bp.route('/alerts', methods=['POST'])
def create_alert():
    """Endpoint to create a new alert."""
    data = request.get_json()
    if not data or not data.get('title') or not data.get('message'):
        return jsonify({"error": "Title and message are required."}), 400

    # In a real app, you'd check for admin privileges here.
    
    new_alert = Alert(
        title=data['title'],
        message=data['message'],
        severity=data.get('severity', 'Medium'),
        region=data.get('region', 'All')
    )
    db.session.add(new_alert)
    db.session.commit()

    return jsonify({"message": "Alert created successfully.", "id": new_alert.id}), 201


@api_bp.route('/alerts', methods=['GET'])
def get_alerts():
    """Endpoint to get all current alerts, most recent first."""
    alerts = Alert.query.order_by(Alert.timestamp.desc()).all()
    
    results = [
        {
            "id": alert.id,
            "title": alert.title,
            "message": alert.message,
            "severity": alert.severity,
            "region": alert.region,
            "timestamp": alert.timestamp
        } for alert in alerts
    ]
    
    return jsonify(results)


@api_bp.route('/services', methods=['POST'])
def add_rescue_service():
    """Admin endpoint to add a new rescue service."""
    data = request.get_json()
    # Basic validation
    if not all(k in data for k in ['service_name', 'service_type', 'latitude', 'longitude', 'contact_number']):
        return jsonify({"error": "Missing required fields."}), 400

    new_service = RescueService(
        service_name=data['service_name'],
        service_type=data['service_type'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        contact_number=data['contact_number']
    )
    db.session.add(new_service)
    db.session.commit()
    
    return jsonify({"message": "Rescue service added successfully.", "id": new_service.id}), 201


@api_bp.route('/sos', methods=['POST'])
def handle_sos():
    """Handles a user's SOS request and finds the nearest rescuer."""
    data = request.get_json()
    if not all(k in data for k in ['emergency_type', 'latitude', 'longitude']):
        return jsonify({"error": "Missing emergency type or location."}), 400

    user_lat = data['latitude']
    user_lon = data['longitude']
    emergency_type = data['emergency_type']

    # Find all services that match the emergency type
    relevant_services = RescueService.query.filter_by(service_type=emergency_type).all()

    if not relevant_services:
        return jsonify({"error": f"No rescue services found for '{emergency_type}'."}), 404

    # --- Find the closest service ---
    def calculate_distance(lat1, lon1, lat2, lon2):
        # Haversine formula to calculate distance between two lat/lon points
        R = 6371.0 # Radius of Earth in kilometers
        
        lat1_rad, lon1_rad = radians(lat1), radians(lon1)
        lat2_rad, lon2_rad = radians(lat2), radians(lon2)
        
        dlon = lon2_rad - lon1_rad
        dlat = lat2_rad - lat1_rad
        
        a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        
        return R * c

    closest_service = min(
        relevant_services, 
        key=lambda service: calculate_distance(user_lat, user_lon, service.latitude, service.longitude)
    )
    
    print(f"ALERT: Notifying {closest_service.service_name} at {closest_service.contact_number} for an emergency at ({user_lat}, {user_lon})")

    return jsonify({
        "message": "SOS signal processed. The nearest rescue service has been identified.",
        "notified_service": {
            "name": closest_service.service_name,
            "type": closest_service.service_type,
            "contact": closest_service.contact_number
        }
    })