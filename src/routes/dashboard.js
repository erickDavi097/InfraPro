var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/publicacoes/:id", function (req, res) {
    dashboardController.buscarUsuario(req, res);
});

router.get("/publicacoes/contagem/:id", function (req, res) {
    dashboardController.contarPublicacoes(req, res);
});
router.get("/publicacoes/media-preco/:id", function (req, res) {
    dashboardController.mediaPrecoPublicacoes(req, res);
});
router.get("/curtidas/recebidas/:id", function (req, res) {
    dashboardController.contarCurtidasRecebidas(req, res);
});
router.get("/publicacoes/mais-engajadas/:id", function (req, res) {
    dashboardController.publicacoesMaisEngajadasMes(req, res);
});
router.get("/seguidores-por-mes/:id", function (req, res) {
  dashboardController.seguidoresPorMes(req, res);
});
router.get("/seguidores-por-estado/:id", function (req, res) {
  dashboardController.seguidoresPorEstado(req, res);
});
router.get("/publicacoes-por-categoria/:id", function (req, res) {
  dashboardController.publicacoesPorCategoria(req, res);
});

module.exports = router;