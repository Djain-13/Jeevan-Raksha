from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager # 1. Import the JWT Manager

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app(config_class=Config):
    """
    This is the application factory. It creates and configures the Flask app.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions — allow Railway, Vercel, and local dev
    CORS(app, origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ], supports_credentials=True, origins_regex=[
        r"https://.*\.vercel\.app",
        r"https://.*\.railway\.app",
        r"https://.*\.up\.railway\.app",
    ])
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    
    # 2. Initialize the JWT Manager with your app instance.
    # This enables the creation and protection of routes with JWTs.
    jwt = JWTManager(app)

    # Import and register both of your blueprints
    from app.routes import main_bp, api_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp)

    # Auto-run DB migrations on startup (safe for Railway cold starts)
    with app.app_context():
        try:
            from flask_migrate import upgrade
            upgrade()
        except Exception as e:
            # If migrations fail (e.g. first run), create tables directly
            db.create_all()

    return app

