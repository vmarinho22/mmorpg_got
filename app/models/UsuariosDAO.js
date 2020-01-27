function UsuariosDAO(connection){
    this._connection = connection();
}


UsuariosDAO.prototype.insertUsuario = function(usuario){
    // Abre a conexão com o BD
    this._connection.open(function(error,mongoclient){
        // Abre a conexão e acessa a colletion desejada
        mongoclient.colletion('usuarios',function(error,colletion){
            colletion.insert(usuario);
        });
    });
}

module.exports = function(){
    return UsuariosDAO;
}