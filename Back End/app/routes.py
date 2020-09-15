#routes : cria as rotas de html nos metodos
from app import app ,login_manager,db
from app import mail
from flask import render_template, session,redirect,request,request_started,request_started,jsonify
from flask_mail import Message 
from flask_login import login_required,logout_user,current_user,login_user
from app.banco_de_dados import Modelo_produto
from app.formulario import Form_usuario, Form_comida, Form_produto, Form_usuario_logar, Form_select
from app.funcoes import carregar_comidas, criar_controle
from os import path
from werkzeug.exceptions import HTTPException , InternalServerError, Unauthorized
# @login_manager.user_loader
# def load_user(cpf):
#     return Modelo_user.query.get(cpf)


@app.route('/')
def abrir_home():
    form = Form_comida()
    comidas = carregar_comidas()
    controle = 0
    controle, sub_controle = criar_controle(comidas)
    return render_template('home.html', current_user=current_user, sub_controle = sub_controle, comidas = comidas, form=form, controle=controle)
@app.route('/cadastrar',methods=["POST"])
# def inclur_cadastro():  
#     resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
#     dados = request.get_json() 
#     try:
#         usuario = Modelo_user(**dados) 
#         db.session.add(usuario)
#         db.session.commit()
#     except Exception as e:
#         resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
#     resposta.headers.add("Access-Control-Allow-Origin", "*")       
#     return resposta
# @app.route("/logar",methods=['GET','POST'])
# def logar():
#     resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
#     dados = request.get_json()
#     user = Modelo_user.query.filter_by(usuario = dados).first()
#     print(user)
#     if user is not None and user.check_senha(dados):
#         login_user(user)
#     return resposta

@app.route('/cadastro_produto',methods=["POST","GET"])
def incluir_produto():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        produto = Modelo_produto(**dados)
        db.session.add(produto)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")       
    return resposta
@app.route("/comidas")
def Buscar_comidas():
    comida = Modelo_produto.query.all()
    comida_json = [x.json() for x in comida] 
    comida_json = jsonify(comida_json)
    comida_json.headers.add("Access-Control-Allow-Origin", "*")
    return comida_json
        
# @app.route("/ver_usuarios")
# def ver_usuarios():
#     users = Modelo_user.query.all()
#     users_json = [x.json for x in users]
#     users_json = jsonify(users_json)
#     users_json.headers.add("Access-Control-Allow-Origin", "*")
#     return users_json

# @app.route("/alterar_dados")
# @login_required
# def alterar_dados():


#     return render_template("alterar.html",titulo = "Alterar",current_user=current_user)

