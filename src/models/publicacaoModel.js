const database = require("../database/config");

function buscarPublicacoesPorUsuarioId(idUsuario) {
    const instrucaoSql = `
        SELECT id, titulo, conteudo, imagem, dtCriacao FROM publicacao 
        WHERE fkUsuario = ${idUsuario}
        ORDER BY dtCriacao DESC
    `;
    console.log("Executando SQL de publicações:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
  const instrucaoSql = `
    SELECT titulo, conteudo, imagem FROM publicacao
    WHERE fkUsuario = ${idUsuario}
    ORDER BY dtCriacao DESC;
  `;
  return database.executar(instrucaoSql);
}

function salvar(publicacao) {
  const instrucaoSql = `
    INSERT INTO publicacao (fkUsuario, fkCategoria, titulo, conteudo, imagem, preco, dtCriacao)
    VALUES (${publicacao.fkUsuario}, ${publicacao.fkCategoria}, '${publicacao.titulo}', '${publicacao.conteudo}', '${publicacao.imagem}', '${publicacao.preco}',DEFAULT);
  `;
  return database.executar(instrucaoSql);
}

function listarTodas() {
  const instrucaoSql = `SELECT * FROM vwPublicacoesCompleta ORDER BY dtCriacao DESC;`;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPublicacoesPorUsuarioId,
  listarPorUsuario,
  salvar,
  listarTodas
};
