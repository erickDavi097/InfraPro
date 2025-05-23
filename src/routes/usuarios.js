var express = require("express");
var router = express.Router();
const { uploadPerfil } = require('../config/configUpload');
var usuarioController = require("../controllers/usuarioController");

router.post('/cadastro', uploadPerfil.single('foto'), (req, res) => {
  usuarioController.salvar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listarUsuarios(req, res);
});

router.get("/seguidores/count/:id", function (req, res) {
    usuarioController.contarSeguidores(req, res);
});
router.get("/listarSeguidores/:id", function(req, res) {
    usuarioController.listarSeguidoresController(req, res);
});

router.get("/perfilpublico/:id", function (req, res) {
    usuarioController.buscarPerfilPublico(req, res);
});

router.get("/perfilpublicocompleto/:id", function (req, res) {
    usuarioController.perfilPublicoCompleto(req, res);
});

router.patch("/suspender/:id", function (req, res) {
    usuarioController.suspenderUsuario(req, res);
});

router.put("/:id", function (req, res) {
    usuarioController.editar(req, res);
});

router.get("/:id", function (req, res) {
    usuarioController.buscarPorId(req, res);
});

router.post("/cadastrarAdmin", function (req, res) {
    usuarioController.cadastrarAdmin(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/autenticarAdmin", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post('/uploadFoto/:id', uploadPerfil.single('foto'), usuarioController.atualizarFoto);

router.get("/foto/:id", function (req, res) {
    usuarioController.buscarFoto(req, res);
});


module.exports = router;
