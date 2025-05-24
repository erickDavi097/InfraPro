var curtidaModel = require("../models/curtidaModel");

function listarCurtidasPorPublicacao(req, res) {
    var fkPublicacao = req.params.fkPublicacao;

    curtidaModel.listarCurtidasPorPublicacao(fkPublicacao)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("Erro ao listar curtidas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function verificarSeUsuarioCurtiu(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var fkPublicacao = req.params.fkPublicacao;

    curtidaModel.verificarSeUsuarioCurtiu(fkUsuario, fkPublicacao)
        .then(function (resultado) {
            res.status(200).json(resultado.length > 0);
        })
        .catch(function (erro) {
            console.log("Erro ao verificar curtida: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function curtir(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var fkPublicacao = req.body.fkPublicacao;

    curtidaModel.curtir(fkUsuario, fkPublicacao)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Curtida registrada com sucesso!", resultado });
        })
        .catch(function (erro) {
            console.log("Erro ao curtir: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function descurtir(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var fkPublicacao = req.body.fkPublicacao;

    curtidaModel.descurtir(fkUsuario, fkPublicacao)
        .then(function (resultado) {
            res.status(200).json({ mensagem: "Curtida removida com sucesso!", resultado });
        })
        .catch(function (erro) {
            console.log("Erro ao descurtir: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function listarUsuariosPorPublicacao(req, res) {
    var fkPublicacao = req.params.fkPublicacao;

    curtidaModel.listarUsuariosPorPublicacao(fkPublicacao)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log("Erro ao listar usuários que curtiram: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    listarCurtidasPorPublicacao,
    listarUsuariosPorPublicacao,
    verificarSeUsuarioCurtiu,
    curtir,
    descurtir
};
