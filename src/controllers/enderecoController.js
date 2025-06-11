var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    console.log("Requisição recebida com corpo:", req.body);

    var uf = req.body.uf;
    var cidade = req.body.cidade;

    if (uf == undefined) {
        res.status(400).send("Seu uf está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else {
        enderecoModel.cadastrar(uf, cidade)
            .then(resultado => {
                res.status(200).json({ fkEndereco: resultado.insertId });
            })
            .catch(erro => {
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar
}
