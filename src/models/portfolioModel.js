const database = require("../database/config");

function buscarPorUsuarioId(idUsuario) {
  const instrucaoSql = `SELECT * FROM portfolio WHERE fkUsuario = ${idUsuario}`;
  return database.executar(instrucaoSql);
}

function salvarFoto(item) {
  const instrucaoSql = `
    INSERT INTO portfolio (fkUsuario, imagem, descricao)
    VALUES (${item.fkUsuario}, '${item.imagem}', '${item.descricao}')
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorUsuarioId,
  salvarFoto
};
