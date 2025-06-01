var database = require("../database/config");

function seguir(fkUsuario, fkSeguidor) {
    const instrucaoSql = `
        INSERT INTO seguidores (fkUsuario, fkSeguidor, statusSeguidores)
        VALUES (${fkUsuario}, ${fkSeguidor}, 'ativo')
        ON DUPLICATE KEY UPDATE statusSeguidores = 'ativo';
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function deixarDeSeguir(fkUsuario, fkSeguidor) {
    const instrucaoSql = `
        UPDATE seguidores SET statusSeguidores = 'inativo'
        WHERE fkUsuario = ${fkUsuario} AND fkSeguidor = ${fkSeguidor};
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarSeguindo(fkUsuario, fkSeguidor) {
    const instrucaoSql = `
        SELECT statusSeguidores FROM seguidores
        WHERE fkUsuario = ${fkUsuario} AND fkSeguidor = ${fkSeguidor};
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarSeguidores(fkUsuario) {
    const instrucaoSql = `
        SELECT COUNT(*) AS count FROM seguidores s
        WHERE s.fkUsuario = ${fkUsuario} AND s.statusSeguidores = 'ativo';
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEuSigo(fkUsuario) {
    const instrucaoSql = `
        SELECT u.id, u.nome, u.foto FROM seguidores s
        JOIN usuario u ON s.fkSeguidor = u.id
        WHERE s.fkUsuario = ${fkUsuario} AND s.statusSeguidores = 'ativo';
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarEuSigo(fkSeguidor) {
    const instrucaoSql = `
        SELECT COUNT(*) AS count FROM seguidores s
        WHERE s.fkSeguidor = ${fkSeguidor} AND s.statusSeguidores = 'ativo';
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarSeguidores(fkUsuario) {
    const instrucaoSql = `
        SELECT u.id, u.nome, u.foto FROM seguidores s
        JOIN usuario u ON s.fkUsuario = u.id
        WHERE s.fkSeguidor = ${fkUsuario} AND s.statusSeguidores = 'ativo';
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    seguir,
    deixarDeSeguir,
    verificarSeguindo,
    contarSeguidores,
    listarSeguidores,
    contarEuSigo,
    listarEuSigo
};
