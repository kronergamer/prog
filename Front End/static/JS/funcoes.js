$(function() { // quando o documento estiver pronto/carregado
    // função para exibir pessoas na tabela
    function exibir_usuarios() {
        $.ajax({
            url: 'http://localhost:5000/ver_usuario',
            method: 'GET',
            dataType: 'json', 
            success: montar, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
    
        function montar (usuarios) {
            $('#corpoTabelaUsesr').empty();
            mostrar_conteudo("tabelaUsers");       
            for (var i in usuarios) { 
                lin = '<tr>' + 
                '<td>' + pessoas[i].nome + '</td>' + 
                '<td>' + pessoas[i].email + '</td>' + 
                '<td>' + pessoas[i].telefone + '</td>' + 
                '</tr>';
                $('#corpoTabelaUsers').append(lin);
            }
        }
    }
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
        function mostrar_comidas (comidas,paises) {
            $('#comidaNaMesa').empty();
            mostrar_conteudo("conteudoInicial");
            if (paises.codigos == ' '){
               (paises.codigos = comida[0].pais_de_origem.codigo_pais)
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
    $(document).on("click", "#linkVerUsuario", function() {
        exibir_usuarios();
    });
    
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
    $(document).on("click", "#btDeletarUsuario", function() {
        cpf = $("#campoCPFDUsuario").val();
        var dados = JSON.stringify({cpf : cpf});
        $.ajax({
            url: 'http://localhost:5000/deletar_Usuario',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: usuarioDeletado, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function usuarioDeletado (retorno) {
            if (retorno.resultado == "ok") { 
                // informar resultado de sucesso
                alert("Usuario Deletado com sucesso!");
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
    $(document).on("click", "#btDeletarPais", function() {
        nome_do_pais = $("#campoNomeDPais").val();
        var dados = JSON.stringify({nome_do_pais : nome_do_pais});
        $.ajax({
            url: 'http://localhost:5000/deletar_pais',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: paisDeletado, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function paisDeletado (retorno) {
            if (retorno.resultado == "ok") { 
                // informar resultado de sucesso
                alert("pais Deletado com sucesso!");
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
                alert("Comida Deletado com sucesso!");
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
        senha = $("#campoLogSenha").val();
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
                lin =  
                '<a class="nav-link dropdown-toggle" href=" " id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src='+ user_json.caminho_foto +'height="32" width="32"></a>' + 
                '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+
                '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#modalIncluirUsuario">' + user_json.nome + '</a>' + 
                '<a class="dropdown-item" href="#" id "Sair">' + "Sair" + '</a>' ;
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
    $(document).on("click", "#btIncluirPais", function() {
        //pegar dados da tela
        pais = $("#campoPais").val();
        caminho_foto = $("#campoCaminhoFoto").val();
        // preparar dados no formato json
        var dados = JSON.stringify({  pais : pais, caminho_foto : caminho_foto, nome_do_prato: nome_do_prato});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastro_pais',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: paisIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function paisIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Comida incluída com sucesso!");
                // limpar os campos
                $("#campoPais").val("");
                $("#campoCaminhofoto").val("");
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
