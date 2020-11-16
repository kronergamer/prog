$(function() { // quando o documento estiver pronto/carregado
    const usuario_corrent = { nome : "nome", senha : "senha", cpf : "cpf", cep : "cep", cidade : "cidade", estado : "estado", rua : "rua",
data_de_nacimento : "data_de_nacimento", numero_imovel : "numero_imovel", email : "email", sexo : "sexo", carteira : "carteira", 
caminho_foto : "caminho_foto", carrinho : "carrinho", administrador : "administrador", preferencia: "preferencia", jogos : "jogos"};
    const pais = { codigos: " "};
    // função para exibir pessoas na tabela
    // function exibir_usuarios() {
    //     $.ajax({
    //         url: 'http://localhost:5000/ver_usuario',
    //         method: 'GET',
    //         dataType: 'json', 
    //         success: montar, 
    //         error: function() {
    //             alert("erro ao ler dados, verifique o backend");
    //         }
    //     });
    
    //     function montar (usuarios) {
    //         $('#corpoTabelaUsesr').empty();
    //         mostrar_conteudo("tabelaUsers");       
    //         for (var i in usuarios) { 
    //             lin = '<tr>' + 
    //             '<td>' + pessoas[i].nome + '</td>' + 
    //             '<td>' + pessoas[i].email + '</td>' + 
    //             '<td>' + pessoas[i].telefone + '</td>' + 
    //             '</tr>';
    //             $('#corpoTabelaUsers').append(lin);
    //         }
    //     }
    // }
    function exibir_comidas() {
        $.ajax({
            url: 'http://localhost:5000/comidas',
            method: 'GET',
            dataType: 'json', 
            success: mostrar_comidas, 
            error: function() {
            alert("erro ao ler dados, verifique o backend");
            }
        });
        function mostrar_comidas (comidas) {
            $('#comidaNaMesa').empty();
            mostrar_conteudo("conteudoInicial");
            if (pais.codigos == ' '){
               (pais.codigos = comida[0].pais_de_origem.codigo_pais)
            }
            for (var u in pais.codigos.split('/')) { 
                lin = '<div class="card-group" href="#" id =' + u + '></div>' 
                $('#conteudoInicial').append(lin);    
            for (var i in comidas) { 
                if (not (comida[i].pais_de_origem.codigo_pais in pais.codigos)){
                (pais.codigos = pais.codigos+'/'+comida[i].pais_de_origem.codigo_pais) 
                }
                if (comida[i].pais_de_origem.codigo_pais == u){
                (lin = '<div class="card">' + 
                '<div class="card-body">'+'<h3 class ="card-title">' + comidas[i].nome_do_prato + '</h3>' + 
                '<p>' + comidas[i].descricao + '</p>' + 
                '<p>' + comidas[i].ingredientes + '</p>' +
                 '</div>'  + '</div>');
                ($('#'+u).append(lin));
                }
            }
                $('#conteudoInicial').append('</div>');
        }
    }
};
    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#tabelaUsers").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('invisible');      
    };

    // código para mapear o click do link Listar
    // $(document).on("click", "#linkVerUsuario", function() {
    //     exibir_usuarios();
    // });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        exibir_comidas();
    });
    $(document).on("click", "#btDeletarComida", function() {
        nome_do_prato = $("#campoNome").val();
        var dados = JSON.stringify({nome_do_prato : nome_do_prato});
        $.ajax({
            url: 'http://localhost:5000/deletar_produto',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: comidaDeletada, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function comidaDeletada (retorno) {
            if (retorno.resultado == "ok") { 
                // informar resultado de sucesso
                alert("Jogo Deletado com sucesso!");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    $(document).on("click", "#btLogarUsuario", function() {
        nome = $("#campoNomeUsuario").val();
        senha = $("#campoSenha").val();
        var dados = JSON.stringify({ nome: nome, senha: senha});
            $.ajax({
            url: 'http://127.0.0.1:5000/logar',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: colocarUsuarioCorrente, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function colocarUsuarioCorrente (user_json) {
            $('#usuariofuncoes').empty();
            mostrar_conteudo("conteudoInicial");       
            usuario_corrent.nome = user_json.usuario;
            usuario_corrent.senha = user_json.senha;
            usuario_corrent.cep = user_json.cep;
            usuario_corrent.numero_imovel = user_json.numero_imovel;
            usuario_corrent.rua = user_json.rua;
            usuario_corrent.cidade = user_json.cidade;
            usuario_corrent.estado = user_json.estado;
            usuario_corrent.caminho_foto = user_json.caminho_foto;
            usuario_corrent.data_de_nacimento = user_json.data_de_nacimento;
            usuario_corrent.sexo = user_json.sexo;
            usuario_corrent.carteira = user_json.carteira;
            usuario_corrent.carrinho = user_json.carrinho;
            usuario_corrent.email = user_json.email;
            usuario_corrent.administrador = user_json.administrador;
            usuario_corrent.preferencia = user_json.preferencia;
            usuario_corrent.jogos = user_json.jogos;
                lin =  
                '<a class="nav-link dropdown-toggle" href=" " id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src='+ usuario_corrent.caminho_foto +'height="32" width="32"></a>' + 
                '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#modalIncluirUsuario">' + usuario_corrent.nome + '</a>' + 
                '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#modalLogarUsuario">' + "Sair" + '</a>' ;
                $('#usuariofuncoes').append(lin);
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btIncluirComida", function() {
        //pegar dados da tela
        pais_de_origem = $("#campoPaisDeOrigem").val();
        ingredientes = $("#campoIngredientes").val();
        caminho_foto = $("#campoCaminhoFoto").val();
        descricao = $("#campoDescricao").val();
        nome_do_prato = $("#campoNomeDoPrato").val();
        // preparar dados no formato json
        var dados = JSON.stringify({  pais_de_origem : pais_de_origem, ingredientes : ingredientes,  caminho_foto : caminho_foto, descricao : descricao, nome_do_prato: nome_do_prato});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastro_produto',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: comidaIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function comidaIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Comida incluída com sucesso!");
                // limpar os campos
                $("#campoPaisDeOrigem").val("");
                $("#campoIgredientes").val("");
                $("#campoCaminhofoto").val("");
                $("#campoDescricao").val("");
                $("#campoNomeDoPrato").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
    $(document).on("click", "#btIncluirUsuario", function() {
        //pegar dados da tela
        usuario = $("#campoNomeDoUsuario").val();
        cpf = $("#campoCPF").val();
        caminho_foto = $("#campoCaminhoFoto").val();
        cidade = $("#campoCidade").val();
        estado = $("#campoEstado").val();
        cep = $("#campoCEP").val();
        rua = $("#campoRua").val();
        numero_imovel = $("#campoNumeroImovel").val();
        data_de_nacimento = $("#campoDataNacimento").val();
        email = $("#campoEmail").val();
        senha = $("#campoSenha").val();
        sexo = $("#campoSexo").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ usuario: usuario, caminho_foto:caminho_foto, email: email, sexo: sexo,senha:senha,data_de_nacimento:data_de_nacimento,numero_imovel:numero_imovel,rua:rua,cpf:cpf,cidade:cidade,estado:estado,cep:cep });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: userIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function  userIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Pessoa incluída com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoEmail").val("");
                $("#campoTelefone").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    // código a ser executado quando a janela de inclusão de pessoas for fechada
    $('#modalIncluirComida').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#tabelaPessoas").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_usuarios();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");
    exibir_comidas();
});
