from flask import Blueprint, request, jsonify, render_template
from app.models import User, DisasterModule, Alert, RescueService, QuizScore
from app import db
from math import radians, sin, cos, sqrt, atan2
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# --- Main Page Routes ---
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """Serves a simple welcome page."""
    return "<h1>Welcome to Jeevan Raksha! Your backend is running.</h1>"

# --- API Routes ---
api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/status', methods=['GET'])
def status():
    return jsonify({"status": "Backend is running!"})

# ─────────────────────────────────────────────
# User Management
# ─────────────────────────────────────────────

@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({"error": "Username, email, and password are required."}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists."}), 409
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email address already registered."}), 409
    user = User(
        username=data['username'],
        email=data['email'],
        full_name=data.get('full_name'),
        mobile_number=data.get('mobile_number'),
        age=data.get('age'),
        gender=data.get('gender'),
        role=data.get('role', 'student')
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."}), 201


@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'password' not in data:
        return jsonify({"error": "Password is required."}), 400
    identifier = data.get('email') or data.get('username')
    if not identifier:
        return jsonify({"error": "Email or username is required."}), 400
    user = User.query.filter_by(email=identifier).first()
    if user is None:
        user = User.query.filter_by(username=identifier).first()
    if user is None or not user.check_password(data['password']):
        return jsonify({"error": "Invalid credentials. Please check your email and password."}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "message": "Login successful.",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name or user.username,
            "email": user.email,
            "role": user.role
        }
    })


@api_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Returns full profile for the authenticated user."""
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)

    # Quiz history summary
    scores = QuizScore.query.filter_by(user_id=user_id).order_by(QuizScore.completed_at.desc()).all()
    total_xp = sum(s.xp_earned for s in scores)
    all_badges = []
    for s in scores:
        if s.badges_earned:
            all_badges.extend(s.badges_earned.split(','))
    unique_badges = list(dict.fromkeys(all_badges))  # deduplicate preserving order

    # Best score per difficulty
    best = {}
    for lvl in ['easy', 'medium', 'hard']:
        lvl_scores = [s for s in scores if s.difficulty == lvl]
        if lvl_scores:
            best[lvl] = max(s.percentage for s in lvl_scores)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name or user.username,
        "mobile_number": user.mobile_number,
        "age": user.age,
        "gender": user.gender,
        "role": user.role,
        "member_since": user.created_at.strftime('%B %Y') if user.created_at else '',
        "quiz_stats": {
            "total_attempts": len(scores),
            "total_xp": total_xp,
            "badges_earned": unique_badges,
            "best_scores": best,
            "recent": [
                {
                    "difficulty": s.difficulty,
                    "score": s.score,
                    "total": s.total,
                    "percentage": s.percentage,
                    "xp_earned": s.xp_earned,
                    "completed_at": s.completed_at.isoformat()
                }
                for s in scores[:10]  # last 10 attempts
            ]
        }
    })


# ─────────────────────────────────────────────
# Quiz Scores
# ─────────────────────────────────────────────

@api_bp.route('/quiz/score', methods=['POST'])
@jwt_required()
def save_quiz_score():
    """Save a completed quiz attempt for the authenticated user."""
    user_id = int(get_jwt_identity())
    data = request.get_json()
    required = ['difficulty', 'score', 'total', 'percentage']
    if not data or not all(k in data for k in required):
        return jsonify({"error": "difficulty, score, total, percentage required."}), 400

    entry = QuizScore(
        user_id=user_id,
        difficulty=data['difficulty'],
        score=data['score'],
        total=data['total'],
        percentage=data['percentage'],
        xp_earned=data.get('xp_earned', 0),
        badges_earned=','.join(data.get('badges_earned', []))
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({"message": "Score saved.", "id": entry.id}), 201


# ─────────────────────────────────────────────
# Alerts
# ─────────────────────────────────────────────

@api_bp.route('/alerts', methods=['POST'])
def create_alert():
    data = request.get_json()
    if not data or not all(k in data for k in ['title', 'message']):
        return jsonify({"error": "Title and message are required."}), 400
    new_alert = Alert(
        title=data['title'], message=data['message'],
        severity=data.get('severity', 'Medium'), region=data.get('region', 'All')
    )
    db.session.add(new_alert)
    db.session.commit()
    return jsonify({"message": "Alert created successfully.", "id": new_alert.id}), 201


@api_bp.route('/alerts', methods=['GET'])
def get_alerts():
    alerts = Alert.query.order_by(Alert.timestamp.desc()).all()
    results = [
        {"id": a.id, "title": a.title, "message": a.message,
         "severity": a.severity, "region": a.region, "timestamp": str(a.timestamp)}
        for a in alerts
    ]
    return jsonify(results)


# ─────────────────────────────────────────────
# Rescue / SOS
# ─────────────────────────────────────────────

@api_bp.route('/services', methods=['POST'])
def add_rescue_service():
    data = request.get_json()
    if not all(k in data for k in ['service_name', 'service_type', 'latitude', 'longitude', 'contact_number']):
        return jsonify({"error": "Missing required fields."}), 400
    new_service = RescueService(
        service_name=data['service_name'], service_type=data['service_type'],
        latitude=data['latitude'], longitude=data['longitude'],
        contact_number=data['contact_number']
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"message": "Rescue service added successfully.", "id": new_service.id}), 201


@api_bp.route('/sos', methods=['POST'])
def handle_sos():
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
        return R * 2 * atan2(sqrt(a), sqrt(1 - a))

    closest_service = min(relevant_services, key=lambda s: calculate_distance(user_lat, user_lon, s.latitude, s.longitude))
    print(f"ALERT: Notifying {closest_service.service_name} at {closest_service.contact_number}")
    return jsonify({
        "message": "SOS signal processed. The nearest rescue service has been identified.",
        "notified_service": {"name": closest_service.service_name, "type": closest_service.service_type, "contact": closest_service.contact_number}
    })
