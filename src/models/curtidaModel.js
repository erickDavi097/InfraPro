var database = require("../database/config");

function listarCurtidasPorPublicacao(fkPublicacao) {
    var instrucaoSql = `
        SELECT COUNT(*) AS totalCurtidas
        FROM curtida
        WHERE fkPublicacao = ${fkPublicacao};
    `;
    return database.executar(instrucaoSql);
}

function verificarSeUsuarioCurtiu(fkUsuario, fkPublicacao) {
    var instrucaoSql = `
        SELECT * FROM curtida
        WHERE fkUsuario = ${fkUsuario} AND fkPublicacao = ${fkPublicacao};
    `;
    return database.executar(instrucaoSql);
}

function curtir(fkUsuario, fkPublicacao) {
    var instrucaoSql = `
        INSERT INTO curtida (fkUsuario, fkPublicacao)
        VALUES (${fkUsuario}, ${fkPublicacao});
    `;
    return database.executar(instrucaoSql);
}

function descurtir(fkUsuario, fkPublicacao) {
    var instrucaoSql = `
        DELETE FROM curtida
        WHERE fkUsuario = ${fkUsuario} AND fkPublicacao = ${fkPublicacao};
    `;
    return database.executar(instrucaoSql);
}

function listarUsuariosPorPublicacao(fkPublicacao) {
    var instrucaoSql = `
        SELECT u.id AS idUsuario, u.nome, u.foto
        FROM curtida c
        JOIN usuario u ON c.fkUsuario = u.id
        WHERE c.fkPublicacao = ${fkPublicacao};
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    listarCurtidasPorPublicacao,
    listarUsuariosPorPublicacao,
    verificarSeUsuarioCurtiu,
    curtir,
    descurtir
};
