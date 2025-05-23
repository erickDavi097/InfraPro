var portifolioModel = require("../models/portifolioModel");

function salvarFoto(req, res) {
  const imagem = req.file.filename;
  const { fkUsuario, descricao } = req.body;

  const item = {fkUsuario, descricao, imagem};

  portifolioModel.salvar(item)
    .then(() => res.status(201).send("Imagem enviada"))
    .catch(err => res.status(500).send(err));
}


module.exports = {
    salvarFoto
};