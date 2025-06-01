var seguidoresModel = require("../models/seguidoresModel");

function seguir(req, res) {
    const { fkUsuario, fkSeguidor } = req.body;
    seguidoresModel.seguir(fkUsuario, fkSeguidor)
        .then(() => res.status(200).json({ mensagem: "Seguido com sucesso!" }))
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage || erro.message }));
}

function deixarDeSeguir(req, res) {
    const { fkUsuario, fkSeguidor } = req.body;
    seguidoresModel.deixarDeSeguir(fkUsuario, fkSeguidor)
        .then(() => res.status(200).json({ mensagem: "Deixou de seguir com sucesso!" }))
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage || erro.message }));
}

function verificarSeguindo(req, res) {
    const idPerfil = Number(req.params.idPerfil);
    const idLogado = Number(req.params.idLogado);

    if (!idPerfil || !idLogado) {
        console.error("Parâmetros inválidos: ", { idPerfil, idLogado });
        return res.status(400).json({ erro: "Parâmetros inválidos." });
    }

    console.log("Verificando se", idLogado, "segue", idPerfil);

    seguidoresModel.verificarSeguindo(idPerfil, idLogado)
        .then((resultado) => {
            console.log("Resultado da consulta:", resultado);
            if (resultado.length > 0) {
                console.log("Status retornado:", resultado[0].statusSeguidores);
                res.json({ ativo: resultado[0].statusSeguidores === 'ativo' });
            } else {
                res.json({ ativo: false });
            }
        })
        .catch((erro) => {
            console.error("Erro ao verificar seguidores:", erro);
            res.status(500).json({ erro: erro.sqlMessage || erro.message });
        });
}
function listarSeguidores(req, res) {
    const id = Number(req.params.id);
    seguidoresModel.listarSeguidores(id) // <-- certo
        .then((resultado) => res.json(resultado))
        .catch((erro) => res.status(500).json({ erro: erro.sqlMessage || erro.message }));
}

function contarSeguidores(req, res) {
    const id = Number(req.params.id);
    seguidoresModel.contarSeguidores(id) // <-- certo
        .then((resultado) => res.json({ count: resultado[0].count }))
        .catch((erro) => res.status(500).json({ erro: erro.sqlMessage || erro.message }));
}

function listarEuSigo(req, res) {
    const id = Number(req.params.id);
    seguidoresModel.listarEuSigo(id)
        .then((resultado) => res.json(resultado))
        .catch((erro) => res.status(500).json({ erro: erro.sqlMessage || erro.message }));
}

function contarEuSigo(req, res) {
    const id = Number(req.params.id);
    seguidoresModel.contarEuSigo(id)
        .then((resultado) => res.json({ count: resultado[0].count }))
        .catch((erro) => res.status(500).json({ erro: erro.sqlMessage || erro.message }));
}


module.exports = {
    seguir,
    deixarDeSeguir,
    verificarSeguindo,
    listarSeguidores,
    contarSeguidores,
    listarEuSigo,
    contarEuSigo
};
