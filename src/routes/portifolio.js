var express = require("express");
var router = express.Router();
var portifolioController = require("../controllers/portifolioController");


router.post('/portifolio', upload.single('foto'), (req, res) => {
  portifolioController.salvar(req, res);
});

module.exports = router;