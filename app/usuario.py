from flask_login import UserMixin,AnonymousUserMixin


class User_login():
    def __init__(self,usuario,senha,status):
        self.usuario = usuario
        self.status = status
        self.senha = senha
