from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, DateTime, ForeignKey

db = SQLAlchemy()


class Blogs(db.Model):
    __tablename__ = "Blogs"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Text, unique=True, nullable=False)
    author_name = db.Column(db.Text, unique=False, nullable=False)
    blog_name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(2000), unique=False, nullable=True)
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


class FollowedBlogs(db.Model):
    __tablename__ = "FollowedBlogs"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text, unique=True, nullable=False)
    blog_author_id = db.Column(db.Text, ForeignKey("Blogs.author_id"))
