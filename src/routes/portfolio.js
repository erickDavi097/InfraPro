var express = require("express");
var router = express.Router();
var portfolioController = require("../controllers/portfolioController");


router.post('/portfolio', upload.single('foto'), (req, res) => {
  portfolioController.salvar(req, res);
});

module.exports = router;