var database = require("../database/config");

function buscarUsuario(id) {
    const instrucaoSql = `SELECT nome, email, foto FROM usuario WHERE id = ${id}`;
    console.log("Executando SQL de edição:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPublicacoes(idUsuario) {
    const instrucaoSql = `
        SELECT COUNT(*) AS total FROM publicacao WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando SQL de contagem de publicações:", instrucaoSql);
    return database.executar(instrucaoSql);
}
function mediaPrecoPublicacoes(idUsuario) {
    const instrucaoSql = `
        SELECT AVG(preco) AS media FROM publicacao WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}
function contarCurtidasRecebidas(idUsuario) {
    const instrucaoSql = `
        SELECT COUNT(*) AS totalCurtidas
        FROM curtida
        JOIN publicacao ON curtida.fkPublicacao = publicacao.id
        WHERE publicacao.fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function publicacoesMaisEngajadasMes(idUsuario) {
    const instrucaoSql = `
        SELECT 
            p.id,
            p.titulo,
            COUNT(DISTINCT c.id) AS totalComentarios,
            COUNT(DISTINCT cu.id) AS totalCurtidas,
            (COUNT(DISTINCT c.id) + COUNT(DISTINCT cu.id)) AS totalEngajamento
        FROM publicacao p
        LEFT JOIN comentario c ON p.id = c.fkPublicacao 
            AND MONTH(c.dataHora) = MONTH(NOW()) AND YEAR(c.dataHora) = YEAR(NOW())
        LEFT JOIN curtida cu ON p.id = cu.fkPublicacao 
            AND MONTH(cu.dataHora) = MONTH(NOW()) AND YEAR(cu.dataHora) = YEAR(NOW())
        WHERE p.fkUsuario = ${idUsuario}
          AND MONTH(p.dtCriacao) = MONTH(NOW()) AND YEAR(p.dtCriacao) = YEAR(NOW())
        GROUP BY p.id
        ORDER BY totalEngajamento DESC LIMIT 3;
    `;
    return database.executar(instrucaoSql);
}
function seguidoresPorMes(idUsuario) {
  const instrucaoSql = `
    SELECT DATE_FORMAT(datahora, '%Y-%m') AS mes,
      COUNT(*) AS seguidoresGanhos
    FROM seguidores
    WHERE fkUsuario = ${idUsuario}
    GROUP BY mes
    ORDER BY mes;
  `;
  console.log("Executando SQL de seguidores por mês:", instrucaoSql);
  return database.executar(instrucaoSql);
}
function seguidoresPorEstado(idUsuario) {

  const instrucaoSql = `
    SELECT e.uf AS estado, COUNT(*) AS totalSeguidores
    FROM seguidores s
    JOIN usuario u ON s.fkSeguidor = u.id
    JOIN endereco e ON u.fkEndereco = e.id
    WHERE s.fkUsuario = ${idUsuario}
    GROUP BY e.uf
    ORDER BY totalSeguidores DESC
    LIMIT 5;
  `;
  return database.executar(instrucaoSql);
}
function publicacoesPorCategoria(idUsuario){
    const instrucaoSql = `
    SELECT c.nome AS categoria, COUNT(p.id) AS totalPublicacoes FROM categoria c
    LEFT JOIN publicacao p ON p.fkCategoria = c.id AND p.fkUsuario = ${idUsuario}
    GROUP BY c.nome ORDER BY totalPublicacoes DESC;
  `;
    console.log("Executando SQL de seguidores por mês:", instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    buscarUsuario,
    contarPublicacoes,
    mediaPrecoPublicacoes,
    contarCurtidasRecebidas,
    publicacoesMaisEngajadasMes,
    seguidoresPorMes,
    seguidoresPorEstado,
    publicacoesPorCategoria
};
