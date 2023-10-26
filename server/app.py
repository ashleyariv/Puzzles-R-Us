from flask import request, Flask, make_response, jsonify, session
from models import db, User, Expense, Category
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt 
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'mysecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False


bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
db.init_app(app)

@app.post('/')
def user_login():
    data = request.json
    user = User.query.filter(User.username == data.get('username')).first()
    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'Error': 'Invalid username and/or password'}, 401

@app.post('/user')
def create_user() :
    data = request.json
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(email = data.get('email'), username = data.get('username'), password = password)
    db.session.add(user)
    db.session.commit()
    session['user_id'] = user.id
    return user.to_dict(), 201

@app.get('/check_login')
def check_login():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    else:
        return {'Error': 'Not logged in.'}, 401

@app.get('/<string:username>/home')
def expenses_page(username):
    user = User.query.filter(User.username == username).first()
    if user:
        expense = [expense.to_dict() for expense in user.expenses]
        user_dict = user.to_dict()
        user_dict['expenses'] = expense
        return make_response(expense, 200)
    return {'Error' : 'Error'}

@app.delete('/logout')
def logout():
    session.pop('user_id')
    return {'Success' : 'User is logged out.'}, 200

@app.get('/expenses/<int:id>')
def get_expense_by_id(id):
    expense = Expense.query.filter(Expense.id == id).first()
    if not expense:
        return make_response(jsonify({'Error': 'Expense does not exist,'}), 404)
    return make_response(jsonify(expense.to_dict()), 200)

@app.post('/<string:username>/home')
def create_expense(username):
    data = request.json
    user = User.query.filter(User.username == username).first()
    category = Category.query.filter(Category.name == data.get('category')).first()
    if not user:
        return make_response(jsonify({'Error' : 'User not found.'}), 404)
    try:
        new_expense = Expense(amount = data.get('amount'), date = data.get('date'), company_name = data.get('company_name'), description = data.get('description'), category_id = category.id, user_id = data.get('user_id'))
        print('NEW EXPEENSE', new_expense)
        db.session.add(new_expense)
        db.session.commit()
        return make_response(jsonify(new_expense.to_dict()), 200)
    except Exception as e:
        return make_response(jsonify({'Error': 'Invalid input. ' + str(e)}), 405)

if __name__ == '__main__':
    app.run(port = 5555, debug = True)