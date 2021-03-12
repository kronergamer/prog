# init : pacote que inicia todas as variaveis e bibliotecas utilizadas
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_cors import CORS
from app.config import Config



app = Flask (__name__,static_url_path='/static')
mail = Mail(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
CORS(app)
from app.banco_de_dados import db
from app import routes


