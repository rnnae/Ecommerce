//valida as letras e o nome, estado e sobrenome
function validarCampoLetras(id, iderro) {
    let letras = "abcdefghijklmnopqrstuvwxyz ";
    let nome = $("#" + id).val().toLowerCase();
    while (nome.includes("  ")) {
        nome = nome.replace("  ", "  ");
    }
    $("#" + id).val(nome);
    if (($("#" + id).val()) == "") {
        $("#" + iderro).html("*Campo obrigatório");
        return;
    }
    let contemLetras = true;
    for (let i = 0; i < nome.length; i++) {
        if (!letras.includes(nome.charAt(i))) {
            contemLetras = false;
        }
    }
    if (id.includes("inome")) {
        validaNome(contemLetras, iderro);
    } else {
        if (id.includes("iestado")) {
            validaEstado(contemLetras, iderro);
        } else {
            if (id.includes("isobrenome")) {
                validaSobrenome(contemLetras, iderro)
            }
        }
    }
}




function validaNome(contemLetras, iderro) {
    if (contemLetras) {
        $("#" + iderro).html("");
        console.log("If, tudo correto");
    } else {
        $("#" + iderro).html("*Erro nome, não contém número");
        console.log("*Ultimo else erro, pq contem numero");
    }
}



function validaEstado(contemLetras, iderro) {
    if (contemLetras) {
        $("#" + iderro).html("");
        console.log("If, tudo correto");
    } else {
        $("#" + iderro).html("*Erro estado, não contém número");
        console.log("*Ultimo else erro, pq contem numero");
    }
}

function validaSobrenome(contemLetras, iderro) {
    if (contemLetras) {
        $("#" + iderro).html("");
        console.log("If, tudo correto");
    } else {
        $("#" + iderro).html("*Erro sobrenome, não contém número");
        console.log("*Ultimo else erro, pq contem numero");
    }
}

//







//funcao para Cpf, telefone

function validaCampoTelefone(idNum, iderronum) {
    let num = "1234567890()-"
    let numTel = $("#" + idNum).val().trim();
    while (numTel.includes(" ")) {
        numTel = numTel.replace(" ", "");
    }
    $("#" + idNum).val(numTel);

    if (($("#" + idNum).val()) == "") {
        $("#" + iderronum).html("*Campo obrigatório");
        return;
    }
    let contemApenasNumero = true;

    for (let i = 0; i < numTel.length; i++) {
        if (!num.includes(numTel.charAt(i))) {
            contemApenasNumero = false;
        }
    }
    formatarTel($("#" + idNum));
    numTel = $("#" + idNum).val();
    if (numTel.length == 14 && contemApenasNumero) {
        $("#" + iderronum).html("");

    } else {
        $("#" + iderronum).html("*Telefone invalido");
    }
}


function validaCampoCpfRg(idCpfRg, iderroCpfRg) {
    let verificacaoCpfRg = "1234567890.-/";
    let numCpfRg = $("#" + idCpfRg).val().trim();
    while (numCpfRg.includes(" ")) {
        numCpfRg = numCpfRg.replace(" ", "");
    }
    $("#" + idCpfRg).val(numCpfRg);
    if (($("#" + idCpfRg).val()) == "") {
        $("#" + iderroCpfRg).html("*Campo obrigatório");
        return;
    }
    let contemApenasNumero = true;
    for (let i = 0; i < numCpfRg.length; i++) {
        if (!verificacaoCpfRg.includes(numCpfRg.charAt(i))) {
            contemApenasNumero = false;
        }
    }
    if (idCpfRg.includes("iCpf")) {
        validaCpf(contemApenasNumero, iderroCpfRg, idCpfRg);
    } else {
        if (idCpfRg.includes("iRg")) {
            validaRg(contemApenasNumero, iderroCpfRg, idCpfRg);
        } else {
            if (idCpfRg.includes("iNascimento")) {
                validaNascimento(contemApenasNumero, iderroCpfRg, idCpfRg);
            }
        }
    }
}

function validaCpf(contemApenasNumero, iderroCpfRg, idCpfRg) {
    formatarCpf($("#" + idCpfRg));
    let numCpfRg = $("#" + idCpfRg).val();
    if (numCpfRg.length == 14 && contemApenasNumero) {
        $("#" + iderroCpfRg).html("");
    } else {
        $("#" + iderroCpfRg).html("*CPF invalido");
    }
}


function validaRg(contemApenasNumero, iderroCpfRg, idCpfRg) {
    formatarRg($("#" + idCpfRg));
    let numCpfRg = $("#" + idCpfRg).val();
    if (numCpfRg.length == 12 && contemApenasNumero) {
        $("#" + iderroCpfRg).html("");
    } else {
        $("#" + iderroCpfRg).html("*Rg invalido");
    }
}

function validaNascimento(contemApenasNumero, iderroCpfRg, idCpfRg) {
    formatarNascimento($("#" + idCpfRg));
    let numNascimento = $("#" + idCpfRg).val();
    if (numNascimento.length == 10 && contemApenasNumero) {
        $("#" + iderroCpfRg).html("");
    } else {
        $("#" + iderroCpfRg).html("*Data de Nascimento invalido");
    }
}


function formatarNascimento(inputNascimento) {
    let numeroNascimento = inputNascimento.val();
    if (numeroNascimento.length >= 2 && numeroNascimento.indexOf("/") == -1) {
        inputNascimento.val(numeroNascimento.substring(0, 2) + '/' + numeroNascimento.substring(2));
    }
    numeroNascimento = inputNascimento.val();
    if (numeroNascimento.length >= 5 && numeroNascimento.indexOf("/", 5) == -1) {
        inputNascimento.val(numeroNascimento.substring(0, 5) + '/' + numeroNascimento.substring(5));
    }
}




