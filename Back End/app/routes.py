#routes : cria as rotas de html nos metodos
from app import app ,db
from flask import request,jsonify
from app.banco_de_dados import Modelo_produto, Modelo_user, Modelo_pais
from os import path
from werkzeug.exceptions import HTTPException , InternalServerError, Unauthorized
global user_corrent 
user_corrent = None

@app.route("/logar", methods=["POST","GET"])
def logar():
    # av6
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    for i in dados:
        print(i)
    user = Modelo_user.query.filter_by(usuario = dados["nome"]).first()
    print(user.senha,"//", dados["senha"],user.senha == str(dados["senha"]))
    if user is not None and user.senha == str(dados["senha"]):
        print("entrou")
        user_json = user.json()
        user_json = jsonify(user_json)
        user_corrent = user_json
        user_json.headers.add("Access-Control-Allow-Origin", "*")
        user_corrent.headers.add("Access-Control-Allow-Origin", "*")
        return user_json  
    return resposta
@app.route("/sair", methods=["post","get"])
def logout():
    global usuario_corrente
    usuario_corrente = None  

@app.route('/cadastrar', methods=["post","get"])
def cadastrar():  
    # av6
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    for i in dados:
        print(i)
    try:
        usuario = Modelo_user(**dados)
        path.join(app.config["UPLOAD_FOLDER"],
                            dados["caminho_foto"])
        usuario.caminho_foto="front_end/images/perfil/"+dados["caminho_foto"]
        db.session.add(usuario)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route('/cadastro_produto', methods=["POST","GET"])
def incluir_produto():
    # av1
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
        path.join(app.config["UPLOAD_FOLDER"],
                            dados["caminho_foto"])
        produto.caminho_foto="front_end/images/perfil/"+dados["caminho_foto"]
        db.session.add(produto)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")       
    return resposta
@app.route('/cadastro_pais', methods=["POST","GET"])
def incluir_pais():
    # av6
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    for i in dados:
        print(i)
    try:
        print("entrou")
        pais = Modelo_pais(**dados)
        pais.gerar_codigoproduto()
        path.join(app.config["UPLOAD_FOLDER"],
                            dados["caminho_foto"])
        pais.caminho_foto="front_end/images/perfil/"+dados["caminho_foto"]
        db.session.add(pais)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")       
    return resposta
@app.route("/comidas")
def Buscar_comidas():
    # av1 av6 
    paises = Modelo_pais.query.all()
    comida = Modelo_produto.query.all()
    paises_json = [x.json() for x in paises]
    comida_json = [x.json() for x in comida] 
    comida_json = jsonify(comida_json)
    comida_json.headers.add("Access-Control-Allow-Origin", "*")
    return comida_json,paises_json
@app.route("/deletar_produto", methods=["POST","GET"])        
def deletar_produto():
    # av1
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
@app.route("/deletar_usuario", methods=["POST","GET"])        
def deletar_usuario():
    # av6
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    print(dados)
    try:
        usuario = Modelo_user.query.filter_by(cpf = dados["cpf"]).first()
        print(usuario)
        db.session.delete(usuario)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta
@app.route("/deletar_pais", methods=["POST","GET"])        
def deletar_pais():
    # av6
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    print(dados)
    try:
        pais = Modelo_pais.query.filter_by(nome_do_pais = dados["nome_do_pais"]).first()
        print(pais)
        db.session.delete(pais)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta
@app.route("/TestarClasses", methods={"POST","GET"})
    pass
@app.route("/ver_usuario", methods=["POST","GET"])
def ver_usuarios():
    # av6
    users = Modelo_user.query.all()
    users_json  = [x.json() for x in users]
    users_json = jsonify(users_json)
    users_json.headers.add("Access-Control-Allow-Origin", "*")
    return users_json    