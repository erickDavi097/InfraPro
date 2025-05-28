const database = require("../database/config");

function listarTodas() {
  const instrucaoSql = `SELECT id, nome FROM categoria ORDER BY nome;`;
  return database.executar(instrucaoSql);
}

module.exports = {
  listarTodas
};
