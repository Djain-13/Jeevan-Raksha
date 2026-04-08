# Jeevan Raksha

A disaster preparedness and emergency response web application that helps communities stay informed, educated, and safe.

## Features

- **Learning Modules** — Educational content about disaster preparedness
- **Interactive Quizzes** — Test your disaster readiness knowledge
- **Virtual Drills** — Story-based emergency scenario training
- **SOS Emergency System** — Send distress signals with automatic nearest-service routing
- **Live Alert Dashboard** — Real-time disaster alerts and notifications
- **Disaster Risk Map** — Visual map of disaster-prone areas
- **Helpline Directory** — Quick access to emergency contact numbers

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Flask + SQLAlchemy + Flask-JWT-Extended
- **Database**: SQLite (development)

## Getting Started

### Backend
```bash
cd "Jeevan Raksha"
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
flask db upgrade
python run.py
```

### Frontend
```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.
Backend runs on [http://localhost:5000](http://localhost:5000).
