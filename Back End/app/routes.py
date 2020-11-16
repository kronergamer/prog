#routes : cria as rotas de html nos metodos
from app import app ,login_manager,db
from flask import request,jsonify
from app.banco_de_dados import Modelo_produto, Modelo_user, Modelo_pais
from os import path
from werkzeug.exceptions import HTTPException , InternalServerError, Unauthorized
@app.route("/logar", methods=["POST","GET"])
def logar():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    for i in dados:
        print(i)
    user = Modelo_user.query.filter_by(usuario = dados["nome"]).first()
    print(user.senha,"//", dados["senha"],user.senha == str(dados["senha"]))
    if user is not None or user.senha == str(dados["senha"]):
        print("entrou")
        user_json = user.json()
        user_json = jsonify(user_json)
        user_json.headers.add("Access-Control-Allow-Origin", "*")
        return user_json  
    return resposta  

@app.route('/cadastrar', methods=["post","get"])
def cadastrar():  
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    for i in dados:
        print(i)
    try:
        usuario = Modelo_user(**dados)
        db.session.add(usuario)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route('/cadastro_produto', methods=["POST","GET"])
def incluir_produto():
    print("entrou")
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    for i in dados:
        print(i)
    try:
        print("entrou")
        produto = Modelo_produto(**dados)
        pais = Modelo_pais.query.filter_by(nome_do_pais = dados["pais_de_origem"]).first()
        produto.pais_de_origem = pais.codigo_pais
        produto.gerar_codigoproduto()
        db.session.add(produto)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")       
    return resposta
@app.route("/comidas")
def Buscar_comidas():
    comida = Modelo_produto.query.all()
    for i in comida:
        pais = Modelo_pais.query.filter_by(codigo_pais = i.pais_de_origem).first()
        i.pais_de_origem = pais
    comida_json = [x.json() for x in comida] 
    comida_json = jsonify(comida_json)
    comida_json.headers.add("Access-Control-Allow-Origin", "*")
    return comida_json
@app.route("/deletar_produto", methods=["POST","GET"])        
def deletar_produto():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    print(dados)
    try:
        produto = Modelo_produto.query.filter_by(titulo = dados["titulo"]).first()
        print(produto)
        db.session.delete(produto)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta
