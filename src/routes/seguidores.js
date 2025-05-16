var express = require("express");
var router = express.Router();

var seguidoresController = require("../controllers/seguidoresController");

router.post("/seguir", function (req, res) {
    seguidoresController.seguir(req, res);
});

router.patch("/desseguir", function (req, res) {
    seguidoresController.deixarDeSeguir(req, res);
});

router.get("/verificar/:idPerfil/:idLogado", function (req, res) {
    seguidoresController.verificarSeguindo(req, res);
});

module.exports = router;