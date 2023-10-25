from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Expense, Category
from random import randint, choice, choices

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Expense.query.delete()
        Category.query.delete()
        
        users = []

        for n in range(8):
            user = User(email = fake.email(), username = fake.first_name(), password = fake.word())
            users.append(user)
        db.session.add_all(users)
        db.session.commit()


        expenses = []

        for n in range(8):
            expense = Expense(amount = fake.number(), date = fake.date(), )
            posts.append(content)

        db.session.add_all(posts)
        db.session.commit()

        comments = []

        for n in range(20):
            text = Comment(text = fake.name(), profile_id = choice(profiles).id, post_id = choice(posts).id)
            comments.append(text)

        db.session.add_all(comments)
        db.session.commit()

    