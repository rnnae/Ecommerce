//COMPRA DO CARRINHO

//carrega o JSON do carrinho no localStorage e transforma em um Array
function carrinho() {
    let arrayPulseiras = [];
    if (JSON.parse(localStorage.getItem("pulseiras"))) {
        arrayPulseiras = JSON.parse(localStorage.getItem("pulseiras"));
    }
    return arrayPulseiras;
}

//transforma o carrinho em JSON e salva no localStorage
function salvarCarrinho(arrayPulseiras) {
    let pulseiraJson = JSON.stringify(arrayPulseiras);
    localStorage.setItem("pulseiras", pulseiraJson);
}

// procura se existe um produto pelo nome e caso não, adiciona o produto no carrinho
function comprar(nome, preco, quantidade) {
    if (getProdutoByName(nome) != -1) {
        return;
    }

    let arrayPulseiras = carrinho();
    var pulseira = {
        "nome": nome,
        "preco": preco,
        "quantidade": quantidade,
    }
    arrayPulseiras.push(pulseira);
    salvarCarrinho(arrayPulseiras);

    //Carregar vai sempre entrar para atualizar o carrinho
    carregar();
}


//procura o objeto por nome e retorna sua posição no array
function getProdutoByName(nome) {
    let arrayPulseiras = carrinho();
    for (let i = 0; i < arrayPulseiras.length; i++) {
        if (arrayPulseiras[i]["nome"] == nome) {
            return i;
        }
    }
    //nada encontrado no array
    return -1;
}

// verifica se a quantidade é maior que 1 ou menor que 10, depois procura o objeto por nome e altera sua quantidade com o novo valor
function alterarQuantidade(posicao, quantidade) {
    if (quantidade < 1 || quantidade > 10) {
        return;
    }

    let arrayPulseiras = carrinho();
    arrayPulseiras[posicao]["quantidade"] = quantidade;
    salvarCarrinho(arrayPulseiras);

    carregar();
}

// exclui um produto da lista e armazena a nova lista no localStorage
function excluir(posicao) {
    let arrayPulseiras = carrinho();
    arrayPulseiras.splice(posicao, 1);
    salvarCarrinho(arrayPulseiras);
    carregar();
}

// carrega o carrinho e monta o html da tabela
function carregar() {
    let arrayPulseiras = carrinho();
    let html = "";
    for (let i = 0; i < arrayPulseiras.length; i++) {
        html += "<tr>";
        html += "<td>" + arrayPulseiras[i]["nome"] + "</td>";
        html += "<td>" + formatarReal(arrayPulseiras[i]["preco"]) + "</td>";
        html += "<td><button class='btn btn-secondary' onclick='alterarQuantidade(" + i + "," + (arrayPulseiras[i]["quantidade"] - 1) + ")'>-</button>";
        html += arrayPulseiras[i]["quantidade"];
        html += "<button class='btn btn-secondary' onclick='alterarQuantidade(" + i + "," + (arrayPulseiras[i]["quantidade"] + 1) + ")'>+</button></td>";
        html += "<td><button class='btn btn-secondary' onclick='excluir(" + i + ")'>Excluir</button></td>";
        html += "</tr>";
    }
    $(".salvos tbody").html(html);
    valorTotal();
}

// calcula o valor total do carrinho
function valorTotal() {
    let valorTotal = 0;
    let arrayPulseiras = carrinho();
    for (let i = 0; i < arrayPulseiras.length; i++) {
        valorTotal += arrayPulseiras[i]["quantidade"] * arrayPulseiras[i]["preco"];
    }
    $(".salvos tfoot th#total").html(formatarReal(valorTotal));
}

function formatarReal(valor) {
    return "R\$ " + valor;
}
