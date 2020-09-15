#formulario : pega os DADOS para criar o bd
from flask_wtf import FlaskForm
from wtforms import StringField, TextField, PasswordField, BooleanField, SubmitField , HiddenField
#wtf para criar formularios, no caso os formatos que vc vai utilizar
from wtforms.validators import DataRequired
from wtforms.validators import EqualTo, Email, Length
from wtforms import FileField, SelectField
from wtforms.fields.html5 import DateField
from flask_wtf.file import FileRequired, FileAllowed
from flask_uploads import UploadSet, IMAGES
from wtforms.widgets import HiddenInput

class Form_usuario(FlaskForm):
    usuario = StringField('Nick Usuario', validators=[DataRequired()])
    sexo = StringField('Sexo', validators=[DataRequired()])
    cpf = StringField('Cpf', validators=[DataRequired()])
    cidade = StringField('Cidade', validators=[DataRequired()])
    estado = StringField('Estado', validators=[DataRequired()])
    bairro = StringField('Bairro', validators=[DataRequired()])
    senha = PasswordField('Senha', validators=[DataRequired()])
    senha_check = PasswordField("Confirmar Senha", validators=[DataRequired(), EqualTo('senha')])
    cep = StringField('CEP', validators=[DataRequired()])
    numero_imovel = StringField('Numero Imovel', validators=[DataRequired()])
    rua = StringField('Rua', validators=[DataRequired()])
    data_nacimento = StringField('Data Nacimento', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    foto = FileField('Imagem', validators=[FileAllowed(['jpg', 'png'],
                                           'Somente imagens!')])
    submit = SubmitField("Registrar")
    
class Form_produto(FlaskForm):
    pais_de_origem = StringField('Pais De Origem Do Prato', validators=[DataRequired()])
    ingredientes = StringField('Ingredientes', validators=[DataRequired()])
    descricao_produto = TextField('Descrição Do Jogo', validators=[DataRequired()],id='Descrição Do Jogo')
    nome_prato = StringField('Nome Do Prato', validators=[DataRequired()])
    foto = FileField('Imagem', validators=[FileAllowed(['jpg', 'png'],
                                           'Somente imagens!')])
    submit = SubmitField("Registrar")
class Form_usuario_logar(FlaskForm):
    usuario = StringField("Nome Usuário", validators=[DataRequired()])
    senha = PasswordField("Senha", validators=[DataRequired()])
    submit = SubmitField("Logar")
class Form_select(FlaskForm):
    lista = SelectField("")
    submit = SubmitField("")
class Form_comida(FlaskForm ,HiddenInput):
    hidden_comida = HiddenField(default="Não pegou o codigo do produto", widget=HiddenInput(input_type="hidden"))
    submit = SubmitField("Ler Mais")
