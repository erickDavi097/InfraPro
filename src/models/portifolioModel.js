const database = require("../database/config");

function buscarPorUsuarioId(idUsuario) {
  const instrucaoSql = `
    SELECT * FROM portifolio WHERE fkUsuario = ${idUsuario}
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorUsuarioId,
};
