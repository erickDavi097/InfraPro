var publicacaoModel = require("../models/publicacaoModel");

function salvarFoto(req, res) {
  console.log("=== REQ.BODY ===", req.body);
  console.log("=== REQ.FILE ===", req.file);

  if (!req.file) {
    console.error("Erro: Nenhuma imagem foi enviada.");
    return res.status(400).send("Imagem obrigatória.");
  }
  const imagem = req.file.filename;
  
  const { fkUsuario, titulo, conteudo, fkCategoria, preco } = req.body;

   console.log("Campos recebidos:");
  console.log("fkUsuario:", fkUsuario);
  console.log("titulo:", titulo);
  console.log("conteudo:", conteudo);
  console.log("fkCategoria:", fkCategoria);
  console.log("preco:", preco);

  if (!fkCategoria) {
    console.error("Erro: Campo fkCategoria não foi enviado.");
    return res.status(400).send("Campo fkCategoria é obrigatório.");
  }

  const novaPublicacao = { fkUsuario, fkCategoria, titulo, conteudo, imagem, preco };
  console.log("Objeto novaPublicacao:", novaPublicacao);

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
    .then(resultado => {
      console.log("Resultado listarTodas:", resultado);
      res.json(resultado);
    })
    .catch(erro => res.status(500).json({ erro: erro.message }));
}


module.exports = {
    salvarFoto,
    listarPorUsuario,
    listarTodas
};