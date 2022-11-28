from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, DateTime, ForeignKey

db = SQLAlchemy()


class Blogs(db.Model):
    __tablename__ = "Blogs"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Text, unique=True, nullable=False)
    author_name = db.Column(db.Text, unique=False, nullable=False)
    blog_name = db.Column(db.String(100), unique=False, nullable=False)
    image = db.Column(db.Text, unique=False, nullable=True)
    articles = db.relationship(
        "Articles", backref=db.backref("Blogs", order_by="Articles.author_id")
    )


class Articles(db.Model):
    __tablename__ = "Articles"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Text, ForeignKey("Blogs.author_id"))
    title = db.Column(db.String(100), unique=False, nullable=False)
    subtitle = db.Column(db.String(500), unique=False, nullable=False)
    image = db.Column(db.Text, unique=False, nullable=True)
    created_at = db.Column(DateTime(timezone=True), default=func.now())
    # updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())
    text = db.Column(db.Text, unique=False, nullable=False)
    article_likes = db.relationship(
        "ArticleLikes", backref=db.backref("Blogs", order_by="ArticleLikes.liker_id")
    )


class ArticleLikes(db.Model):
    __tablename__ = "ArticleLikes"
    id = db.Column(db.Integer, primary_key=True)
    liker_id = db.Column(db.Text, unique=True, nullable=False)
    article_id = db.Column(db.Integer, ForeignKey("Articles.id"))


class FollowedBlogs(db.Model):
    __tablename__ = "FollowedBlogs"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text, unique=True, nullable=False)
    blog = db.Column(db.Integer, ForeignKey("Blogs.id"))
