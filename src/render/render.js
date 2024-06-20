const express = require('express')
const router = express.Router()
const path = require('path')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
let sidebar = true
const { getUserByCookie } = require('../helpers/helpers');

router.get('/', function(req, res){
    const type = getUserByCookie(req)
    res.render('index.twig', {
        message : "Hello World",
        template:"../views/inicio.twig",
       sidebar,
       type
    });
});

router.get('/professores', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = true
    res.render('index.twig', {
        template:"../views/teachers.twig",
        sidebar,
        style: '../styles/teachers.css',
        title:'Professores',
        script:'../scripts/teachers.js',
        type
       
    })
});
router.get('/alunos', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = true
    res.render('index.twig', {
        template:"../views/students.twig",
        sidebar,
        style: '../styles/students.css',
        title:'Alunos',
        script:'../scripts/students.js',
        type
       
    });
});
router.get('/turmas', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = true
    res.render('index.twig', {
        template:"../views/teams.twig",
        sidebar,
        style: '../styles/teams.css',
        title:'Turmas',
        script:'../scripts/teams.js',
        type
    });
});
router.get('/novidades', async function(req, res){
    try{
        const {userType} = await getUserByCookie(req);
        const type = userType
        sidebar = true
        res.render('index.twig', {
            template:"../views/news.twig",
            sidebar,
            style: '../styles/news.css',
            title:'Novidades',
            script:'../scripts/news.js',
            type
        });
    }catch(error){
        console.error(error);
        res.status(500).send('Erro ao obter o tipo de usuário');
    }
  
});
router.get('/minha-conta', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = true
    res.render('index.twig', {
        template:"../views/user.twig",
        sidebar,
        style: '../styles/user.css',
        title:'Minha conta',
        script:'../scripts/user.js',
        type
    });
});

router.get('/login', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = false
    res.render('index.twig', {
        template:"../views/login.twig",
        sidebar,
        style: '../styles/login.css',
        title:'login',
        script:'../scripts/login.js',
        type
    });
});
router.get('/notas', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = true
    res.render('index.twig', {
        template:"../views/grades.twig",
        sidebar,
        style: '../styles/grade.css',
        title:'Notas escolares',
        script:'../scripts/grades.js',
        type
    });
});
router.get('/calendario', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = true
    res.render('index.twig', {
        template:"../views/calendar.twig",
        sidebar,
        style: '../styles/calendar.css',
        title:'Calendario do aluno',
        script:'../scripts/calendar.js',
        type
    });
});
router.get('/registrar', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    sidebar = false
    res.render('index.twig', {
        template:"../views/register.twig",
        sidebar,
        style: '../styles/register.css',
        title:'Calendario escolar',
        script:'../scripts/register.js',
        type
    });
});

router.get('/livros', async function(req, res){
    const {userType} = await getUserByCookie(req);
    const type = userType
    console.log(type)
    sidebar = true
    res.render('index.twig', {
        template:"../views/books.twig",
        sidebar,
        style: '../styles/books.css',
        title:'Biblioteca escolar',
        script:'../scripts/books.js',
        type
    });
});
module.exports = router;