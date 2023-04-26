// Exemplificação dos comandos git
// biblioteca js que faz o mapeamento das pastas em função do server.js
require('rootpath')(); 
// Inicialização do express. 
var express = require('express');
// essa biblioteca será utilizada na API para fazer autenticaçao seguindo o método JWT. 
// Se quiser estudar um pouco mais sobre JWT, pesquise aqui
// https://jwt.io/introduction/
var expressJwt = require('express-jwt');
var config = require("./config.json");
var cors = require('cors');

// Criação da API e indicação que trabalha com JSON
var api = express();
api.use(cors());
api.use(express.urlencoded());
api.use(express.json());

api.use('/api/about', require('./controllers/api/about.controller'));
api.use('/api/sequenceProduct', require('./controllers/api/sequenceProduct.controller'));

var apiPort = process.env.PORT || config.port;

var serverAPI = api.listen(apiPort, function () {
    console.log('Server API listening at http://' + serverAPI.address().address + ':' + serverAPI.address().port);
});

console.log('Application started');
