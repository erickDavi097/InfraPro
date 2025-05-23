var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    const instrucaoSql = `SELECT id, fkEndereco, nome, telefone, email, tipo, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(fkEndereco, nome, telefone, email, senha, tipo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    const instrucaoSql = `INSERT INTO usuario (fkEndereco, nome, telefone, email, senha, tipo) VALUES ('${fkEndereco}', '${nome}','${telefone}', '${email}', '${senha}', '${tipo}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarTodos() {
    const instrucaoSql = `SELECT id, nome, email, tipo, ativo FROM usuario;`;
    return database.executar(instrucaoSql);
}

function editar(id, nome, email, tipo) {
    const instrucaoSql = `UPDATE usuario SET nome = '${nome}', email = '${email}', tipo = '${tipo}' WHERE id = ${id};`;
    console.log("Executando SQL de edição:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function trocarStatus(id) {
    const instrucaoSql = `UPDATE usuario SET ativo = CASE WHEN ativo = 1 THEN 0 ELSE 1 END WHERE id = ${id}`
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    const instrucaoSql = `SELECT id, nome, email, foto, tipo FROM usuario WHERE id = ${id}`;
    console.log("Executando SQL de edição:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarSeguidores(idUsuario) {
    const instrucaoSql = `
        SELECT COUNT(u.id) AS count FROM seguidores s
        JOIN usuario u ON s.fkSeguidor = u.id
        WHERE s.fkUsuario = ${idUsuario} AND s.statusSeguidores = 'ativo';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarPerfilPublico(id) {
    const instrucaoSql = `
        SELECT u.id, u.nome, u.email, u.biografia, u.foto, e.cidade, e.bairro, e.uf FROM usuario u
        LEFT JOIN endereco e ON u.fkEndereco = e.id
        WHERE u.id = ${id};
    `;
    return database.executar(instrucaoSql);
}
function listarSeguidores(idUsuario){
    const instrucaoSql = `
        SELECT u.id, u.nome, u.foto FROM seguidores s
        JOIN usuario u ON s.fkSeguidor = u.id
        WHERE s.fkUsuario = ${idUsuario} AND s.statusSeguidores = 'ativo'
    `;
    return database.executar(instrucaoSql);
}
function salvarFoto(usuario) {
    const instrucaoSql = `
        INSERT INTO usuario (fkEndereco, nome, email, senha, tipo, foto)
        VALUES (${usuario.fkEndereco}, '${usuario.nome}', '${usuario.email}', '${usuario.senha}', '${usuario.tipo}', '${usuario.foto}')
    `;
  return database.executar(instrucaoSql);
}
function atualizarFoto(idUsuario, novaFoto) {
    const instrucaoSql = `UPDATE usuario SET foto = '${novaFoto}' WHERE id = ${idUsuario};`;
    return database.executar(instrucaoSql);
}
function buscarImagemPorId(idUsuario) {
    const instrucaoSql = `SELECT foto FROM usuario WHERE id = ${idUsuario};`;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarTodos,
    editar,
    trocarStatus,
    buscarPorId,
    contarSeguidores,
    buscarPerfilPublico,
    listarSeguidores,
    salvarFoto,
    atualizarFoto,
    buscarImagemPorId
};