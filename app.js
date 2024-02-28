var Twig = require("twig"),
    express = require('express'),
    path = require('path'),
    app = express();

// Configure o diretório de visualizações para o Twig
app.set('views', path.join(__dirname, 'public', 'template'));

// Configure o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.set("twig options", {
    allowAsync: true, 
    strict_variables: false
});
let sidebar = true
app.get('/', function(req, res){
    res.render('index.twig', {
        message : "Hello World",
        template:"../views/inicio.twig",
       sidebar
    });
});

app.get('/professores', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/teachers.twig",
        sidebar,
        style: '../styles/teachers.css',
        title:'Professores',
        script:'../scripts/teachers.js'
       
    })
});
app.get('/alunos', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/students.twig",
        sidebar,
        style: '../styles/students.css',
        title:'Alunos',
        script:'../scripts/students.js'
       
    });
});
app.get('/turmas', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/classes.twig",
        sidebar,
        style: '../styles/classes.css',
        title:'Turmas',
        script:'../scripts/classes.js'
    });
});
app.get('/novidades', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/news.twig",
        sidebar,
        style: '../styles/news.css',
        title:'Novidades',
        script:'../scripts/news.js'
    });
});
app.get('/minha-conta', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/user.twig",
        sidebar,
        style: '../styles/user.css',
        title:'Minha conta',
        script:'../scripts/user.js'
    });
});

app.get('/login', function(req, res){
    sidebar = false
    res.render('index.twig', {
        template:"../views/login.twig",
        sidebar,
        style: '../styles/login.css',
        title:'login',
        script:'../scripts/login.js'
    });
});
app.get('/notas', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/grades.twig",
        sidebar,
        style: '../styles/grades.css',
        title:'Notas escolares',
        script:'../scripts/grades.js'
    });
});
var server = app.listen(9999, function() {
    console.log('Servidor Node.js iniciado. Escutando na porta 9999...');
});

server.on('error', function(err) {
    console.error('Erro ao iniciar o servidor:', err.message);
});
