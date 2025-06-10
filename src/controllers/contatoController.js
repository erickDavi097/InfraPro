var contatoModel = require("../models/contatoModel");

function listarTodosDoUsuario(req, res) {
    var fkUsuario = req.query.fkUsuario;

    contatoModel.listarTodosDoUsuario(fkUsuario)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao listar contatos do usuário: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.message });
        });
}

function enviarContato(req, res) {
    var { fkUsuario, assunto, mensagem } = req.body;

    contatoModel.enviarContato(fkUsuario, assunto, mensagem)
        .then(() => res.status(201).json({ mensagem: "Contato enviado com sucesso!" }))
        .catch(erro => {
            console.log("Erro ao enviar contato: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.message });
        });
}

function listarPorStatus(req, res) {
    var fkUsuario = req.query.fkUsuario;
    var status = req.params.status;

    contatoModel.listarPorStatus(fkUsuario, status)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao listar contatos por status: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.message });
        });
}

function obterResposta(req, res) {
    var idContato = req.params.id;

    contatoModel.obterResposta(idContato)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao obter resposta do contato: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.message });
        });
}
function listarPorUsuario(req, res) {
    var idUsuario = req.params.id;

    contatoModel.listarPorUsuario(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar contatos do usuário: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function listarTodos(req, res) {
    contatoModel.listarTodos()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao listar todos os contatos: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.message });
        });
}
function responderContato(req, res) {
    const idContato = req.params.id;
    const { resposta } = req.body;

    contatoModel.responderContato(idContato, resposta)
        .then(() => {
            res.status(200).json({ mensagem: "Contato respondido com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao responder contato: ", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.message });
        });
}

function listarContatosNaoRespondidos(req, res) {
    contatoModel.listarContatosNaoRespondidos()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao listar contatos não respondidos: ", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.message });
        });
}



module.exports = {
    listarTodosDoUsuario,
    listarPorUsuario,
    enviarContato,
    listarPorStatus,
    obterResposta,
    listarTodos,
    responderContato,
    listarContatosNaoRespondidos
};
