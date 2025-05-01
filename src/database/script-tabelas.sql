CREATE DATABASE infraPro;
USE infraPro;

CREATE TABLE endereco(
	id INT PRIMARY KEY AUTO_INCREMENT,
    cep INT,
    uf CHAR(2),
    cidade VARCHAR(45),
    bairro VARCHAR(45),
    logradouro VARCHAR(45),
    numero VARCHAR(5)
);

CREATE TABLE usuario(
	id INT AUTO_INCREMENT,
    fkEndereco INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45),
    cpf VARCHAR(14),
    telefone VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(225) NOT NULL,
    tipo VARCHAR(15),
    biografia VARCHAR(225),
	CONSTRAINT pkComposta
		PRIMARY KEY(id, fkEndereco),
	CONSTRAINT fkUsuarioEnd FOREIGN KEY(fkEndereco)
		REFERENCES endereco(id)
);
ALTER TABLE usuario ADD CONSTRAINT chktipoUsuario
	CHECK(tipo IN('profissional', 'cliente', 'administrador'));

CREATE TABLE contato(
	id INT AUTO_INCREMENT,
	fkUsuario INT NOT NULL,
	assunto VARCHAR(100),
	mensagem VARCHAR(225),
    CONSTRAINT pkComposta
	PRIMARY KEY(id, fkUsuario),
	CONSTRAINT fkUsuarioContato FOREIGN KEY(fkUsuario) 
		REFERENCES usuario(id)
);

CREATE TABLE portifolio(
	id INT AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    imagem VARCHAR(225),
    descricao VARCHAR(225),
    CONSTRAINT pkComposta
		PRIMARY KEY(id, fkUsuario),
	CONSTRAINT fkPortifolioUser FOREIGN KEY(fkUsuario)
		REFERENCES usuario(id)
);

CREATE TABLE servico(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    valorBase DECIMAL(6,2),
    descricao VARCHAR(225),
    categoria VARCHAR(45),
    dtCriacao DATETIME
);

CREATE TABLE publicacao(
	id INT AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    fkServico INT NOT NULL,
    titulo VARCHAR(100),
    conteudo VARCHAR(255),
    imagem VARCHAR(225),
    status VARCHAR(15) DEFAULT 'pendente',
    dtCriacao DATETIME,
    CONSTRAINT pkComposta
		PRIMARY KEY(id, fkUsuario, fkServico),
    CONSTRAINT fkPublicacaoUserServico FOREIGN KEY(fkUsuario)
		REFERENCES usuario(id),
        FOREIGN KEY(fkServico)
			REFERENCES servico(id)
);
ALTER TABLE publicacao ADD CONSTRAINT chkStatusPublicacao
	CHECK(status IN('pendente', 'aceito', 'recusado'));

CREATE TABLE mensagem(
	id INT AUTO_INCREMENT,
    fkRemetente INT NOT NULL,
    fkDestinatario INT NOT NULL,
    CONSTRAINT pkComposta
		PRIMARY KEY(id, fkRemetente, fkDestinatario),
    conteudo VARCHAR(225),
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(15) DEFAULT 'enviado',
    CONSTRAINT fkRemetente FOREIGN KEY(fkRemetente) 
		REFERENCES usuario(id),
    CONSTRAINT fkDestinatario FOREIGN KEY(fkDestinatario)
		REFERENCES usuario(id)
);
ALTER TABLE mensagem ADD CONSTRAINT chkStatusMensagem
	CHECK(status IN('enviado', 'lido', 'respondido'));

INSERT INTO endereco (cep, uf, cidade, bairro, logradouro, numero) VALUES
	(12345678, 'SP', 'São Paulo', 'Vila Madalena', 'Rua dos Três Irmãos', '55'),
	(23456789, 'RJ', 'Rio de Janeiro', 'Copacabana', 'Avenida Atlântica', '123'),
	(34567890, 'MG', 'Belo Horizonte', 'Centro', 'Rua dos Pioneiros', '101');

INSERT INTO usuario (fkEndereco, nome, sobrenome, cpf, telefone, email, senha, tipo, biografia) VALUES
	(1, 'Carlos', 'Silva', '12345678901', '11987654321', 'carlos@exemplo.com', 'senha123', 'cliente', 'Gosta de reformas simples em casa.'),
	(2, 'Maria', 'Oliveira', '23456789012', '21987654321', 'maria@exemplo.com', 'senha456', 'profissional', 'Especialista em hidráulica e eletricidade.'),
	(3, 'João', 'Pereira', '34567890123', '31987654321', 'joao@exemplo.com', 'senha789', 'cliente', 'Interessado em serviços de pintura.');

