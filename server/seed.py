from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Expense, Category
from random import randint, choice, choices
from datetime import datetime

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        Category.query.delete()

        categories = []
        
        categories.append(Category(name = 'Food'))
        categories.append(Category(name = 'Transportation/Travel'))
        categories.append(Category(name = 'Supplies'))
        categories.append(Category(name = 'Rentals'))
        categories.append(Category(name = 'Advertising'))
        categories.append(Category(name = 'Permits'))
        categories.append(Category(name = 'Medical'))
        categories.append(Category(name = 'Misc'))

        db.session.add_all(categories)
        db.session.commit()