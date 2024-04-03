
const assigments = [
    {
        'Matemática': [],
        'Ciências': [],
        'Português': [],
        'História': [],
        'Geografia': [],
        'Artes': [],
        'Inglês': [],
        'Educação Física': []
    }
];

const addArray = (actived, name, points, team) => {
    try {
        switch (actived) {
            case 'matematica':
                assigments[0]['Matemática'].push({ name, points, team });
                break;
            case 'portugues':
                assigments[0]['Português'].push({ name, points, team });
                break;
            case 'ciencias':
                assigments[0]['Ciências'].push({ name, points, team });
                break;
            case 'historia':
                assigments[0]['História'].push({ name, points, team });
                break;
            case 'geografia':
                assigments[0]['Geografia'].push({ name, points, team });
                break;
            case 'artes':
                assigments[0]['Artes'].push({ name, points, team });
                break;
            case 'educacaof':
                assigments[0]['Educação Física'].push({ name, points, team });
                break;
            case 'ingles':
                assigments[0]['Inglês'].push({ name, points, team });
                break;
            default:
                throw new Error('Disciplina não encontrada.');
        }
        listAllActivities();
    } catch (error) {
        messagesHandler.messageError(error);
    }
};


const getValuesActivity = () => {
    try {
        const actived = $('.tab-content').find('.tab-pane.fade.show.active');
        const name = $(actived).find('#name').val();
        const points = $(actived).find('#points').val();
        const team = $('.modal_grades ').find('#all_teams_input').attr('id_value');
        console.log(team)
        addArray($(actived).attr('id'), name, points, team);
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const listAllActivities = () => {
    try {
        const activitiesContainer = $('#all_activitys');
        activitiesContainer.empty();

        Object.keys(assigments[0]).forEach(tabName => {
            const tabContainer = findTabByNames(tabName); 
            const assignments = assigments[0][tabName]; 
            if (assignments.length > 0) {
                assignments.forEach(activity => {
                    const model = $('#model_activity').clone();
                    model.find('#name').text(activity.name);
                    model.find('#point').text(activity.points);
                    model.removeClass('d-none');
                    model.appendTo(tabContainer.find('#all_activitys')); 
                });
            } 
        });
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const findTabByNames = (name) => {
    try {
        switch (name) {
            case 'Matemática':
                return $('#matematica');
            case 'Português':
                return $('#portugues');
            case 'Ciencias':
                return $('#ciencias');
            case 'História':
                return $('#historia');
            case 'Geografia':
                return $('#geografia');
            case 'Artes':
                return $('#artes');
            case 'Educação Física':
                return $('#ingles');
            case 'Ingles':
                    return $('#educacaof');
            default:
                return null;
        }
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const listSingleGrade = (content) => {
    try {
        $('.modal_grades').find('#save').attr('val', content._id);
        $('.modal_grades').find('#name_student').text(content.student.name)
        const ctx = '#all_inputs'
        content.disciplines.forEach(discipline => {
            const subjectContainer = findTabByNames(discipline.discipline.name); 
            if (subjectContainer) { 
                const activitiesContainer = subjectContainer.find('#all_activitys');
                activitiesContainer.empty(); 

                const activityModel = subjectContainer.find('#model_activity').clone();
                if (discipline.discipline.atividades) {
                    discipline.discipline.atividades.forEach(activity => {
                        console.log(activity)
                        const model = activityModel.clone();
                        const modelInput = $('#model_input').clone();
                        model.find('#name').text(activity.atividade.name);
                        model.find('#point').text(activity.atividade.point);
                        model.removeClass('d-none');
                        modelInput.removeClass('d-none');
                        model.appendTo(activitiesContainer);
                        modelInput.appendTo(ctx);
                    });
                } else {
                    console.log('Erro: Nenhuma atividade encontrada para a disciplina:', discipline.name);
                }
            } else {
                console.log('Erro: Não foi possível encontrar a guia para a disciplina:', discipline.name);
            }
        });
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const listAllGrades = (content) => {
    try {
        const ctx = '#all_grades';
        content.forEach(grade => {
            const model = $('#model_grades').clone()[0];
            $(model).find('#student').text(grade.student.name);
            $(model).find('#add_grade').attr('val',grade._id);
            $(model).find('#status').text('Aprovado').addClass('text-success');
            grade.disciplines.forEach(discipline => {
                const subject = discipline.discipline.name;
                const totalPoints = discipline.total;
                displaySubjectPoints(model, subject, totalPoints);
            });

            $(model).removeClass('d-none');
            $(ctx).append(model);
        });
    } catch (error) {
        messagesHandler.messageError(error);
    }
};
const displaySubjectPoints = (model, subject, totalPoints) => {
    const tab = findTab(subject);
    $(model).find(tab).text(totalPoints);
};

const findTab = (name) => {
    try {
        switch (name) {
            case 'Matemática':
                return '#mathm';
            case 'Português':
                return '#port';
            case 'Ciências':
                return '#cienc';
            case 'História':
                return '#his';
            case 'Geografia':
                return '#geog';
            case 'Artes':
                return '#arts';
            case 'Educação Física':
                return '#ef';
            case 'Inglês':
                return '#ingl';
            default:
                return '';
        }
    } catch (error) {
        messagesHandler.messageError(error);
    }
};


const addActivity = async (id) => {
    try {
        const { content, status } = request('POST', `grade/activity`, assigments);
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content);
    } catch (error) {
        messagesHandler.messageError(error);
    }
};



list('grade', listAllGrades)
$(document).ready(() => {

    $('body').on('click', '#adc_activitys', async() => {
        try {
            let content = await list('team', false);
            fillOptionsList(content, $('#all_teams'), $('#all_teams_input'));

            $('.modal_grades').modal('show');
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });

    $('body').on('click', '#add_grade', async(e) => {
        try {
            const id = $(e.currentTarget).attr('val');
            list(`grade/${id}`, listSingleGrade);

          $('.modal_grades').find('#create').addClass('d-none')
          $('.modal_grades').find('#section_turma').addClass('d-none')
          $('.modal_grades').find('#nota').removeClass('d-none')
          $('.modal_grades').find('#student_name').removeClass('d-none')
            $('.modal_grades').modal('show');
            $('.modal_grades').attr('id_aluno', id);
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });

    $('body').on('click', '#see_more', (e) => {
        const ctx = $(e.currentTarget).closest('.model');
        const model = ctx.find('#info_model');
        const icon = $(e.currentTarget).find('#icon_eye');
        model.toggleClass('d-none');
        icon.toggleClass('bi-eye-slash-fill bi-eye-fill');
    });

    $('.modal_grades').on('click', '#save', (e) => {
        try {
            const id = $(e.currentTarget).attr('val')
            addActivity(id);
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
    $('.modal_grades').on('click', '#close', (e) => {
        try {

            $('.modal_grades').find('#create').removeClass('d-none')
            $('.modal_grades').find('#nota').addClass('d-none')
          $('.modal_grades').find('#section_turma').removeClass('d-none')
          $('.modal_grades').find('#student_name').addClass('d-none')

        } catch (error) {
            messagesHandler.messageError(error)
        }
    });

    $('.modal_grades').on('click', '#new_activity', () => {
        try {
            getValuesActivity();
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
  
});