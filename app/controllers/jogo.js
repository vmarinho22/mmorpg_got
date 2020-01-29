module.exports.jogo = function(application,req,res){

    if(!req.session.autorizado){
        res.render('index',{validacao: 'Usuário não autenticado, por favor entre com sua conta'});
        return;
    }


    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(usuario,casa,res,msg);
    
}

module.exports.sair = function(application,req,res){
    req.session.destroy(function(err){
        res.render('index',{validacao: {}});
    });
}

module.exports.suditos = function(application,req,res){
    if(!req.session.autorizado){
        res.render('index',{validacao: 'Usuário não autenticado, por favor entre com sua conta'});
        return;
    }
    res.render('aldeoes');
}

module.exports.pergaminhos = function(application,req,res){
    if(!req.session.autorizado){
        res.render('index',{validacao: 'Usuário não autenticado, por favor entre com sua conta'});
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var usuario = req.session.usuario;
    console.log(usuario);
    var msg = 'A';
    JogoDAO.getAcoes(usuario,res);

}

module.exports.ordernar_acao_sudito = function(application,req,res){

    var dadosForm = req.body;

    req.assert('acao','Uma ação deve ser informada').notEmpty();
    req.assert('quantidade','Uma quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
    console.log(dadosForm);

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var casa = req.session.casa;

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm,casa,res);

    res.redirect('jogo?msg=B');
}