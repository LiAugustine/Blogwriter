"""
api.py contains the RESTful API methods.
"""

from flask import render_template, Blueprint

api = Blueprint("api", __name__)


@api.route("/")
def home():
    return render_template("index.html")
