var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.get("/publicacao/:fkPublicacao", function (req, res) {
    curtidaController.listarCurtidasPorPublicacao(req, res);
});

router.get("/verificar/:fkUsuario/:fkPublicacao", function (req, res) {
    curtidaController.verificarSeUsuarioCurtiu(req, res);
});

router.post("/curtir", function (req, res) {
    curtidaController.curtir(req, res);
});

router.delete("/descurtir", function (req, res) {
    curtidaController.descurtir(req, res);
});
router.get("/publicacao/:fkPublicacao/usuarios", function(req, res) {
    curtidaController.listarUsuariosPorPublicacao(req, res);
});




module.exports = router;
