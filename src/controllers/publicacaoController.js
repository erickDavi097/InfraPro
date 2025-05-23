var publicacaoModel = require("../models/publicacaoModel");

function salvarFoto(req, res) {
  const imagem = req.file.filename;
  const { fkUsuario, titulo, conteudo } = req.body;

  const novaPublicacao = { fkUsuario, titulo, conteudo, imagem };

  publicacaoModel.salvar(novaPublicacao)
    .then(() => res.status(201).send("Publicação salva com sucesso"))
    .catch(err => res.status(500).send(err));
}

function listarPorUsuario(req, res) {
  const idUsuario = req.params.id;

  publicacaoModel.listarPorUsuario(idUsuario)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(erro => {
      res.status(500).json({ erro: "Erro ao buscar publicações", detalhes: erro });
    });
}

function listarTodas(req, res) {
  publicacaoModel.listarTodas()
    .then(resultado => res.json(resultado))
    .catch(erro => res.status(500).json({ erro: erro.message }));
}


module.exports = {
    salvarFoto,
    listarPorUsuario,
    listarTodas
};