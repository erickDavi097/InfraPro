var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.get("/publicacao/:fkPublicacao", function (req, res) {
    comentarioController.listarPorPublicacao(req, res);
});

router.post("/", function (req, res) {
    comentarioController.criarComentario(req, res);
});

router.delete("/deletar/:idComentario", function (req, res) {
    comentarioController.deletarComentario(req, res);
});

router.get('/detalhes/:fkPublicacao', function (req, res){
    comentarioController.listarComentariosDetalhados(req, res)
});

module.exports = router;
