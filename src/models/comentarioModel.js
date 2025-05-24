var database = require("../database/config");

function listarPorPublicacao(fkPublicacao) {
    var instrucaoSql = `
        SELECT comentario.id, comentario.texto, comentario.dataHora, usuario.nome AS usuarioNome
        FROM comentario
        JOIN usuario ON comentario.fkUsuario = usuario.id
        WHERE comentario.fkPublicacao = ${fkPublicacao}
        ORDER BY comentario.dataHora DESC;
    `;
    return database.executar(instrucaoSql);
}

function listarComentariosDetalhados(fkPublicacao) {
    var instrucaoSql = `
        SELECT c.id, c.texto, c.dataHora, u.nome AS usuarioNome, u.foto AS usuarioFoto
        FROM comentario c
        JOIN usuario u ON c.fkUsuario = u.id
        WHERE c.fkPublicacao = ${fkPublicacao}
        ORDER BY c.dataHora DESC;
    `;
    return database.executar(instrucaoSql);
}

function criarComentario(fkUsuario, fkPublicacao, texto) {
    var instrucaoSql = `
        INSERT INTO comentario (fkUsuario, fkPublicacao, texto) 
        VALUES (${fkUsuario}, ${fkPublicacao}, '${texto}');
    `;
    return database.executar(instrucaoSql);
}

function deletarComentario(idComentario, fkUsuario) {
    var instrucaoSql = `
        DELETE FROM comentario 
        WHERE id = ${idComentario} AND fkUsuario = ${fkUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorPublicacao,
    criarComentario,
    deletarComentario,
    listarComentariosDetalhados
};
