// usuarioController.js
var usuarioModel = require("../models/usuarioModel");

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
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar o usuário", erro: erro.sqlMessage });
        });
}

module.exports = {
    cadastrar
};
