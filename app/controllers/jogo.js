module.exports.jogo = function(application,req,res){

    if(req.session.autorizado){
        res.render('jogo');
    }else{
        res.render('index',{validacao: 'Usuário não autenticado, por favor entre com sua conta'});
    }
    
}

module.exports.sair = function(application,req,res){
    req.session.destroy(function(err){
        res.render('index',{validacao: {}});
    });
}