"""
api.py contains the RESTful API methods.
"""

from flask import render_template, Blueprint, jsonify, request

from models import db, Blogs, Articles, FollowedBlogs

from datetime import datetime

api = Blueprint("api", __name__)


@api.route("/")
@api.route("/BlogFeed")
@api.route("/BlogSearch")
@api.route("/PostSearch")
def home():
    return render_template("index.html")


@api.route("/<path:path>")
def view_post_on_refresh(path):
    return render_template("index.html")


@api.route("/api/get_user_blog", methods=["POST"])
def blog():
    data = request.json["user"]["user"]
    user_id = data.get("sub")
    user_name = data.get("name")
    user_blog = Blogs.query.filter_by(author_id=user_id).first()
    if user_blog:
        return jsonify(
            {
                "id": user_blog.id,
                "author_name": user_blog.author_name,
                "blog_name": user_blog.blog_name,
                "image": user_blog.image,
                "description": user_blog.description,
            }
        )

    new_blog = Blogs(author_id=user_id, author_name=user_name, blog_name=user_name)
    db.session.add(new_blog)
    db.session.commit()
    return jsonify(user_name)


@api.route("/api/save_blog_changes", methods=["POST"])
def save_blog_changes():
    data = request.json["blog"]
    blog_id = data.get("id")
    blog_name = data.get("blog_name")
    blog_description = data.get("description")
    image = data.get("image")

    blog = Blogs.query.filter_by(id=blog_id).one()
    blog.blog_name = blog_name
    blog.image = image
    blog.description = blog_description

    db.session.commit()

    updated_blog = Blogs.query.filter_by(id=blog_id).one()

    return jsonify(
        {
            "id": updated_blog.id,
            "author_name": updated_blog.author_name,
            "blog_name": updated_blog.blog_name,
            "image": updated_blog.image,
        }
    )


@api.route("/api/get_posts", methods=["POST"])
def get_posts():
    data = request.json["user"]["user"]
    author_id = data.get("sub")
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


@api.route("/api/get_all_blogs", methods=["GET"])
def get_all_blogs():
    all_blogs = Blogs.query.all()
    return jsonify(
        [
            {
                "id": blog.id,
                "author_id": blog.author_id,
                "author_name": blog.author_name,
                "blog_name": blog.blog_name,
                "image": blog.image,
                "description": blog.description,
            }
            for blog in all_blogs
        ]
    )


@api.route("/api/follow_blog", methods=["POST"])
def follow_blog():
    data = request.json
    user_id = data["user_id"]
    blog_author_id = data["blog_author_id"]
    followed = FollowedBlogs.query.filter_by(
        user_id=user_id, blog_author_id=blog_author_id
    ).all()
    if len(followed) == 0:
        new_follow = FollowedBlogs(user_id=user_id, blog_author_id=blog_author_id)
        db.session.add(new_follow)
        db.session.commit()
        return jsonify("Followed blog successfully")
    return jsonify("Already followed blog!")


@api.route("/api/get_blog_feed", methods=["POST"])
def get_blog_feed():
    data = request.json
    user_id = data["user"]

    following = FollowedBlogs.query.filter_by(user_id=user_id).all()
    followed_blogs = []
    for blog in following:
        followed_blogs.append(blog.blog_author_id)

    blog_feed = []

    blog_name = Blogs.query.filter_by()
    for author_id in followed_blogs:
        followed_articles = Articles.query.filter_by(author_id=author_id).all()
        for article in followed_articles:
            blog_name_query = Blogs.query.filter_by(author_id=article.author_id).one()
            blog_name = blog_name_query.blog_name  # get name of blog
            blog_feed.append(
                {
                    "id": article.id,
                    "blog_name": blog_name,
                    "author_id": article.author_id,
                    "title": article.title,
                    "subtitle": article.subtitle,
                    "image": article.image,
                    "created_at": article.created_at,
                    "text": article.text,
                }
            )
    return jsonify(blog_feed)


@api.route("/api/get_post_from_id", methods=["POST"])
def get_post_dynamically():
    data = request.json
    post_id = data["id"]
    post = Articles.query.get(post_id)
    blog_query = Blogs.query.filter_by(author_id=post.author_id).one()
    author_name = blog_query.author_name
    blog_image = blog_query.image
    return jsonify(
        {
            "id": post.id,
            "author_name": author_name,
            "blog_image": blog_image,
            "title": post.title,
            "subtitle": post.subtitle,
            "image": post.image,
            "created_at": post.created_at,
            "text": post.text,
        }
    )


@api.route("/api/get_blog_from_id", methods=["POST"])
def get_blog_dynamically():
    data = request.json
    blog_id = data["id"]

    blogger = Blogs.query.get(blog_id)
    blog_author_id = blogger.author_id
    blog_name = blogger.blog_name
    blog_description = blogger.description
    blog_image = blogger.image

    return jsonify(
        {
            "id": blog_id,
            "author_id": blog_author_id,
            "name": blog_name,
            "description": blog_description,
            "image": blog_image,
        }
    )


@api.route("/api/get_posts_for_blog", methods=["POST"])
def get_posts_for_blog():
    data = request.json
    author_id = data.get("author_id")
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
