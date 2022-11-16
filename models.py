from application import application
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy(application)


class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    picture = db.Column(db.Text, unique=False, nullable=True)
    account_id = db.Column(db.Text, unique=True, nullable=False)
    followed_blogs = db.relationship(
        "FollowedBlogs", backref=db.backref("Users", order_by="FollowedBlogs.user_id")
    )


class Blogs(db.Model):
    __tablename__ = "Blogs"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Text, ForeignKey("Users.account_id"))
    blog_name = db.Column(db.String(100), unique=False, nullable=False)
    articles = db.relationship(
        "Articles", backref=db.backref("Blogs", order_by="Articles.author_id")
    )


class Articles(db.Model):
    __tablename__ = "Articles"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Text, ForeignKey("Users.account_id"))
    title = db.Column(db.String(100), unique=False, nullable=False)
    subtitle = db.Column(db.String(500), unique=False, nullable=False)
    topic = db.Column(db.String(50), unique=False, nullable=False)
    image = db.Column(db.Text, unique=False, nullable=True)
    date = db.Column(db.String(100), unique=False, nullable=False)
    article = db.Column(db.Text, unique=False, nullable=False)


class ArticleLikes(db.Model):
    __tablename__ = "ArticleLikes"
    id = db.Column(db.Integer, primary_key=True)
    liker_id = db.Column(db.Text, ForeignKey("Users.account_id"))
    article_id = db.Column(db.Integer, ForeignKey("Articles.id"))


class FollowedBlogs(db.Model):
    __tablename__ = "FollowedBlogs"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("Users.account_id"))
    blog = db.Column(db.Integer, ForeignKey("Blogs.id"))


with application.app_context():
    db.create_all()
