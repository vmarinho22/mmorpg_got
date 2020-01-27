/* Importar o MongoDB */
var mongo = require('mongodb');

var mongodb = function(){
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', //Endereço do BD
            27017, //Porta de conexão
            {} //Parametros  de configuração do bd
        ),
        {} //Parametros  de configuração do servidor
    );

    return db;
}

module.exports = mongodb;