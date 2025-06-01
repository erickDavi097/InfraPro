var express = require("express");
var router = express.Router();

var seguidoresController = require("../controllers/seguidoresController");

router.get("/seguidores/count/:id", function (req, res) {
    seguidoresController.contarSeguidores(req, res);
});

router.get("/seguindo/count/:id", function (req, res) {
    seguidoresController.contarEuSigo(req, res);
});

router.post("/seguir", function (req, res) {
    seguidoresController.seguir(req, res);
});

router.patch("/desseguir", function (req, res) {
    seguidoresController.deixarDeSeguir(req, res);
});

router.get("/verificar/:idPerfil/:idLogado", function (req, res) {
    seguidoresController.verificarSeguindo(req, res);
});
router.get("/listarEuSigo/:id", function (req, res) {
    seguidoresController.listarEuSigo(req, res);
});
router.get("/listarSeguidores/:id", function (req, res) {
    seguidoresController.listarSeguidores(req, res);
});


module.exports = router;