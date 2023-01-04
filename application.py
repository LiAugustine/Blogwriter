from flask import Flask
from os import getenv, environ
from dotenv import find_dotenv, load_dotenv
from api import api
from models import db

load_dotenv(find_dotenv())

application = Flask(
    __name__,
    static_folder="templates/assets",
)

application.config["SQLALCHEMY_DATABASE_URI"] = getenv("DB_URL")
if application.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    application.config["SQLALCHEMY_DATABASE_URI"] = application.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")

application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
application.secret_key = getenv("SECRET_KEY")

db.init_app(application)
with application.app_context():
    # db.drop_all()
    db.create_all()

application.register_blueprint(api)

if __name__ == "__main__":
    port = int(environ.get("PORT", 8080))
    application.run(host="0.0.0.0", port=port)
