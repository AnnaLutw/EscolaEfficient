// routes.js

const express = require('express');
const path = require('path');
const router = express.Router();

// Não configure o diretório de visualizações aqui

// Configure o diretório de arquivos estáticos
router.use(express.static(path.join(__dirname, '..', 'public')));
router.get('/', function(req, res){
    res.render('index.twig', {
        message : "Hello World",
        template: "../views/inicio.twig", // Mantido o caminho relativo para o arquivo de template
    });
});

router.get('/login', function(req, res){
    res.render('index.twig', {});
});

module.exports = router;
