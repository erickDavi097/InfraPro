// usuarioController.js
var usuarioModel = require("../models/usuarioModel");
var enderecoModel = require("../models/enderecoModel");
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email ou senha indefinido!");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            if (resultadoAutenticar.length == 1) {
                const usuario = resultadoAutenticar[0];

                enderecoModel.buscarEnderecosPorUsuario(usuario.id)
                    .then((resultadoEnderecos) => {
                        res.status(200).json({
                            id: usuario.id,
                            email: usuario.email,
                            nome: usuario.nome,
                            tipo: usuario.tipo,
                            senha: usuario.senha,
                            enderecos: resultadoEnderecos
                        });
                    })
                    .catch((erro) => {
                        console.error("Erro ao buscar endereços:", erro);
                        res.status(500).json({ erro: erro.sqlMessage });
                    });

            } else if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao realizar o login:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function autenticarAdmin(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email ou senha indefinido!");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            if (resultadoAutenticar.length == 1) {
                const usuario = resultadoAutenticar[0];

                if (usuario.tipo !== "administrador") {
                    return res.status(403).json({ mensagem: "Apenas administradores podem acessar essa área." });
                }

                enderecoModel.buscarEnderecosPorUsuario(usuario.id)
                    .then((resultadoEnderecos) => {
                        res.status(200).json({
                            id: usuario.id,
                            email: usuario.email,
                            nome: usuario.nome,
                            tipo: usuario.tipo,
                            senha: usuario.senha,
                            enderecos: resultadoEnderecos
                        });
                    })
                    .catch((erro) => {
                        console.error("Erro ao buscar endereços:", erro);
                        res.status(500).json({ erro: erro.sqlMessage });
                    });

            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao realizar o login admin:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}


function cadastrar(req, res) {
    var {
        nomeServer: nome,
        sobrenomeServer: sobrenome,
        cpfServer: cpf,
        telefoneServer: telefone,
        emailServer: email,
        senhaServer: senha,
        tipoServer: tipo,
        idEndereco
    } = req.body;

    console.log("Requisição recebida para cadastrar usuário:", req.body);

    if (!idEndereco) {
        return res.status(400).json({ mensagem: "idEndereco é obrigatório" });
    }

    usuarioModel.cadastrar(idEndereco, nome, sobrenome, cpf, telefone, email, senha, tipo)
        .then(resultadoUsuario => {
            res.status(200).json({ mensagem: "Cadastro realizado com sucesso!", resultadoUsuario });
        })
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar o usuário", erro: erro.sqlMessage });
        });
}

function cadastrarAdmin(req, res) {
    const {
        nomeServer,
        emailServer,
        senhaServer,
        tipoServer,
        codigo_verificacao,
        idEndereco
    } = req.body;

    console.log("Dados recebidos para admin:", req.body);

    if (codigo_verificacao !== "ADMIN-1234") {
        return res.status(400).send("Código de verificação inválido.");
    }

    usuarioModel.cadastrar(idEndereco || 1, nomeServer, '', '', '', emailServer, senhaServer, tipoServer)
        .then(() => {
            res.status(200).json({ mensagem: "Admin cadastrado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao cadastrar administrador:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar administrador", erro: erro.sqlMessage });
        });
}

module.exports = {
    cadastrar,
    cadastrarAdmin,
    autenticar,
    autenticarAdmin
};
