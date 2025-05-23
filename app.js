
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';


require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var enderecoRouter = require("./src/routes/enderecos");
var usuarioRouter = require("./src/routes/usuarios");
var seguidoresRouter = require("./src/routes/seguidores");
var publicacaoRouter = require("./src/routes/publicacao");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(cors());

app.use("/", indexRouter);
app.use("/endereco", enderecoRouter);
app.use("/usuario", usuarioRouter);
app.use("/seguidores", seguidoresRouter);
app.use("/publicacoes", publicacaoRouter);


app.listen(PORTA_APP, function () {
    console.log(`                                                                                               
    Servidor rodando! caminho: http://${HOST_APP}:${PORTA_APP} \n\n
    Ambiente: ${process.env.AMBIENTE_PROCESSO}. \n\n
    \t> "desenvolvimento" se você está se conectando ao banco local. \n
    \t> "producao" se você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, mude "desenvolvimento" para "producao" no arquivo 'app.js'\n\n`);
});
