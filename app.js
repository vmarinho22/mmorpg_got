/* importar as configurações do servidor */
var app = require('./config/server');



/* parametrizar a porta de escuta */
app.listen(5500, function(){
	console.log('Servidor online');
});