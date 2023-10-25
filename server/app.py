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

@app.route('/')
def index():
    return 