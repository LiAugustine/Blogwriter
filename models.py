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
    blogs = db.relationship(
        "Blogs", backref=db.backref("Users", order_by="Blogs.author_id")
    )


class Blogs(db.Model):
    __tablename__ = "Blogs"
    id = db.Column(db.Integer, primary_key=True)
    blog_name = db.Column(db.String(100), unique=True, nullable=False)
    author_name = db.Column(db.String(100), ForeignKey("Users.name"))
    author_picture = db.Column(db.Text, ForeignKey("Users.picture"))
    author_id = db.Column(db.String(100), ForeignKey("Users.id"))
    articles = db.relationship(
        "Articles", backref=db.backref("Blogs", order_by="Articles.author_id")
    )


class Articles(db.Model):
    __tablename__ = "Articles"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False, nullable=False)
    subtitle = db.Column(db.String(500), unique=False, nullable=False)
    topic = db.Column(db.String(50), unique=False, nullable=False)
    image = db.Column(db.Text, unique=False, nullable=True)

    author_name = db.Column(db.String(100), ForeignKey("Users.name"))
    author_picture = db.Column(db.Text, ForeignKey("Users.picture"))
    author_id = db.Column(db.String(100), ForeignKey("Users.id"))

    date = db.Column(db.String(100), unique=False, nullable=False)
    article = db.Column(db.Text, unique=False, nullable=False)
    likes = db.relationship(
        "ArticleLikes",
        backref=db.backref("Articles", order_by="ArticleLikes.article_id"),
    )


class ArticleLikes(db.Model):
    __tablename__ = "ArticleLikes"
    id = db.Column(db.Integer, primary_key=True)
    rater_id = db.Column(db.Text, ForeignKey("Users.account_id"))
    article_id = db.Column(db.Integer, ForeignKey("Articles.id"))


with application.app_context():
    db.create_all()
