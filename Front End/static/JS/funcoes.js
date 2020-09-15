$(function() { // quando o documento estiver pronto/carregado
    
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
            for (var i in comidas) { 
                lin = '<div class="card">' + 
                '<div class="card-body">'+'<h3 class ="card-title">' + comidas[i].nome_do_prato + '</h3>' + 
                '<p>' + comidas[i].descricao + '</p>' + 
                '<p>' + comidas[i].ingredintes + '</p>' +
                 '</div>'  + '</div>';
                $('#corpoTabelaUsers').append(lin);
            }
        }
    }
    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#tabelaUsers").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('invisible');      
    }

    // código para mapear o click do link Listar
    // $(document).on("click", "#linkVerUsuario", function() {
    //     exibir_usuarios();
    // });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        exibir_comidas();
    });

    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btIncluirComida", function() {
        //pegar dados da tela
        codigo_produto = $("#campoCodigoProduto").val();
        pais_de_origem = $("#campoPaisDeOrigem").val();
        ingredintes = $("#campoIngredientes").val();
        caminho_foto = $("#campoCaminhofoto").val();
        descricao = $("#campoDescricao").val();
        nome_do_prato = $("#campoNomeDoPrato").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ codigo_produto : codigo_produto, pais_de_origem : pais_de_origem, ingredintes : ingredintes,  caminho_foto : caminho_foto, descricao : descricao, nome_do_prato: nome_do_prato});
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
                alert("Pessoa incluída com sucesso!");
                // limpar os campos
                $("#campoCodigoProduto").val("");
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
    // $(document).on("click", "#btIncluirUsuario", function() {
    //     //pegar dados da tela
    //     nome = $("#campoNome").val();
    //     cpf = $("#campoCpf").val();
    //     cidade = $("#campoCidade").val();
    //     estado = $("#campoEstado").val();
    //     cep = $("#campoCep").val();
    //     rua = $("#campoRua").val();
    //     numero_imovel = $("#campoNumeroImovel").val();
    //     data_de_nacimento = $("#campoDataNacimento").val();
    //     email = $("#campoEmail").val();
    //     senha = $("#campoSenha").val();
    //     sexo = $("#campoSexo").val();
    //     // preparar dados no formato json
    //     var dados = JSON.stringify({ nome: nome, email: email, telefone: tel });
    //     // fazer requisição para o back-end
    //     $.ajax({
    //         url: 'http://localhost:5000/cadastro',
    //         type: 'POST',
    //         dataType: 'json', // os dados são recebidos no formato json
    //         contentType: 'application/json', // tipo dos dados enviados
    //         data: dados, // estes são os dados enviados
    //         success: userIncluido, // chama a função listar para processar o resultado
    //         error: erroAoIncluir
    //     });
    //     function  userIncluido (retorno) {
    //         if (retorno.resultado == "ok") { // a operação deu certo?
    //             // informar resultado de sucesso
    //             alert("Pessoa incluída com sucesso!");
    //             // limpar os campos
    //             $("#campoNome").val("");
    //             $("#campoEmail").val("");
    //             $("#campoTelefone").val("");
    //         } else {
    //             // informar mensagem de erro
    //             alert(retorno.resultado + ":" + retorno.detalhes);
    //         }            
    //     }
    //     function erroAoIncluir (retorno) {
    //         // informar mensagem de erro
    //         alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
    //     }
    // });

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
});