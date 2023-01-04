from flask import Flask
from os import getenv, environ
from dotenv import find_dotenv, load_dotenv
from api import api
from models import db

load_dotenv(find_dotenv())

app = Flask(
    __name__,
    static_folder="templates/assets",
)

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DB_URL")
if app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = getenv("SECRET_KEY")

db.init_app(app)
with app.app_context():
    # db.drop_all()
    db.create_all()

app.register_blueprint(api)

if __name__ == "__main__":
    # port = int(environ.get("PORT", 8080))  # local
    port = int(environ.get("PORT", 8080))  # deployment
    app.run(host="0.0.0.0", port=port)