INSERT INTO portifolio (fkUsuario, imagem, descricao) VALUES
	(2, 'imagem1.jpg', 'Reforma de banheiro e cozinha em apartamento.'),
	(2, 'imagem2.jpg', 'Instalação elétrica em residência.'),
	(2, 'imagem3.jpg', 'Pintura de fachada de casa.');

INSERT INTO servico (nome, valorBase, descricao, categoria, dtCriacao) VALUES
	('Reforma de Banheiro', 2000.00, 'Reforma completa de banheiro, incluindo pisos, azulejos e instalações hidráulicas.', 'Reforma', '2025-04-01 10:00:00'),
	('Instalação Elétrica', 800.00, 'Instalação de sistema elétrico para residência, incluindo tomadas e interruptores.', 'Instalação', '2025-04-02 11:00:00'),
	('Pintura de Fachada', 1500.00, 'Pintura externa de imóveis residenciais e comerciais.', 'Pintura', '2025-04-03 12:00:00');

INSERT INTO publicacao (fkUsuario, fkServico, titulo, conteudo, imagem, status, dtCriacao) VALUES
	(2, 1, 'Reforma de Banheiro - Proposta', 'Proposta para reforma de banheiro com troca de azulejos e pisos.', 'banheiro.jpg', 'pendente', '2025-04-01 14:00:00'),
	(2, 2, 'Instalação Elétrica - Proposta', 'Proposta para instalação elétrica completa em residência.', 'eletrica.jpg', 'pendente', '2025-04-02 15:00:00'),
	(2, 3, 'Pintura de Fachada - Proposta', 'Proposta para pintura de fachada de casa e área externa.', 'fachada.jpg', 'pendente', '2025-04-03 16:00:00');

INSERT INTO mensagem (fkRemetente, fkDestinatario, conteudo) VALUES
	(1, 2, 'Gostaria de saber mais detalhes sobre a reforma do banheiro.'),
	(1, 2, 'Estou interessado na instalação elétrica para minha casa.'),
	(3, 2, 'Estou pensando em pintar a fachada da minha casa, você pode me ajudar?');


-- chat entre 2 pessoas com nome
SELECT m.id, r.nome AS Remetente, d.nome AS Destinatario, m.conteudo, m.horario
	FROM mensagem m
		JOIN usuario r ON m.fkRemetente = r.id
		JOIN usuario d ON m.fkDestinatario = d.id
		WHERE (m.fkRemetente = 1 AND m.fkDestinatario = 2)
			OR (m.fkRemetente = 2 AND m.fkDestinatario = 1)
		ORDER BY m.horario;
        
-- todos os serviços publicados por profissional
SELECT p.titulo, p.conteudo, s.nome, s.valorBase AS Valor, s.categoria, p.imagem
	FROM publicacao p
		JOIN servico s ON p.fkServico = s.id
		WHERE p.fkUsuario = 2;
        
-- portifolio de um profissional
SELECT u.nome, u.sobrenome, p.imagem, p.descricao
	FROM portifolio p 
		JOIN usuario u ON p.fkUsuario = u.id
		WHERE u.id = 2; 

-- servicos disponiveis e seus criadores
SELECT s.id, s.nome, s.valorBase, s.categoria, s.dtCriacao, u.nome AS Autor
	FROM servico s
		JOIN publicacao p ON p.fkServico = s.id
		JOIN usuario u ON p.fkUsuario = u.id;
        
-- clientes que entraram em contato com um profissional
SELECT u.id, u.nome FROM mensagem m
	JOIN usuario u ON m.fkRemetente = u.id
	WHERE m.fkDestinatario = 2
	GROUP BY u.id, u.nome;


-- PARA A DASHBOARD ADMINISTRATIVA
-- quantidade de profissionais cadastrados
SELECT COUNT(id) AS Total FROM usuario
	WHERE tipo = 'profissional';

-- quantidade de serviços publicados por categoria
SELECT s.categoria, COUNT(s.id) AS Total 
	FROM servico s GROUP BY s.categoria;

