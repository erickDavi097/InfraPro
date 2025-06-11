const express = require("express");
const router = express.Router();
const publicacaoController = require("../controllers/publicacaoController");
const { uploadPublicacao } = require("../config/configUpload");

router.delete('/:id', publicacaoController.deletar);

router.put('/:id', uploadPublicacao.single('foto'), (req, res) => {
  publicacaoController.editarPublicacao(req, res);
});
router.post('/', uploadPublicacao.single('foto'), (req, res) => {
  publicacaoController.salvarFoto(req, res);
});

router.get("/:id", function(req, res) {
  publicacaoController.listarPorUsuario(req, res);
});

router.get('/', function(req, res){
  publicacaoController.listarTodas(req, res);
});



module.exports = router;