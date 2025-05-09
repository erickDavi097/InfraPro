var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {

    console.log("Requisição recebida com corpo:", req.body);

    var cep = req.body.cepServer;
    var uf = req.body.ufServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Seu uf está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else {

        enderecoModel.cadastrar(cep, uf, cidade, bairro, logradouro, numero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}