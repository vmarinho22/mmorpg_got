/* Importar o MongoDB */
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'got';

var connMongoDB = function(dados){
    mongo.connect(url, function(err,client){
        // Verificando se existe erro de conexão
        assert.equal(null,err);
        console.log('Connect sucessfully to server');
        const db = client.db(dbName);
        query(db,dados);
        client.close();
    });
}

function query(db,dados){
    var collection = db.collection(dados.collection);
    switch (dados.operacao){
        case "inserir":
                collection.insertOne(dados.dados_usuario,dados.callback);
            break;

        case "recuperar":
                collection.findOne(dados.dados_usuario,dados.callback);
            break;

        default:
            break;
    }
}


module.exports = function(){
    return connMongoDB;
}