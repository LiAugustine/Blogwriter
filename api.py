"""
api.py contains the RESTful API methods.
"""

from flask import render_template, Blueprint, jsonify, request

# from models import db, Users, Blogs, Articles, ArticleLikes, FollowedBlogs

api = Blueprint("api", __name__)


@api.route("/")
def home():
    return render_template("index.html")


# @api.route("/api/add_blog", methods=["POST"])
# def add_blog():
#     data = request.json
