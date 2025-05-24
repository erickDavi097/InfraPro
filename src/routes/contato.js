var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

router.get("/contatos/:status", function (req, res) {
    contatoController.listarPorStatus(req, res);
});

router.post("/contatos/responder", function (req, res) {
    contatoController.responderContato(req, res);
});

router.post("/contatos/fechar", function (req, res) {
    contatoController.fecharContato(req, res);
});

module.exports = router;
