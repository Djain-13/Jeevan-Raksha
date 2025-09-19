from flask import Blueprint, request, jsonify, render_template
from app.models import User, DisasterModule, Alert, RescueService
from app import db
from math import radians, sin, cos, sqrt, atan2

# --- Main Page Routes ---
# Blueprint for serving frontend pages
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """Serves a simple welcome page."""
    return "<h1>Welcome to Jeevan Raksha! Your backend is running.</h1>" 

# Note: The routes for quiz_main.html and rewards_page.html are left here
# but will cause an error if clicked, as we have removed the backend logic for them.
@main_bp.route('/quiz')
def quiz_page():
    return render_template('quiz_main.html')

@main_bp.route('/rewards')
def rewards_page():
    return render_template('rewards_page.html')

# --- API Routes ---
# Blueprint for all backend API endpoints
api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/status', methods=['GET'])
def status():
    """A simple route to check if the API is running."""
    return jsonify({"status": "Backend is running!"})

# --- User Management Routes ---

@api_bp.route('/register', methods=['POST'])
def register():
    """Endpoint for user registration."""
    data = request.get_json()
    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({"error": "Username, email, and password are required."}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists."}), 409
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email address already registered."}), 409
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."}), 201

@api_bp.route('/login', methods=['POST'])
def login():
    """Endpoint for user login."""
    data = request.get_json()
    if not data or not all(k in data for k in ['username', 'password']):
        return jsonify({"error": "Username and password are required."}), 400
    user = User.query.filter_by(username=data['username']).first()
    if user is None or not user.check_password(data['password']):
        return jsonify({"error": "Invalid username or password."}), 401
    return jsonify({
        "message": "Login successful.",
        "user": {"id": user.id, "username": user.username, "role": user.role}
    })

@api_bp.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
    """Temporary route to delete a user for debugging."""
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found."}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User '{username}' has been deleted."})

# --- Module Management Routes ---

@api_bp.route('/modules', methods=['POST'])
def create_module():
    """Endpoint to create a new disaster module."""
    data = request.get_json()
    if not data or not all(k in data for k in ['title', 'content']):
        return jsonify({"error": "Title and content are required."}), 400
    new_module = DisasterModule(title=data['title'], content=data['content'], category=data.get('category', 'General'))
    db.session.add(new_module)
    db.session.commit()
    return jsonify({"message": "Module created successfully.", "id": new_module.id}), 201

@api_bp.route('/modules', methods=['GET'])
def get_all_modules():
    """Endpoint to retrieve all disaster modules."""
    modules = DisasterModule.query.order_by(DisasterModule.created_at.desc()).all()
    results = [{"id": module.id, "title": module.title, "content": module.content, "category": module.category, "created_at": str(module.created_at)} for module in modules]
    return jsonify(results)

# --- Alert Routes ---

@api_bp.route('/alerts', methods=['POST'])
def create_alert():
    """Endpoint to create a new alert."""
    data = request.get_json()
    if not data or not all(k in data for k in ['title', 'message']):
        return jsonify({"error": "Title and message are required."}), 400
    new_alert = Alert(title=data['title'], message=data['message'], severity=data.get('severity', 'Medium'), region=data.get('region', 'All'))
    db.session.add(new_alert)
    db.session.commit()
    return jsonify({"message": "Alert created successfully.", "id": new_alert.id}), 201

@api_bp.route('/alerts', methods=['GET'])
def get_alerts():
    """Endpoint to get all current alerts, most recent first."""
    alerts = Alert.query.order_by(Alert.timestamp.desc()).all()
    results = [{"id": alert.id, "title": alert.title, "message": alert.message, "severity": alert.severity, "region": alert.region, "timestamp": str(alert.timestamp)} for alert in alerts]
    return jsonify(results)

# --- Rescue Service & SOS Routes ---

@api_bp.route('/services', methods=['POST'])
def add_rescue_service():
    """Admin endpoint to add a new rescue service."""
    data = request.get_json()
    if not all(k in data for k in ['service_name', 'service_type', 'latitude', 'longitude', 'contact_number']):
        return jsonify({"error": "Missing required fields."}), 400
    new_service = RescueService(service_name=data['service_name'], service_type=data['service_type'], latitude=data['latitude'], longitude=data['longitude'], contact_number=data['contact_number'])
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"message": "Rescue service added successfully.", "id": new_service.id}), 201

@api_bp.route('/sos', methods=['POST'])
def handle_sos():
    """Handles a user's SOS request and finds the nearest rescuer."""
    data = request.get_json()
    if not all(k in data for k in ['emergency_type', 'latitude', 'longitude']):
        return jsonify({"error": "Missing emergency type or location."}), 400
    user_lat, user_lon, emergency_type = data['latitude'], data['longitude'], data['emergency_type']
    relevant_services = RescueService.query.filter_by(service_type=emergency_type).all()
    if not relevant_services:
        return jsonify({"error": f"No rescue services found for '{emergency_type}'."}), 404
    def calculate_distance(lat1, lon1, lat2, lon2):
        R = 6371.0
        lat1_rad, lon1_rad, lat2_rad, lon2_rad = map(radians, [lat1, lon1, lat2, lon2])
        dlon, dlat = lon2_rad - lon1_rad, lat2_rad - lat1_rad
        a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return R * c
    closest_service = min(relevant_services, key=lambda s: calculate_distance(user_lat, user_lon, s.latitude, s.longitude))
    print(f"ALERT: Notifying {closest_service.service_name} at {closest_service.contact_number} for an emergency at ({user_lat}, {user_lon})")
    return jsonify({
        "message": "SOS signal processed. The nearest rescue service has been identified.",
        "notified_service": {"name": closest_service.service_name, "type": closest_service.service_type, "contact": closest_service.contact_number}
    })