var chatModel = require("../models/chatModel");

function obterMensagens(req, res) {
    var usuario1 = req.params.usuario1;
    var usuario2 = req.params.usuario2;

    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || 20;

    chatModel.pegarMensagens(usuario1, usuario2, offset, limit)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma mensagem encontrada!");
            }
        })
        .catch(erro => {
            console.log("Erro ao obter mensagens:", erro.sqlMessage || erro);
            res.status(500).json({ error: erro.sqlMessage || erro });
        });
}


function criarMensagem(req, res) {
    const fkRemetente = req.body.fkRemetente;
    const fkDestinatario = req.body.fkDestinatario;
    const conteudo = req.body.conteudo;

    if (!fkRemetente || !fkDestinatario || !conteudo) {
        return res.status(400).send("Parâmetros indefinidos!");
    }

    chatModel.inserirMensagem(fkRemetente, fkDestinatario, conteudo)
        .then(function (resultado) {
            res.status(201).json({
                id: resultado.insertId,
                Remetente: fkRemetente,
                Destinatario: fkDestinatario,
                conteudo: conteudo,
                horario: new Date()
            });
        })
        .catch(function (erro) {
            console.error("Erro ao enviar mensagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: erro.sqlMessage || erro });
        });
}


function editarMensagem(req, res) {
    var id = req.body.id;
    var novoConteudo = req.body.conteudo;

    if (id == undefined || novoConteudo == undefined) {
        res.status(400).send("Parâmetros indefinidos!");
        return;
    }

    chatModel.editarMensagem(id, novoConteudo)
        .then(() => {
            res.status(200).json({ mensagem: "Mensagem editada com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao editar mensagem:", erro.sqlMessage || erro);
            res.status(500).json({ error: erro.sqlMessage || erro });
        });
}

function removerMensagem(req, res) {
    var id = req.body.id;

    if (id == undefined) {
        res.status(400).send("Parâmetro 'id' indefinido!");
        return;
    }

    chatModel.removerMensagem(id)
        .then(() => {
            res.status(200).json({ mensagem: "Mensagem removida com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao remover mensagem:", erro.sqlMessage || erro);
            res.status(500).json({ error: erro.sqlMessage || erro });
        });
}
function listarClientes(req, res) {
    const profissionalId = req.params.profissionalId;

    if (!profissionalId) {
        res.status(400).send("ID do profissional é obrigatório");
        return;
    }

    chatModel.listarChats(profissionalId)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                 res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.error("Erro ao listar clientes:", erro);
            res.status(500).json({ error: erro.sqlMessage || erro });
        });
}

module.exports = {
    obterMensagens,
    criarMensagem,
    editarMensagem,
    removerMensagem,
    listarClientes
};
