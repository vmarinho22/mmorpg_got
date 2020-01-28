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

UsuariosDAO.prototype.autenticaUsuario = function(dados_usuario,req,res){
    var dados = {
        operacao: 'recuperar',
        dados_usuario: dados_usuario,
        collection: "usuarios",
        callback: function(err,result){
            // Verificando se a respostado bd não é nula
            if(result != null){
                //Iniciando sessão
                req.session.autorizado = true;
                req.session.usuario = result.usuario;
                req.session.casa = result.usuario;
            }else{
                req.session.autorizado = false;
            }
            //Verificando se a sessão foi iniciada
            if(req.session.autorizado){
                res.redirect('jogo');
            }else{
                res.render('index',{validacao: 'Usuário não encontrado'});
            }
        }
    };
    this._connection(dados);
}

module.exports = function(){
    return UsuariosDAO;
}