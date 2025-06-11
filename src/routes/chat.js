var express = require("express");
var router = express.Router();

var chatController = require("../controllers/chatController");

router.get('/clientes/:profissionalId', function(req, res) {
    chatController.listarClientes(req, res);
});
    
router.get('/:usuario1/:usuario2', function (req, res) {
    chatController.obterMensagens(req, res);
});

router.get('/ultimaMensagem/:usuario1/:usuario2', function (req, res) {
    chatController.ultimaMensagem(req, res);
});
    
router.post('/enviar', function(req, res) {
    chatController.criarMensagem(req,res);
});

router.post('/editar', function(req, res) {
    chatController.editarMensagem(req, res);
});

router.post('/remover', function(req, res) {
    chatController.removerMensagem(req, res);
});

module.exports = router;
