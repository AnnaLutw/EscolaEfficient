const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/render/render.js');
const cookieParser = require('cookie-parser'); 
const app = express();

mongoose.connect('mongodb+srv://annalutw:%40Nyb220377@escolaefficient.60aw2nk.mongodb.net/?retryWrites=true&w=majority&appName=EscolaEfficient')
.then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
.catch(err => console.error('Erro ao conectar ao banco de dados:', err));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.set('views', path.join(__dirname, 'public', 'template'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use('/', routes);
app.use(cookieParser());
app.use('/api', (req, res, next) => {
    const teacherController = require('./src/teacher/teacher.controller.js');
    const studentController = require('./src/student/student.controller.js');
    const teamsController = require('./src/team/team.controller.js');
    const gradeController = require('./src/grade/grade.controller.js');
    const calendarController = require('./src/calendar/calendar.controller.js');
    const UserController = require('./src/user/user.controller.js');
    const NewsController = require('./src/news/news.controller.js');
    app.use('/api', teacherController);
    app.use('/api', studentController);
    app.use('/api', teamsController);
    app.use('/api', gradeController);
    app.use('/api', calendarController);
    app.use('/api', UserController);
    app.use('/api', NewsController);
    next();
});

app.set("twig options", {
    allowAsync: true,
    strict_variables: false
});

const server = app.listen(9999, () => {
    console.log('Servidor Node.js iniciado. Escutando na porta 9999...');
});

server.on('error', err => {
    console.error('Erro ao iniciar o servidor:', err.message);
});

module.exports = { app };
