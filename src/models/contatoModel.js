var database = require("../database/config");

function listarPorStatus(status) {
    var instrucaoSql = `
        SELECT c.id, c.fkUsuario, u.nome AS usuarioNome, u.email, c.assunto, c.mensagem, c.dtEnvio, c.statusContato
        FROM contato c
        JOIN usuario u ON c.fkUsuario = u.id
        WHERE c.statusContato = '${status}'
        ORDER BY c.dtEnvio DESC;
    `;
    return database.executar(instrucaoSql);
}

function atualizarStatus(id, fkUsuario, novoStatus) {
    var instrucaoSql = `
        UPDATE contato
        SET statusContato = '${novoStatus}'
        WHERE id = ${id} AND fkUsuario = ${fkUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorStatus,
    atualizarStatus
};
