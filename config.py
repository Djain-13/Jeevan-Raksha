import os

# Find the absolute path of the root directory of the project
basedir = os.path.abspath(os.path.dirname(__file__))

# This class will hold all the configuration variables for the app
class Config:
    """Set Flask configuration from default values."""

    # General Config
    # Using a default secret key for now. We'll move it to .env later.
    SECRET_KEY = 'a-default-secret-key-for-development'

    # Database Config
    # If DATABASE_URL is not set, it defaults to using a simple SQLite database.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False