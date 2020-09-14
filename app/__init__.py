# init : pacote que inicia todas as variaveis e bibliotecas utilizadas
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_login import LoginManager
from app.config import Config



app = Flask (__name__,static_url_path='/static')
mail = Mail(app)
login_manager = LoginManager()
login_manager.init_app(app)

app.config.from_object(Config)
db = SQLAlchemy(app)

from app.banco_de_dados import db
from app import routes


