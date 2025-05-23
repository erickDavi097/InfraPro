const database = require("../database/config");

function buscarPorUsuarioId(idUsuario) {
  const instrucaoSql = `SELECT * FROM portifolio WHERE fkUsuario = ${idUsuario}`;
  return database.executar(instrucaoSql);
}
function salvarFoto(item) {
  const instrucaoSql = `
    INSERT INTO portifolio (fkUsuario, imagem, descricao)
    VALUES (${item.fkUsuario}, '${item.imagem}', '${item.descricao}')
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorUsuarioId,
  salvarFoto
};
