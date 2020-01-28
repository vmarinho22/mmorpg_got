/* Criando um Objeto de Usuários */
function UsuariosDAO(connection){
    this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(dados_usuario,res){
    var dados = {
        operacao: 'inserir',
        dados_usuario: dados_usuario,
        collection: "usuarios",
        callback: function(err,result){
            res.send('Deu certo');
        }
    };
    this._connection(dados);
}

module.exports = function(){
    return UsuariosDAO;
}