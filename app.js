
var Twig = require("twig"),
    express = require('express'),
    path = require('path'),
    app = express(); 
    routes = require('./src/render/render.js');
    routesBack = require('./src/teacher/teacher.controller.js');

    const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://annalutw:%40Nyb220377@escolaefficient.60aw2nk.mongodb.net/?retryWrites=true&w=majority&appName=EscolaEfficient')
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));
    
    
     

app.set('views', path.join(__dirname, 'public', 'template'));
app.use(express.static(path.join(__dirname, 'public')));  
app.use(express.json());
app.use('/', routes);
app.use('/api', routesBack);

app.set("twig options", {
    allowAsync: true, 
    strict_variables: false
}); 

var server = app.listen(9999, function() {
    console.log('Servidor Node.js iniciado. Escutando na porta 9999...');
});

server.on('error', function(err) {
    console.error('Erro ao iniciar o servidor:', err.message);
});

module.exports = { app }; 