#routes : cria as rotas de html nos metodos
from app import app ,login_manager,db
from app import mail
from flask import render_template, session,redirect,request,request_started,request_started
from flask_mail import Message 
from flask_login import login_required,logout_user,current_user,login_user
from app.banco_de_dados import Modelo_user,Modelo_produto
from app.formulario import Form_usuario, Form_comida, Form_produto, Form_usuario_logar, Form_select
from app.funcoes import carregar_comidas, carregar_usuarios, criar_controle
from os import path
from werkzeug.exceptions import HTTPException , InternalServerError, Unauthorized
@login_manager.user_loader
def load_user(cpf):
    return Modelo_user.query.get(cpf)


@app.route('/')
def abrir_home():
    form = Form_comida()
    comidas = carregar_comidas()
    controle = 0
    controle, sub_controle = criar_controle(comidas)
    return render_template('home.html', current_user=current_user, sub_controle = sub_controle, comidas = comidas, form=form, controle=controle)
@app.route('/menu')
def abrir_menu():
    sub_controle=0
    form = Form_comida()
    comidas = carregar_comidas()
    controle=0
    controle, sub_controle=criar_controle(comidas)
    return render_template('home.html', current_user=current_user, comidas=comidas, form=form, controle=controle, sub_controle=sub_controle)
@app.route('/cadastrar',methods=["post","get"])
def cadastrar():  
    mensagem=[] 
    len_lista=0
    form = Form_usuario()
    print(type(form.foto.data))
    print(type(form.usuario.data))
    if form.validate_on_submit():
        usuario = Modelo_user() 
        usuario.usuario = form.usuario.data
        usuario.sexo = form.sexo.data
        usuario.set_cpf(form.cpf.data)
        usuario.cidade = form.cidade.data
        usuario.estado = form.estado.data
        usuario.cep = form.cep.data
        usuario.rua = form.rua.data
        usuario.data_de_nacimento = form.data_nacimento.data
        usuario.numero_imovel = form.numero_imovel.data
        usuario.set_email(form.email.data)
        usuario.set_senha(form.senha.data)
        usuario.preferencia = False
        nome_arquivo = str(form.foto.data.filename)
        form.foto.data.save(
                                path.join(app.config["UPLOAD_FOLDER"],
                                             nome_arquivo)
                                )
        usuario.caminho_foto="images/perfil/"+nome_arquivo
        usuario.set_administrador(True)
        if usuario.cpf is not None and usuario.email is not None:
            db.session.add(usuario)
            db.session.commit()
            return redirect("/menu")
        elif usuario.cpf is None and usuario.email is None:
            mensagem.append(" Email já existente")
            mensagem.append(" CPF já existente")
            len_lista=len(mensagem)
        elif usuario.email is None:
            mensagem.append(" Email já existente")
        else:
            mensagem.append(" CPF já existente")
    return render_template("cadastro.html", form=form,title="cadastro", mensagem=mensagem, len_lista=len_lista)
@app.route("/logar",methods=['GET','POST'])
def logar():
    form = Form_usuario_logar()
    print("--",form.validate_on_submit())
    if form.validate_on_submit():
        user = Modelo_user.query.filter_by(usuario = form.usuario.data).first()
        print(user)
        if user is not None and user.check_senha(form.senha.data):
            login_user(user)
            return redirect("/menu")
    return render_template("logar.html", form=form, title="logar")

@app.route('/cadastro_produto',methods=["POST","GET"])
def cadastrar_produto():
    form = Form_produto()
    print(type(form.foto.data))
    print(form.validate_on_submit())
    if form.validate_on_submit():
        produto = Modelo_produto()
        produto.gerar_codigoproduto()
        produto.pais_de_origem = form.pais_de_origem.data
        produto.ingredientes = form.ingredientes.data
        produto.descricao = form.descricao_produto.data
        produto.nome_do_prato = form.nome_prato.data
        nome_arquivo = form.foto.data.filename
        produto.caminho_foto="images/perfil/"+nome_arquivo
        form.foto.data.save(
                                path.join(app.config["UPLOAD_FOLDER"],
                                             nome_arquivo)
                                )
        produto.criador = current_user.cpf
        db.session.add(produto)
        db.session.commit()
        return redirect("/menu")
    return render_template("cadastro_produto.html",form=form,current_user=current_user, title = "cadastrar_produto")
@app.route("/Buscar")
def Buscar():
    comida_buscado = request.args.get("Buscar")
    comida = Modelo_produto.query.filter(Modelo_produto.titulo.like(r"%{}%".format(comida_buscado))).all()
    return render_template("busca.html",titulo="buscar",current_user=current_user,comida = comida)
        
@app.route("/ver_usuarios")
def ver_usuarios():
    usuarios = Modelo_user.query.all()
    return render_template("buscar.html", titulo = "Lista Usuarios",current_user=current_user,lista_de_usuarios = usuarios)
@app.route("/alterar_dados")
@login_required
def alterar_dados():


    return render_template("alterar.html",titulo = "Alterar",current_user=current_user)

@app.route("/prato", methods=["POST","GET"])
def abrir_pagina_da_comida():
    form = Form_comida
    comida=Modelo_produto.query.filter_by(codigo_produto=form.hidden_comida.data)
    
    render_template("comida.html",comida=comida,form=form,titulo=comida.titulo,current_user=current_user)

@app.errorhandler(Unauthorized)
def abrir_cadastro_forçado(e):
    return redirect("/logar")
app.register_error_handler(401,abrir_cadastro_forçado)
