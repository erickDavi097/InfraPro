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

module.exports = {
    seguir,
    deixarDeSeguir,
    verificarSeguindo
};
