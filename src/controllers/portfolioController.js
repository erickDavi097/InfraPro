var portfolioModel = require("../models/portfolioModel");

function salvarFoto(req, res) {
  const imagem = req.file.filename;
  const { fkUsuario, descricao } = req.body;

  const item = { fkUsuario, descricao, imagem };

  portfolioModel.salvar(item)
    .then(() => res.status(201).send("Imagem enviada"))
    .catch(err => res.status(500).send(err));
}

module.exports = {
  salvarFoto
};