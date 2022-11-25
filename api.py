"""
api.py contains the RESTful API methods.
"""

from flask import render_template, Blueprint, jsonify, request

from models import db, Blogs, Articles, ArticleLikes, FollowedBlogs

from datetime import datetime

api = Blueprint("api", __name__)


@api.route("/")
def home():
    return render_template("index.html")


@api.route("/api/get_user_blog", methods=["POST"])
def blog():
    data = request.json["user"]["user"]
    user_id = data.get("sub")
    user_name = data.get("name")
    user_blog = Blogs.query.filter_by(author_id=user_id).first()
    if user_blog:
        return jsonify(user_blog.blog_name)

    new_blog = Blogs(author_id=user_id, author_name=user_name, blog_name=user_name)
    db.session.add(new_blog)
    db.session.commit()
    return jsonify(user_name)


@api.route("/api/get_posts", methods=["POST"])
def get_posts():
    author_id = request.json["user"]
    blog_posts = Articles.query.filter_by(author_id=author_id).all()
    return jsonify(
        [
            {
                "id": post.id,
                "author_id": post.author_id,
                "title": post.title,
                "subtitle": post.subtitle,
                "image": post.image,
                "created_at": post.created_at,
                "text": post.text,
            }
            for post in blog_posts
        ]
    )


@api.route("/api/add_post", methods=["POST"])
def add_post():
    data = request.json["post"]
    author_id = data.get("author_id")
    title = data.get("title")
    subtitle = data.get("subtitle")
    image = data.get("image")
    created_at = datetime.now()
    text = data.get("text")
    new_post = Articles(
        author_id=author_id,
        title=title,
        subtitle=subtitle,
        image=image,
        created_at=created_at,
        text=text,
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify("Added post " + title)


@api.route("/api/save_post_changes", methods=["POST"])
def save_post_changes():
    print(request.json)
    data = request.json["post"]
    post_id = data.get("id")
    post = Articles.query.filter_by(id=post_id).one()
    post.title = data.get("title")
    post.subtitle = data.get("subtitle")
    post.image = data.get("image")
    post.text = data.get("text")
    db.session.commit()
    return jsonify("Post edited successfully!")


@api.route("/api/delete_post", methods=["POST"])
def delete_post():
    id = request.json["post_id"]
    Articles.query.filter_by(id=id).delete()
    db.session.commit()
    return jsonify("Post deleted successfully!")
