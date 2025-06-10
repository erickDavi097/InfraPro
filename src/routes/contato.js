var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

router.get("/", function (req, res) {
    contatoController.listarTodosDoUsuario(req, res);
});

router.post("/enviar", function (req, res) {
    contatoController.enviarContato(req, res);
});

router.get("/status/:status", function (req, res) {
    contatoController.listarPorStatus(req, res);
});

router.get("/resposta/:id", function (req, res) {
    contatoController.obterResposta(req, res);
});

router.get("/usuario/:id", function (req, res) {
    contatoController.listarPorUsuario(req, res);
});
router.get("/todos", function (req, res) {
    contatoController.listarTodos(req, res);
});
router.put("/responder/:id", function (req, res) {
    contatoController.responderContato(req, res);
});

router.get("/pendente", function (req, res) {
    contatoController.listarContatosNaoRespondidos(req, res);
});




module.exports = router;
