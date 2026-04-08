import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Find the absolute path of the root directory of the project
basedir = os.path.abspath(os.path.dirname(__file__))

# This class will hold all the configuration variables for the app
class Config:
    """Set Flask configuration from default values."""

    # General Config — loaded from .env
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-default-secret-key-for-development'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'a-default-jwt-secret-key'

    # Database Config
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False