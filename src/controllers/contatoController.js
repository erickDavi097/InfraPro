var contatoModel = require("../models/contatoModel");

function listarPorStatus(req, res) {
    var status = req.params.status;

    contatoModel.listarPorStatus(status)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar contatos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function responderContato(req, res) {
    var id = req.body.id;
    var fkUsuario = req.body.fkUsuario;

    contatoModel.atualizarStatus(id, fkUsuario, 'respondido')
        .then(function (resultado) {
            res.status(200).json({ mensagem: "Contato respondido com sucesso!", resultado });
        })
        .catch(function (erro) {
            console.log("Erro ao responder contato: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function fecharContato(req, res) {
    var id = req.body.id;
    var fkUsuario = req.body.fkUsuario;

    contatoModel.atualizarStatus(id, fkUsuario, 'fechado')
        .then(function (resultado) {
            res.status(200).json({ mensagem: "Contato fechado com sucesso!", resultado });
        })
        .catch(function (erro) {
            console.log("Erro ao fechar contato: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPorStatus,
    responderContato,
    fecharContato
};
