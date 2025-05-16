const database = require("../database/config");

function buscarPublicacoesPorUsuarioId(idUsuario) {
    const instrucaoSql = `
        SELECT id, titulo, conteudo, imagem, dtCriacao 
        FROM publicacao 
        WHERE fkUsuario = ${idUsuario}
        ORDER BY dtCriacao DESC
    `;
    console.log("Executando SQL de publicações:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
  buscarPublicacoesPorUsuarioId,
};
