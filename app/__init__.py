from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

# Create instances of our extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app(config_class=Config):
    """
    This is the application factory. It creates and configures the Flask app.
    """
    # Create the Flask application instance
    app = Flask(__name__)
    
    # Load the configuration from our config.py file
    app.config.from_object(config_class)

    # Initialize our extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Import and register the blueprint from our routes.py file
    from app.routes import api_bp
    app.register_blueprint(api_bp)

    return app