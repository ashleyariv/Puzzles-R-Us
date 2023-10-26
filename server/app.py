from flask import request, Flask, make_response, jsonify, session
from models import db, User, Expense, Category
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt 


app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(port = 5555, debug = True)