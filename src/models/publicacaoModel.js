const database = require("../database/config");

function buscarPublicacoesPorUsuarioId(idUsuario) {
    const instrucaoSql = `
        SELECT id, titulo, conteudo, imagem, dtCriacao FROM publicacao 
        WHERE fkUsuario = ${idUsuario}
        ORDER BY dtCriacao DESC
    `;
    console.log("Executando SQL de publicações:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
  const instrucaoSql = `
    SELECT titulo, conteudo, imagem, id FROM publicacao
    WHERE fkUsuario = ${idUsuario}
    ORDER BY dtCriacao DESC;
  `;
  return database.executar(instrucaoSql);
}

function salvar(publicacao) {
  const instrucaoSql = `
    INSERT INTO publicacao (fkUsuario, fkCategoria, titulo, conteudo, imagem, preco, dtCriacao)
    VALUES (${publicacao.fkUsuario}, ${publicacao.fkCategoria}, '${publicacao.titulo}', '${publicacao.conteudo}', '${publicacao.imagem}', '${publicacao.preco}',DEFAULT);
  `;
  return database.executar(instrucaoSql);
}

function listarTodas() {
  const instrucaoSql = `SELECT * FROM vwPublicacoesCompleta ORDER BY dtCriacao DESC;`;
  return database.executar(instrucaoSql);
}
function editar(id, publicacao) {
  let campos = [];

  if (publicacao.titulo !== undefined && publicacao.titulo !== 'undefined') {
    campos.push(`titulo = '${publicacao.titulo}'`);
  }
  if (publicacao.conteudo !== undefined && publicacao.conteudo !== 'undefined') {
    campos.push(`conteudo = '${publicacao.conteudo}'`);
  }
  if (publicacao.fkCategoria !== undefined && publicacao.fkCategoria !== 'undefined') {
    campos.push(`fkCategoria = ${publicacao.fkCategoria}`);
  }
  if (publicacao.preco !== undefined && publicacao.preco !== 'undefined') {
    campos.push(`preco = '${publicacao.preco}'`);
  }
  if (publicacao.imagem !== undefined && publicacao.imagem !== 'undefined') {
    campos.push(`imagem = '${publicacao.imagem}'`);
  }

  if (campos.length === 0) {
    return Promise.reject("Nenhum campo enviado para atualizar.");
  }

  const instrucaoSql = `
    UPDATE publicacao
    SET ${campos.join(", ")}
    WHERE id = ${id};
  `;

  console.log("SQL gerado para atualização:");
  console.log(instrucaoSql);

  return database.executar(instrucaoSql);
}

function deletar(id) {
  const instrucaoSql = `DELETE FROM publicacao WHERE id = ${id};`;
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarPublicacoesPorUsuarioId,
  listarPorUsuario,
  salvar,
  listarTodas,
  editar,
  deletar
};
