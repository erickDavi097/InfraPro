var database = require("../database/config");

function buscarEnderecosPorUsuario(usuarioId) {
    return new Promise((resolve, reject) => {
        var instrucaoSql = `
            SELECT * FROM endereco WHERE usuario_id = ${usuarioId};
        `;
        console.log("Executando a instrução SQL para buscar endereços: \n" + instrucaoSql);
        database.executar(instrucaoSql).then(result => {
            resolve(result);
        }).catch(erro => {
            reject(erro);
        });
    });
}

function buscarEnderecosPorUsuario(usuarioId) {

var instrucaoSql = `
            SELECT * FROM endereco WHERE id IN ( SELECT fkEndereco FROM usuario WHERE id = ${usuarioId});`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(cep, uf, cidade, bairro, logradouro, numero) {
    console.log("ACESSEI O ENDEREÇO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep, uf, cidade, bairro, logradouro, numero);
    
   
    var instrucaoSql = `
        INSERT INTO endereco (cep, uf, cidade, bairro, logradouro, numero) VALUES ('${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}', '${numero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    buscarEnderecosPorUsuario
};