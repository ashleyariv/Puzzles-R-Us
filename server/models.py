from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from datetime import datetime

metadata = MetaData(
    naming_convention = {
        "ix": 'ix_%(column_0_label)s',
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s"
    }
)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin): 
    __tablename__ = 'user_table'
    serialize_rules = ('-expenses.user',)

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String , unique = True, nullable = False)
    username = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)

    expenses = db.relationship('Expense', back_populates = 'user', cascade = 'all, delete-orphan')

    @validates('username')
    def valid_username(self, key, username):
        existing_user = User.query.filter(User.username == username).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError("Username already exists. Please choose a different one.")
        return username

class Expense(db.Model, SerializerMixin):
    __tablename__ = 'expense_table'
    serialize_rules = ('-user.expenses', '-category.expenses')

    id = db.Column(db.Integer, primary_key = True)
    amount = db.Column(db.Float, nullable = False)
    date = db.Column(db.Date, nullable = False) 
    company_name = db.Column(db.String(200), nullable = False)
    description = db.Column(db.String(300), nullable = False)
    paid = db.Column(db.Boolean, default = False)
    category_id = db.Column(db.Integer, db.ForeignKey('category_table.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'), nullable = False)

    user = db.relationship('User', back_populates = 'expenses')
    category = db.relationship('Category', back_populates = 'expenses')

class Category(db.Model, SerializerMixin):
    __tablename__ = 'category_table'
    serialize_rules = ('-expenses.category',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False) 
    
    expenses = db.relationship('Expense', back_populates = 'category')
