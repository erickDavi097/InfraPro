// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email && nome) {  // Verificando se email e nome são válidos
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";  // Redireciona para login caso não haja sessão válida
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";  // Limpa a sessão e redireciona para o login
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {  // Verifica se a div de aguardo existe
        divAguardar.style.display = "flex";  // Exibe a div de carregamento
    }
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "none";  // Esconde a div de aguardo
    }

    var divErrosLogin = document.getElementById("div_erros_login");
    if (divErrosLogin) {
        if (texto) {
            divErrosLogin.style.display = "flex";  // Exibe a div de erro
            divErrosLogin.innerHTML = texto;  // Adiciona a mensagem de erro
        } else {
            divErrosLogin.style.display = "none";  // Esconde a div de erros
        }
    }
}