function formatarRg(inputRg) {
    let numeroRg = inputRg.val();
    if (numeroRg.length >= 2 && numeroRg.indexOf(".") == -1) {
        inputRg.val(numeroRg.substring(0, 2) + '.' + numeroRg.substring(2));
    }
    numeroRg = inputRg.val();
    if (numeroRg.length >= 6 && numeroRg.indexOf(".", 6) == -1) {
        inputRg.val(numeroRg.substring(0, 6) + '.' + numeroRg.substring(6));
    }
    numeroRg = inputRg.val();
    if (numeroRg.length >= 10 && numeroRg.indexOf("-", 10) == -1) {
        inputRg.val(numeroRg.substring(0, 10) + '-' + numeroRg.substring(10));
    }
    numeroRg = inputRg.val();

}



function formatarCpf(inputCpf) {
    let cpf = inputCpf.val();
    if (cpf.length >= 3 && cpf.indexOf(".") == -1) {
        inputCpf.val(cpf.substring(0, 3) + '.' + cpf.substring(3));
    }
    cpf = inputCpf.val();
    if (cpf.length >= 7 && cpf.indexOf(".", 6) == -1) {
        inputCpf.val(cpf.substring(0, 7) + '.' + cpf.substring(7));
    }
    cpf = inputCpf.val();
    if (cpf.length >= 11 && cpf.indexOf("-", 7) == -1) {
        inputCpf.val(cpf.substring(0, 11) + '-' + cpf.substring(11));
    }
    cpf = inputCpf.val();
}


function formatarTel(inputTel) {
    let numero = inputTel.val();
    if (numero.length >= 10 && numero.indexOf("-") == -1) {
        inputTel.val((numero.substring(0, 7) + '-' + numero.substring(7)));
    }
    numero = inputTel.val();
    if (numero.length >= 12 && numero.indexOf("(") == -1) {
        inputTel.val('(' + numero.substring(0, 2) + ')' + numero.substring(2));
    }
}
//


//funcao unica para email
function verificarEmail() {
    let email = $("#iemail").val().trim()
    $("#iemail").val(email);

    let arroba = email.indexOf("@");
    let dominio = email.substring(arroba + 1);
    let ponto = dominio.indexOf(".");

    if (email == "") {
        $("#iemailError").css("display", "inline-block");
        $("#iemailError").html("Campo de e-mail vazio").css("color", "red");

    } else {
        if (arroba == -1) {
            $("#iemailError").css("display", "inline-block");
            $("#iemailError").html("Formato de e-mail inválido (falta o '@')").css("color", "red");
        } else {
            if (arroba != email.lastIndexOf("@")) {
                $("#iemailError").css("display", "inline-block");
                $("#iemailError").html("Formato de e-mail inválido (mais de uma '@')").css("color", "red");
            } else {
                if (ponto == -1) {
                    $("#iemailError").css("display", "inline-block");
                    $("#iemailError").html("Formato de e-mail inválido (falta o '.')").css("color", "red");
                } else {
                    $("#iemailError").html("").css("");
                }
            }
        }
    }
}

//funcao para mensagem no feedback
function formatarMensagem(idMensagem) {
    let mensagem = $("#" + idMensagem).val().trim().toLowerCase();
    while (mensagem.includes("  ")) {
        mensagem = mensagem.replace("  ", " ")
    }
    $("#" + idMensagem).val(mensagem);
}




//funcao para senha
function senha(idSenha) {
    let senha = $("#" + idSenha).val().trim();
    $("#" + idSenha).val(senha);

    let contemletras = "abcdefghijklmnopqrstuvwxyz";
    let contemSenhasNumeros = "1234567890";
    let contemletrasCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let contemCaracteresEspeciais = "!#@$";

    let contemletrasValido = false;
    let contemSenhasNumerosValido = false;
    let contemletrasCapsValido = false;
    let contemCaracteresEspeciaisValido = false;

    for (let i = 0; i < senha.length; i++) {
        let caractere = senha.charAt(i);

        if (contemletras.includes(caractere)) {
            contemletrasValido = true;
        } else {
            if ((contemSenhasNumeros.includes(caractere))) {
                contemSenhasNumerosValido = true;
            } else {
            } if (contemletrasCaps.includes(caractere)) {
                contemletrasCapsValido = true;
            } else {
                if (contemCaracteresEspeciais.includes(caractere)) {
                    contemCaracteresEspeciaisValido = true;
                }
            }
        }
    }

    if (senha.length >= 8) {
        $("#ierroTamanho").css("color", "green");
    } else {
        $("#ierroTamanho").css("color", "red");
    }
    if (contemletrasValido) {
        $("#ierroLetras").css("color", "green");
    } else {
        $("#ierroLetras").css("color", "red");
    }
    if (contemSenhasNumerosValido) {
        $("#ierroNumeros").css("color", "green");
    } else {
        $("#ierroNumeros").css("color", "red");
    }
    if (contemletrasCapsValido) {
        $("#ierroCaps").css("color", "green");
    } else {
        $("#ierroCaps").css("color", "red");
    }
    if (contemCaracteresEspeciaisValido) {
        $("#ierroEspecial").css("color", "green");
    } else {
        $("#ierroEspecial").css("color", "red");
    }
}
//





//fazer a parte de ver se as senhas sao iguais
function verificarSenhas(inputSenha, inputSenha2, ierroSenhaConfirmar) {
    let senha1 = $("#" + inputSenha).val();
    let senha2 = $("#" + inputSenha2).val();
    if (senha1 == senha2) {
        $("#" + ierroSenhaConfirmar).html("*Senhas iguais").css("color", "green");
    } else {
        $("#" + ierroSenhaConfirmar).html("*Senhas não são iguais").css("color", "red");
    }
}













