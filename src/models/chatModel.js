const database = require("../database/config");

function pegarMensagens(fkRemetente, fkDestinatario, offset = 0, limit = 20) {
    var instrucaoSql = `
        SELECT m.id, r.nome AS Remetente, d.nome AS Destinatario, m.conteudo, m.horario
        FROM mensagem m
        JOIN usuario r ON m.fkRemetente = r.id
        JOIN usuario d ON m.fkDestinatario = d.id
        WHERE (m.fkRemetente = ${fkRemetente} AND m.fkDestinatario = ${fkDestinatario})
           OR (m.fkRemetente = ${fkDestinatario} AND m.fkDestinatario = ${fkRemetente})
        ORDER BY m.horario DESC, m.id DESC
        LIMIT ${limit} OFFSET ${offset};
    `;
    return database.executar(instrucaoSql);
}
function ultimaMensagem(fkRemetente, fkDestinatario, offset = 0){
        var instrucaoSql = `
        SELECT m.id, r.nome AS Remetente, d.nome AS Destinatario, m.conteudo, m.horario
        FROM mensagem m
        JOIN usuario r ON m.fkRemetente = r.id
        JOIN usuario d ON m.fkDestinatario = d.id
        WHERE (m.fkRemetente = ${fkRemetente} AND m.fkDestinatario = ${fkDestinatario})
           OR (m.fkRemetente = ${fkDestinatario} AND m.fkDestinatario = ${fkRemetente})
        ORDER BY m.horario DESC, m.id DESC
        LIMIT 1 OFFSET ${offset};
    `;
    return database.executar(instrucaoSql);
}

function inserirMensagem(fkRemetente, fkDestinatario, conteudo) {
    var instrucaoSql = `
        INSERT INTO mensagem (fkRemetente, fkDestinatario, conteudo)
        VALUES (${fkRemetente}, ${fkDestinatario}, '${conteudo}');
    `;
    return database.executar(instrucaoSql);
}

function editarMensagem(id, novoConteudo) {
    var instrucaoSql = `UPDATE mensagem SET conteudo = '${novoConteudo}' WHERE id = ${id};`;
    return database.executar(instrucaoSql);
}

function removerMensagem(id) {
    var instrucaoSql = `DELETE FROM mensagem WHERE id = ${id};`;
    return database.executar(instrucaoSql);
}

function listarChats(profissionalId) {

    const instrucaoSql = `
        SELECT DISTINCT u.id, u.nome, u.foto FROM usuario u
            JOIN mensagem m ON (u.id = m.fkRemetente OR u.id = m.fkDestinatario)
            WHERE (m.fkRemetente = ${profissionalId} OR m.fkDestinatario = ${profissionalId})
                AND u.id != ${profissionalId};
    `;
    return database.executar(instrucaoSql)
}

module.exports = {
    pegarMensagens,
    ultimaMensagem,
    inserirMensagem,
    editarMensagem,
    removerMensagem,
    listarChats
};