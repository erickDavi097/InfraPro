var comentarioModel = require("../models/comentarioModel");

function listarPorPublicacao(req, res) {
    var fkPublicacao = req.params.fkPublicacao;

    comentarioModel.listarPorPublicacao(fkPublicacao)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar comentários: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function criarComentario(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var fkPublicacao = req.body.fkPublicacao;
    var texto = req.body.texto;

    comentarioModel.criarComentario(fkUsuario, fkPublicacao, texto)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Comentário criado com sucesso!", resultado });
        })
        .catch(function (erro) {
            console.log("Erro ao criar comentário: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function listarComentariosDetalhados(req, res) {
    var fkPublicacao = req.params.fkPublicacao;

    comentarioModel.listarComentariosDetalhados(fkPublicacao)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar comentários detalhados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletarComentario(req, res) {
    var idComentario = req.params.idComentario;
    var fkUsuario = req.body.fkUsuario;

    comentarioModel.deletarComentario(idComentario, fkUsuario)
        .then(function (resultado) {
            res.status(200).json({ mensagem: "Comentário deletado com sucesso!", resultado });
        })
        .catch(function (erro) {
            console.log("Erro ao deletar comentário: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPorPublicacao,
    criarComentario,
    deletarComentario,
    listarComentariosDetalhados
};
