from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS # <-- 1. IMPORT THIS

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app(config_class=Config):
    """
    This is the application factory. It creates and configures the Flask app.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app) # <-- 2. INITIALIZE CORS HERE

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Import and register both of your blueprints
    from app.routes import main_bp, api_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp)

    return app