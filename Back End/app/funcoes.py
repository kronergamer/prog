from app.banco_de_dados import Modelo_produto 
from app import db
# def carregar_usuarios(usuario,current_user):
#     if usuario is None:
#         usuarios = Modelo_user.query.all()
#         return usuarios
#     usuario= Modelo_user.quary.filter_by(cpf=current_user.cpf)
#     return usuario
def carregar_comidas(genero=None):
    comidas = Modelo_produto.query.all()
    if comidas is None:
        return []
    print(comidas)
    return comidas
  
def criar_controle(comidas):
    sub_controle=[] 
    controle = 0
    for comida in comidas:
        if not comida.pais_de_origem in sub_controle:
            sub_controle.append(comida.pais_de_origem)
            controle += 1
    return controle, sub_controle







