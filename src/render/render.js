const express = require('express')

const router = express.Router()

const path = require('path')

let sidebar = true

router.get('/', function(req, res){
    res.render('index.twig', {
        message : "Hello World",
        template:"../views/inicio.twig",
       sidebar
    });
});

router.get('/professores', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/teachers.twig",
        sidebar,
        style: '../styles/teachers.css',
        title:'Professores',
        script:'../scripts/teachers.js'
       
    })
});
router.get('/alunos', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/students.twig",
        sidebar,
        style: '../styles/students.css',
        title:'Alunos',
        script:'../scripts/students.js'
       
    });
});
router.get('/turmas', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/teams.twig",
        sidebar,
        style: '../styles/teams.css',
        title:'Turmas',
        script:'../scripts/teams.js'
    });
});
router.get('/novidades', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/news.twig",
        sidebar,
        style: '../styles/news.css',
        title:'Novidades',
        script:'../scripts/news.js'
    });
});
router.get('/minha-conta', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/user.twig",
        sidebar,
        style: '../styles/user.css',
        title:'Minha conta',
        script:'../scripts/user.js'
    });
});

router.get('/login', function(req, res){
    sidebar = false
    res.render('index.twig', {
        template:"../views/login.twig",
        sidebar,
        style: '../styles/login.css',
        title:'login',
        script:'../scripts/login.js'
    });
});
router.get('/notas', function(req, res){
    sidebar = true
    res.render('index.twig', {
        template:"../views/grades.twig",
        sidebar,
        style: '../styles/grade.css',
        title:'Notas escolares',
        script:'../scripts/grades.js'
    });
});

module.exports = router;