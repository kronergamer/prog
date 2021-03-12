from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from random import randint , choice 


class Modelo_user(db.Model,UserMixin):
    # av6
    usuario = db.Column(db.String(15),unique=True , nullable=False)
    cpf = db.Column(db.String(15),primary_key=True)    
    cidade = db.Column(db.String(15))
    estado = db.Column(db.String(15))
    caminho_foto = db.Column(db.String(20), nullable=True)
    cep = db.Column(db.String(15))  
    rua = db.Column(db.String(45))
    numero_imovel = db.Column(db.String(15))
    data_de_nacimento = db.Column(db.String(15),nullable=False)    
    email = db.Column(db.String(120), unique=True, nullable=False) 
    senha =db.Column(db.String(15) , nullable=False)
    sexo = db.Column(db.String(2), unique=False, nullable=False)

    def get_id(self):
        return self.cpf

    def check_senha(self, password):
        print(self.senha ,password,self.senha==password)
        return self.senha== password

    def __repr__(self):
        return 'Usuario com cpf {}'.format(self.usuario) 

    def set_administrador(self,valor): 
        self.is_administrador = valor
    def set_cpf(self,cpf):
        lista_cpfs=[]
        usuarios = Modelo_user.query.all()
        for usuario in usuarios:
            lista_cpfs.append(usuario[1])
        if cpf in lista_cpfs:
            self.cpf= None
        self.cpf = cpf 
    def set_email(self,email):
        lista_emails=[]
        usuarios = Modelo_user.query.all()
        for usuario in usuarios:
            lista_emails.append(usuario[8])
        if email in lista_emails:
            self.email= None
        self.email = email 
    def json(self):
        return{
        "usuario" : self.usuario, 
        "cpf" :  self.cpf,   
        "cidade" : self.cidade, 
        "estado" : self.estado,
        "cep" : self.cep,  
        "rua" : self.rua ,
        "numero_imovel" : self.numero_imovel, 
        "data_de_nacimento" : self.data_de_nacimento,     
        "email" : self.email,  
        "senha" : self.senha,
        "sexo" : self.sexo, 
        }

class Modelo_produto(db.Model):
    # av1
    pais_de_origem = db.Column(db.String(15),nullable=False)
    ingredientes = db.Column(db.String(15),nullable=False)
    caminho_foto = db.Column(db.String(20), nullable=True)
    descricao = db.Column(db.String(120), nullable=False)
    nome_do_prato = db.Column(db.String(35),unique=True , nullable=False)
    codigo_produto = db.Column(db.String(15),primary_key=True)
    
    def gerar_codigoproduto(self):
        self.codigo_produto=""
        for i in range(15):
            codificador = str(choice(["A","B","C","D","E","F","G","H","I","J","K","L","M","N"
                                    ,"O","P","Q","R","S","T","U","V","W","X","Y","Z"])) 
            valor = randint(0,10)
            codigo = valor * (dicionario[codificador])
            self.codigo_produto += codificador + str(codigo) 
    def json(self):
        return {
        "codigo_produto" : self.codigo_produto,
        "pais_de_origem" : self.pais_de_origem,
        "ingredientes" : self.ingredientes,
        "caminho_foto" : self.caminho_foto,
        "descricao" : self.descricao,
        "nome_do_prato" : self.nome_do_prato,


        }
class Modelo_pais(db.Model):
    # av6
    nome_do_pais = db.Column(db.String(35),unique=True , nullable=False)
    codigo_pais = db.Column(db.String(15), primary_key=True)
    caminho_foto = db.Column(db.String(20), nullable=True)
    def gerar_codigo(self):
        self.codigo_produto=""
        for i in range(15):
            codificador = str(choice(["A","B","C","D","E","F","G","H","I","J","K","L","M","N"
                                    ,"O","P","Q","R","S","T","U","V","W","X","Y","Z"])) 
            valor = randint(0,10)
            codigo = valor * (dicionario[codificador])
            self.codigo_produto += codificador + str(codigo) 
    def json(self):
        return {
        "codigo_pais" : self.codigo_pais,
        "caminho_foto" : self.caminho_foto,
        "nome_do_pais" : self.nome_do_pais,


        }
def testar_banco():
    # av6
    pais = Modelo_pais("")
    comida = Modelo_produto("")
    pais.caminho_foto = "..\Front End\static\images\Brasil.jpg"
    pais.codigo_pais = "00001"
    pais.nome_do_pais = "Brasil"
    comida.caminho_foto = ""
    comida.codigo_produto = "0001"
    comida.nome_do_prato = "Feijão com Arroz"
    comida.descricao = "Feijão com arroz"
    comida.pais_de_origem = "00001"
    comida.ingredientes = "Feijão e arroz"
    db.session.add(pais)
    db.session.add(comida)
    db.session.commit()


dicionario={ "A": 1,
            "B":2,
            "C":3,
            "D":4,
            "E":5,
            "F":6,
            "G":7,
            "H":8,
            "I":9,
            "J":10,
            "K":11,
            "L":12,
            "M":13,
            "N":14,
            "O":15,
            "P":16,
            "Q":17,
            "R":18,
            "S":19,
            "T":20,
            "U":21,
            "V":22,
            "W":23,
            "X":24,
            "Y":25,
            "Z":26
}


