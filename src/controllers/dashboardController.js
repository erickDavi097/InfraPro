const dashboardModel = require("../models/dashboardModel");

function buscarUsuario(req, res) {
   const id = req.params.id;

  dashboardModel.buscarUsuario(id)
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => res.status(500).json({ erro: erro.message }));
}

function contarPublicacoes(req, res) {
    const idUsuario = req.params.id;

    dashboardModel.contarPublicacoes(idUsuario)
        .then(resultado => res.status(200).json(resultado[0]))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function mediaPrecoPublicacoes(req, res) {
    const idUsuario = req.params.id;

    dashboardModel.mediaPrecoPublicacoes(idUsuario)
        .then(resultado => res.status(200).json(resultado[0]))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function contarCurtidasRecebidas(req, res) {
    const idUsuario = req.params.id;

    dashboardModel.contarCurtidasRecebidas(idUsuario)
        .then(resultado => res.status(200).json(resultado[0]))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function publicacoesMaisEngajadasMes(req, res) {
    const idUsuario = req.params.id;

    dashboardModel.publicacoesMaisEngajadasMes(idUsuario)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json({ erro: erro.message }));
}
function seguidoresPorMes(req, res) {
  const idUsuario = req.params.id;

  dashboardModel.seguidoresPorMes(idUsuario)
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => res.status(500).json({ erro: erro.message }));
}
function seguidoresPorEstado(req, res) {
  const idUsuario = req.params.id;

  dashboardModel.seguidoresPorEstado(idUsuario)
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => res.status(500).json({ erro: erro.message }));
}
function publicacoesPorCategoria(req, res) {
  const idUsuario = req.params.id;

  dashboardModel.publicacoesPorCategoria(idUsuario)
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => res.status(500).json({ erro: erro.message }));
}


module.exports = {
    buscarUsuario,
    contarPublicacoes,
    mediaPrecoPublicacoes,
    contarCurtidasRecebidas,
    publicacoesMaisEngajadasMes,
    seguidoresPorMes,
    seguidoresPorEstado,
    publicacoesPorCategoria
};

