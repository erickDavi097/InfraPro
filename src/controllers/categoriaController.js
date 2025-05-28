const categoriaModel = require("../models/categoriaModel");

function listarTodas(req, res) {
  categoriaModel.listarTodas()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => res.status(500).json({ erro: erro.message }));
}

module.exports = {
  listarTodas
};
