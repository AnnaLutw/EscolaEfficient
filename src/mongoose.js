const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://annalutw:%40Nyb220377@escolaefficient.60aw2nk.mongodb.net/?retryWrites=true&w=majority&appName=EscolaEfficient')
.then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
.catch(err => console.error('Erro ao conectar ao banco de dados:', err));



module.exports =  mongoose;

