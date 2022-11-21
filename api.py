"""
api.py contains the RESTful API methods.
"""

from flask import render_template, Blueprint, jsonify, request

from models import db, Blogs, Articles, ArticleLikes, FollowedBlogs

api = Blueprint("api", __name__)


@api.route("/")
def home():
    return render_template("index.html")


@api.route("/api/get_user_blog", methods=["POST"])
def blog():
    data = request.json["user"]
    user_id = data.get("sub")
    user_name = data.get("name")
    user_blog = Blogs.query.filter_by(author_id=user_id).first()
    if user_blog:
        return jsonify(user_blog.blog_name)

    new_blog = Blogs(author_id=user_id, blog_name=user_name)
    db.session.add(new_blog)
    db.session.commit()
    return jsonify(user_name + "'s " + "Blog")
