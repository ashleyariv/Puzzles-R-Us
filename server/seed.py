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

        User.query.delete()
        Expense.query.delete()
        Category.query.delete()
        
        users = []
        # used_names: set[str] = set()

        for n in range(8):
            user = User(email = fake.email(), username = fake.first_name(), password = fake.word())
            # if user not in used_names:
            #     users.append(User(username = username))
            #     used_names.add(username)
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        categories = []

        for n in range(8):
            category = Category(name = fake.city())
            categories.append(category)

        db.session.add_all(categories)
        db.session.commit()

        expenses = []

        for n in range(8):
            expense = Expense(amount = fake.pyint(), date = fake.date_this_decade(), company_name = fake.catch_phrase(), description = fake.text(), category_id = choice(categories).id, user_id = choice(users).id)
            expenses.append(expense)

        db.session.add_all(expenses)
        db.session.commit()