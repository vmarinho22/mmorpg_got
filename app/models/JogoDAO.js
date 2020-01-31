function JogoDAO(connection){
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros= function(usuario,res){
    var dados = {
        operacao: 'inserir',
        dados_passados: {
            usuario: usuario,
            moeda: 10,
            suditos: 10,
            temor: Math.floor(Math.random() *1000),
            sabedoria: Math.floor(Math.random() *1000),
            comercio: Math.floor(Math.random() *1000),
            magia: Math.floor(Math.random() *1000)
        },
        collection: "jogo",
        callback: function(err,result){
            res.send('Deu certo');
        }
    };
    this._connection(dados);
}


JogoDAO.prototype.iniciaJogo = function(usuario,casa,res,msg){

    var dados = {
        operacao: 'recuperar',
        dados_passados: {usuario: usuario},
        collection: "jogo",
        callback: function(err,result){
           res.render('jogo',{img_casa: casa, jogo: result,msg: msg});
        }
    };
    this._connection(dados);

    
}


JogoDAO.prototype.acao = function(acao,casa,res){

    var date = new Date();
    date.getTime();


    var tempo = null;

    switch(acao.acao){
        case 1: 
            tempo = 1 * 60 * 60000;
            break;
        case 2: 
            tempo = 2 * 60 * 60000;
            break;
        case 3: 
            tempo = 5 * 60 * 60000;
            break;
        case 4: 
            tempo = 5 * 60 * 60000;
            break;
    }
    acao.acao_termina_em = date.getTime() + tempo;
    
    var dados = {
        operacao: 'inserir',
        dados_passados: acao,
        collection: "acao",
        callback: function(err,result){
            console.log('Enviou os dados ao banco');    
        }
    };
    this._connection(dados);

    
}

JogoDAO.prototype.getAcoes = function(usuario,res){
    var dados = {
        operacao: 'recuperarTodos',
        dados_passados: {usuario: usuario},
        collection: "acao",
        callback: function(err,result){
            console.log(result);
            res.render('pergaminhos',{acoes: result});
        }
    };
    this._connection(dados);
}

module.exports = function(){
    return JogoDAO;
}