const express = require("express");
const router = express.Router();
const publicacaoController = require("../controllers/publicacaoController");
const {uploadPublicacao} = require("../config/configUpload");




router.post('/', uploadPublicacao.single('foto'), (req, res) => {
  publicacaoController.salvarFoto(req, res);
});

router.get("/:id", publicacaoController.listarPorUsuario);

router.get('/', publicacaoController.listarTodas);
module.exports = router;