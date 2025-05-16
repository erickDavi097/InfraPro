var seguidoresModel = require("../models/seguidoresModel");
var usuarioModel = require("../models/usuarioModel");


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
    const idPerfil = req.params.idPerfil;
    const idLogado = req.params.idLogado;

    seguidoresModel.verificarSeguindo(idPerfil, idLogado)
        .then((resultado) => {
            if (resultado.length > 0) {
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


module.exports = {
    seguir,
    deixarDeSeguir,
    verificarSeguindo
};
