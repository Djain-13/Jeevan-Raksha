from app import create_app, db
from app.models import User

# Create the application instance using our factory
app = create_app()

# This is a helper for the 'flask shell' command, making debugging easier.
# It automatically imports 'db' and 'User' into the shell session.
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User}