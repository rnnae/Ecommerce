//CADASTRO

//carrega o JSON do cadastro no localStorage e transforma em um Array
function cadastro() {
    let arrayCadastro = [];
    if (JSON.parse(localStorage.getItem("cadastros"))) {
        arrayCadastro = JSON.parse(localStorage.getItem("cadastros"));
    }
    return arrayCadastro;
}

//transforma o cadastro em JSON e salva no localStorage
function salvarCadastro(arrayCadastro) {
    let cadastroJson = JSON.stringify(arrayCadastro);
    localStorage.setItem("cadastros", cadastroJson);
}

// procura se existe um pessoa pelo nome e caso não, adiciona o produto no cadastro
function cadastrar() {
    let nome = $("#inome").val();
    let sobrenome = $("#isobrenome").val();
    let email = $("#iemail").val();
    let estado = $("#iestado").val();
    let telefone = $("#itel").val();
    let cpf = $("#iCpf").val();

    if (getRegisterByName(nome) != -1) {
        return;
    }

    let arrayCadastro = cadastro();
    var pessoa = {
        "nome": nome,
        "sobrenome": sobrenome,
        "email": email,
        "estado": estado,
        "telefone": telefone,
        "cpf": cpf,
    }
    console.log(pessoa);
    arrayCadastro.push(pessoa);
    salvarCadastro(arrayCadastro);

    //Carregar vai sempre entrar para atualizar o cadastro
    carregar();
}


//procura o objeto por nome e retorna sua posição no array
function getRegisterByName(nome) {
    let arrayCadastro = cadastro();
    for (let i = 0; i < arrayCadastro.length; i++) {
        if (arrayCadastro[i]["nome"] == nome) {
            return i;
        }
    }
    //nada encontrado no array
    return -1;
}


// exclui um produto da lista e armazena a nova lista no localStorage
function excluir(posicao) {
    let arrayCadastro = cadastro();
    arrayCadastro.splice(posicao, 1);
    salvarCadastro(arrayCadastro);
    carregar();
}

// carrega o cadastro e monta o html da tabela
function carregar() {
    let arrayCadastro = cadastro();
    console.log(arrayCadastro);
    let html = "";
    for (let i = 0; i < arrayCadastro.length; i++) {
        html += "<tr>";
        html += "<td>" + arrayCadastro[i]["nome"] + "</td>";
        html += "<td>" + arrayCadastro[i]["sobrenome"] + "</td>";
        html += "<td>" + arrayCadastro[i]["email"] + "</td>";
        html += "<td>" + arrayCadastro[i]["estado"] + "</td>";
        html += "<td>" + arrayCadastro[i]["telefone"] + "</td>";
        html += "<td>" + arrayCadastro[i]["cpf"] + "</td>";
        html += "<td><button class='btn btn-secondary' onclick='excluir(" + i + ")'>Excluir</button></td>";
        html += "</tr>";
    }
    $(".salvosCadastro tbody").html(html);
}