var usuarioModel = require("../models/usuarioModel");
var enderecoModel = require("../models/enderecoModel");
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
    const { nome, email, senha, fkEndereco, tipo } = req.body;

    console.log(`Recebido: nome=${nome}, email=${email}, senha=${senha}, idEndereco=${fkEndereco}, tipo=${tipo}`);

    usuarioModel.cadastrar(nome, email, senha, fkEndereco, tipo)
        .then(resultado => {
            res.status(200).json({ mensagem: "Usuário cadastrado com sucesso", idUsuario: resultado.insertId });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ erro: "Erro ao cadastrar usuário", detalhes: erro });
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

    usuarioModel.cadastrar(nomeServer, emailServer, senhaServer,idEndereco || 1, tipoServer)
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
            res.status(500).json({ erro: erro.sqlMessage || erro.message || erro });
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

            enderecoModel.buscarEnderecosPorUsuario(id)
                .then(enderecos => {
                    res.json({ ...usuario[0], enderecos });
                })
                .catch(err => res.status(500).json({ erro: err.sqlMessage }));
        })
        .catch(err => res.status(500).json({ erro: err.sqlMessage }));
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

async function perfilPublicoCompleto(req, res) {
    const id = req.params.id;

    try {
        const usuario = await usuarioModel.buscarPorId(id);
        if (usuario.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const endereco = await enderecoModel.buscarPorUsuarioId(id);
        const publicacoes = await publicacaoModel.buscarPublicacoesPorUsuarioId(id);

        if (usuario[0].foto) {
            usuario[0].foto = `/uploads/${usuario[0].foto}`;
        }

        res.json({
            usuario: usuario[0],
            endereco: endereco[0] || null,
            publicacoes: publicacoes || [],
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao buscar perfil público completo" });
    }
}

function salvarFoto(req, res) {
    const imagem = req.file.filename;
    const { nome, email, senha, fkEndereco, tipo } = req.body;

    const usuario = { nome, email, senha, tipo, fkEndereco, foto: imagem };

    usuarioModel.salvar(usuario)
        .then(() => res.status(201).send("Usuário criado com sucesso"))
        .catch(err => res.status(500).send(err));
}

function atualizarFoto(req, res) {
    if (!req.file) return res.status(400).send("Nenhuma imagem enviada.");

    const id = req.params.id;
    const imagem = req.file.filename;

    usuarioModel.atualizarFoto(id, imagem)
        .then(() => res.status(200).send("Foto atualizada com sucesso"))
        .catch(err => res.status(500).send(err));
}

function buscarFoto(req, res) {
    const id = req.params.id;

    usuarioModel.buscarImagemPorId(id)
        .then(resultado => {
            if (resultado.length > 0 && resultado[0].foto) {
                res.status(200).json({ foto: `/uploads/${resultado[0].foto}` });
            } else {
                res.status(404).json({ mensagem: 'Usuário não encontrado ou sem foto.' });
            }
        })
        .catch(erro => {
            console.error('Erro no buscarFoto:', erro);
            res.status(500).json({ erro: erro.message || erro.toString() });
        });
}

function atualizarBiografia(req, res) {
    const id = req.params.id;
    const { biografia } = req.body;

    if (!biografia || biografia.trim() === '') {
        return res.status(400).json({ erro: 'Biografia não pode estar vazia' });
    }

    usuarioModel.atualizarBiografia(id, biografia)
        .then(() => {
            res.status(200).json({ mensagem: 'Biografia atualizada com sucesso' });
        })
        .catch(erro => {
            res.status(500).json({ erro: erro.message || erro.toString() });
        });
}

function atualizarNome(req, res) {
    const id = req.params.id;
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({ erro: 'O nome não pode estar vazio' });
    }

    usuarioModel.atualizarNome(id, nome)
        .then(() => {
            res.status(200).json({ mensagem: 'Nome atualizado com sucesso' });
        })
        .catch(erro => {
            res.status(500).json({ erro: erro.message || erro.toString() });
        });
}

function atualizarSenha(req, res) {
    const id = req.params.id;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha || novaSenha.trim() === '') {
        return res.status(400).json({ erro: 'Preencha as senhas corretamente' });
    }

    usuarioModel.buscarPorId(id)
        .then(usuario => {
            if (!usuario) {
                res.status(404).json({ erro: 'Usuário não encontrado' });
                return Promise.reject('Usuário não encontrado');
            }
            const usuarioObjeto = usuario[0];

            if (usuarioObjeto.senha !== senhaAtual) {

                res.status(401).json({ erro: 'Senha atual incorreta' });
                return Promise.reject('Senha atual incorreta');
            }
            return usuarioModel.atualizarSenha(id, novaSenha);
        })
        .then(() => {
            res.status(200).json({ mensagem: 'Senha atualizada com sucesso' });
        })
        .catch(erro => {
            if (typeof erro === 'string') {
                // erro já tratado (rejeitado intencionalmente)
                return;
            }
            res.status(500).json({ erro: erro.message || erro.toString() });
        });
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
    buscarPerfilPublico,
    perfilPublicoCompleto,
    salvarFoto,
    atualizarFoto,
    buscarFoto,
    atualizarBiografia,
    atualizarNome,
    atualizarSenha
};
