var express = require("express");
var router = express.Router();

var categoriaController = require("../controllers/categoriaController");

router.get("/", function(req, res) {
    categoriaController.listarTodas(req, res);
});

module.exports = router;
