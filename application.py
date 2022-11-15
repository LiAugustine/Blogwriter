from flask import Flask
from os import getenv
from dotenv import find_dotenv, load_dotenv
from api import api

load_dotenv(find_dotenv())

application = Flask(
    __name__,
    template_folder="../frontend/templates",
    static_folder="../frontend/templates/assets",
)

application.config["SQLALCHEMY_DATABASE_URI"] = getenv("DB_URL")
if application.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    application.config["SQLALCHEMY_DATABASE_URI"] = application.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")

application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
application.secret_key = getenv("SECRET_KEY")

application.register_blueprint(api)

if __name__ == "__main__":
    application.run()
