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
    INSERT INTO publicacao (fkUsuario, fkServico, titulo, conteudo, imagem, dtCriacao)
    VALUES (${publicacao.fkUsuario}, 1, '${publicacao.titulo}', '${publicacao.conteudo}', '${publicacao.imagem}', DEFAULT);
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
