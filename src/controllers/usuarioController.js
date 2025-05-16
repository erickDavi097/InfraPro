var usuarioModel = require("../models/usuarioModel");
var enderecoModel = require("../models/enderecoModel");
const portifolioModel = require('../models/portifolioModel');
const publicacaoModel = require('../models/publicacaoModel');


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email ou senha indefinido!");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            if (resultadoAutenticar.length == 1) {
                const usuario = resultadoAutenticar[0];

                enderecoModel.buscarEnderecosPorUsuario(usuario.id)
                    .then((resultadoEnderecos) => {
                        res.status(200).json({
                            id: usuario.id,
                            email: usuario.email,
                            nome: usuario.nome,
                            tipo: usuario.tipo,
                            senha: usuario.senha,
                            enderecos: resultadoEnderecos
                        });
                    })
                    .catch((erro) => {
                        console.error("Erro ao buscar endereços:", erro);
                        res.status(500).json({ erro: erro.sqlMessage });
                    });

            } else if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao realizar o login:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function autenticarAdmin(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email ou senha indefinido!");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            if (resultadoAutenticar.length == 1) {
                const usuario = resultadoAutenticar[0];

                if (usuario.tipo !== "administrador") {
                    return res.status(403).json({ mensagem: "Apenas administradores podem acessar essa área." });
                }

                enderecoModel.buscarEnderecosPorUsuario(usuario.id)
                    .then((resultadoEnderecos) => {
                        res.status(200).json({
                            id: usuario.id,
                            email: usuario.email,
                            nome: usuario.nome,
                            tipo: usuario.tipo,
                            senha: usuario.senha,
                            enderecos: resultadoEnderecos
                        });
                    })
                    .catch((erro) => {
                        console.error("Erro ao buscar endereços:", erro);
                        res.status(500).json({ erro: erro.sqlMessage });
                    });

            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao realizar o login admin:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}


function cadastrar(req, res) {
    var {
        nomeServer: nome,
        telefoneServer: telefone,
        emailServer: email,
        senhaServer: senha,
        tipoServer: tipo,
        idEndereco
    } = req.body;

    console.log("Requisição recebida para cadastrar usuário:", req.body);

    if (!idEndereco) {
        return res.status(400).json({ mensagem: "idEndereco é obrigatório" });
    }

    usuarioModel.cadastrar(idEndereco, nome, telefone, email, senha, tipo)
        .then(resultadoUsuario => {
            res.status(200).json({ mensagem: "Cadastro realizado com sucesso!", resultadoUsuario });
        })
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar o usuário", erro: erro.sqlMessage });
        });
}

function cadastrarAdmin(req, res) {
    const {
        nomeServer,
        emailServer,
        senhaServer,
        tipoServer,
        codigo_verificacao,
        idEndereco
    } = req.body;

    console.log("Dados recebidos para admin:", req.body);

    if (codigo_verificacao !== "ADMIN-1234") {
        return res.status(400).send("Código de verificação inválido.");
    }

    usuarioModel.cadastrar(idEndereco || 1, nomeServer, '',  emailServer, senhaServer, tipoServer)
        .then(() => {
            res.status(200).json({ mensagem: "Admin cadastrado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao cadastrar administrador:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar administrador", erro: erro.sqlMessage });
        });
}
function listarUsuarios(req, res) {
    usuarioModel.listarTodos()
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => {
            console.error("Erro ao listar usuários:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function editar(req, res) {
    console.log('Editar chamado com id:', req.params.id);
    console.log('Dados recebidos no corpo:', req.body);

    const { id } = req.params;
    const { nome, email, tipo } = req.body;

    usuarioModel.editar(id, nome, email, tipo)
        .then(() => res.sendStatus(200))
        .catch(erro => {
        console.error('Erro ao editar usuário:', erro);
        res.status(500).json({ erro: erro.sqlMessage || erro.message || erro });
    });

}

function suspenderUsuario(req, res) {
    const id = req.params.id;
    usuarioModel.trocarStatus(id)
        .then(() => res.status(200).json({ mensagem: "Status alterado com sucesso" }))
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage }));
}

function buscarPorId(req, res) {
    const id = req.params.id;
    usuarioModel.buscarPorId(id)
        .then(usuario => {
            if (usuario.length === 0) return res.status(404).send("Usuário não encontrado");
            
            // Busca endereços relacionados para enviar junto
            enderecoModel.buscarEnderecosPorUsuario(id)
                .then(enderecos => {
                    res.json({...usuario[0], enderecos});
                })
                .catch(err => res.status(500).json({ erro: err.sqlMessage }));
        })
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
}

function contarSeguidores(req, res) {
    const idUsuario = req.params.id;

    usuarioModel.contarSeguidores(idUsuario)
        .then((resultado) => {
            if (resultado.length === 0) {
                return res.json({ count: 0 });
            }
            return res.json({ count: resultado[0].count });
        })
        .catch((erro) => {
            console.error("Erro ao contar seguidores:", erro);
            res.status(500).json({ erro: erro.sqlMessage || erro.message });
        });
}
function buscarPerfilPublico(req, res) {
    const id = req.params.id;
    usuarioModel.buscarPerfilPublico(id)
        .then(usuario => {
            if (usuario.length === 0) return res.status(404).send("Usuário não encontrado");
            enderecoModel.buscarEnderecosPorUsuario(id)
                .then(enderecos => {
                    res.json({ ...usuario[0], enderecos });
                })
                .catch(err => res.status(500).json({ erro: err.sqlMessage }));
        })
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
}
function listarSeguidoresController(req, res) {
    const id = req.params.id;
    usuarioModel.listarSeguidores(id)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao buscar seguidores" });
        });
}
async function perfilPublicoCompleto(req, res) {
  const id = req.params.id;

  try {
    const usuario = await usuarioModel.buscarPorId(id);
    if (usuario.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const endereco = await enderecoModel.buscarPorUsuarioId(id);
    const portifolio = await portifolioModel.buscarPorUsuarioId(id);
    const publicacoes = await publicacaoModel.buscarPublicacoesPorUsuarioId(id);
    
    res.json({
      usuario: usuario[0],
      endereco: endereco[0] || null,
      portifolio: portifolio || [],
      publicacoes: publicacoes || [],
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao buscar perfil público completo" });
  }
}


module.exports = {
    cadastrar,
    cadastrarAdmin,
    autenticar,
    autenticarAdmin,
    listarUsuarios,
    editar,
    suspenderUsuario,
    buscarPorId,
    contarSeguidores,
    buscarPerfilPublico,
    listarSeguidoresController,
    perfilPublicoCompleto
};
    