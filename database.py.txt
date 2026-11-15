from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    roblox_id = db.Column(db.String(64), unique=True, nullable=False)
    username = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(50), default="Siviili")
    department = db.Column(db.String(50), default="Siviili")
    rank = db.Column(db.String(50), default="Kansalainen")
    bank_balance = db.Column(db.Float, default=2500.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    callsign = db.Column(db.String(30), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    personnel = db.Column(db.String(120), nullable=False)
    vehicle = db.Column(db.String(80), default="Partioauto")
    status = db.Column(db.String(40), default="10-8: Vapaana")

class Call(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    call_number = db.Column(db.String(20), unique=True, nullable=False)
    caller = db.Column(db.String(80), default="Hätäkeskus 112")
    location = db.Column(db.String(120), nullable=False)
    call_type = db.Column(db.String(80), nullable=False)
    priority = db.Column(db.String(30), default="Kiireellinen (A)")
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(40), default="Uusi")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Citizen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(20), nullable=False)
    roblox_user = db.Column(db.String(80), nullable=True)
    address = db.Column(db.String(120), default="Tornio / Keminmaa")
    license_status = db.Column(db.String(40), default="Voimassa (B)")
    wanted = db.Column(db.Boolean, default=False)
    notes = db.Column(db.Text, default="")

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(20), unique=True, nullable=False)
    model = db.Column(db.String(80), nullable=False)
    color = db.Column(db.String(40), nullable=False)
    owner_name = db.Column(db.String(100), nullable=False)
    inspected = db.Column(db.Boolean, default=True)
    insured = db.Column(db.Boolean, default=True)

class Fine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fine_number = db.Column(db.String(25), unique=True, nullable=False)
    citizen_name = db.Column(db.String(100), nullable=False)
    reason = db.Column(db.String(200), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    paid = db.Column(db.Boolean, default=False)
    issued_by = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Investigation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    case_number = db.Column(db.String(25), unique=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    suspect = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(40), default="Avoin")
    details = db.Column(db.Text, nullable=False)
    lead_officer = db.Column(db.String(80), nullable=False)

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    report_number = db.Column(db.String(25), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    report_type = db.Column(db.String(80), nullable=False)
    subject_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    condition = db.Column(db.String(40), default="Käyttökunnossa")
    assigned_unit = db.Column(db.String(50), default="Asema 1")

class Camera(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cam_code = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    area = db.Column(db.String(80), nullable=False)
    pos_x = db.Column(db.Float, default=50.0)
    pos_y = db.Column(db.Float, default=50.0)

class CameraSighting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    camera_id = db.Column(db.Integer, db.ForeignKey('camera.id'), nullable=False)
    person_name = db.Column(db.String(100), nullable=True)
    vehicle_plate = db.Column(db.String(20), nullable=True)
    notes = db.Column(db.Text, nullable=False)
    recorded_by = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    industry = db.Column(db.String(80), nullable=False)
    owner = db.Column(db.String(80), nullable=False)
    balance = db.Column(db.Float, default=5000.0)

class TowCall(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(20), nullable=False)
    pickup = db.Column(db.String(120), nullable=False)
    destination = db.Column(db.String(120), default="Varikko")
    status = db.Column(db.String(40), default="Odottaa hinausta")

class CourtCase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    docket_number = db.Column(db.String(25), unique=True, nullable=False)
    defendant = db.Column(db.String(100), nullable=False)
    charges = db.Column(db.Text, nullable=False)
    verdict = db.Column(db.String(100), default="Käsittelyssä")
    sentence = db.Column(db.String(100), default="-")

class HRApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    applicant = db.Column(db.String(80), nullable=False)
    app_type = db.Column(db.String(60), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    details = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(30), default="Odottaa")

class RadioMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.String(40), nullable=False)
    sender = db.Column(db.String(80), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class AuditLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    action = db.Column(db.String(200), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
