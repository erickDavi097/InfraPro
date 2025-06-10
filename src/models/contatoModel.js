var database = require("../database/config");

function listarTodosDoUsuario(fkUsuario) {
    const instrucaoSql = `
        SELECT id, assunto, mensagem, dtEnvio, statusContato
        FROM contato
        WHERE fkUsuario = ${fkUsuario}
        ORDER BY dtEnvio DESC;
    `;
    return database.executar(instrucaoSql);
}

function enviarContato(fkUsuario, assunto, mensagem) {
    const instrucaoSql = `
        INSERT INTO contato (fkUsuario, assunto, mensagem, statusContato)
        VALUES (${fkUsuario}, '${assunto}', '${mensagem}', 'pendente');
    `;
    return database.executar(instrucaoSql);
}

function listarPorStatus(fkUsuario, status) {
    const instrucaoSql = `
        SELECT id, assunto, mensagem, dtEnvio, statusContato
        FROM contato
        WHERE fkUsuario = ${fkUsuario} AND statusContato = '${status}'
        ORDER BY dtEnvio DESC;
    `;
    return database.executar(instrucaoSql);
}

function obterResposta(idContato) {
    const instrucaoSql = `
        SELECT resposta, statusContato
        FROM contato
        WHERE id = ${idContato};
    `;
    return database.executar(instrucaoSql);
}
function listarPorUsuario(idUsuario) {
    const instrucaoSql = `
        SELECT c.id, c.fkUsuario, u.nome AS usuarioNome, u.email, c.assunto, c.mensagem, c.dtEnvio, c.statusContato, c.resposta
        FROM contato c
        JOIN usuario u ON c.fkUsuario = u.id
        WHERE c.fkUsuario = ${idUsuario}
        ORDER BY c.dtEnvio DESC;
    `;
    return database.executar(instrucaoSql);
}
function listarTodos() {
    const instrucaoSql = `
        SELECT c.id, c.assunto, c.mensagem, c.dtEnvio, c.statusContato, u.nome AS nomeUsuario
        FROM contato c
        LEFT JOIN usuario u ON c.fkUsuario = u.id
        ORDER BY c.dtEnvio DESC;
    `;
    return database.executar(instrucaoSql);
}

function responderContato(idContato, resposta) {
    const instrucaoSql = `
        UPDATE contato
        SET resposta = '${resposta}', statusContato = 'respondido'
        WHERE id = ${idContato};
    `;
    return database.executar(instrucaoSql);
}

function listarContatosNaoRespondidos() {
    const instrucaoSql = `
        SELECT * FROM contato
        WHERE statusContato = 'pendente';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTodosDoUsuario,
    listarPorUsuario,
    enviarContato,
    listarPorStatus,
    obterResposta,
    listarTodos,
    responderContato,
    listarContatosNaoRespondidos
};
