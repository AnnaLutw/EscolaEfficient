
const assigments = [
    {
        Matematica:[

        ],
        Ciencias:[

        ],
        Portugues:[

        ],
        Historia:[

        ],
        Geografia:[

        ],
        Artes:[

        ],
        Ingles:[

        ],
        Educação:[

        ]
    }
];
const addArray = (actived, name, points) => {
    try {
        switch (actived) {
            case 'mathm':
                assigments[0].Matematica.push({ name, points });
                break;
            case 'port':
                assigments[0].Portugues.push({ name, points });
                break;
            case 'cienc':
                assigments[0].Ciencias.push({ name, points });
                break;
            case 'his':
                assigments[0].Historia.push({ name, points });
                break;
            case 'geog':
                assigments[0].Geografia.push({ name, points });
                break;
            case 'arts':
                assigments[0].Artes.push({ name, points });
                break;
            case 'ef':
                assigments[0].Educação.push({ name, points });
                break;
        }

        listAllActivities(actived);
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const getValuesActivity = () => {
    try {
        const actived = $('.tab-content').find('.tab-pane.fade.show.active');
        const name = $(actived).find('#name').val();
        const points = $(actived).find('#points').val();
        addArray($(actived).attr('id'), name, points);
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const listAllActivities = (actived) => {
    try {

        const tabName = findTabByNames(actived);
        const subjectContainer = $(`#${actived}`);
        const activitiesContainer = subjectContainer.find('#all_activitys');
        activitiesContainer.empty();
        const assignments = assigments[0][tabName];
        if (assignments.length > 0) {
            assignments.forEach(activity => {
                console.log(activity.name)
                const model = $('#model_activity').clone();
                model.find('#name').text(activity.name);
                model.find('#point').text(activity.points);
                model.removeClass('d-none');
                model.appendTo(activitiesContainer);
            });
        } else {
            console.log('Nenhuma atividade encontrada.');
        }
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const findTabByNames = (name) => {
    try {
        switch (name) {
            case 'mathm':
                return 'Matematica';
            case 'port':
                return 'Portugues';
            case 'cienc':
                return 'Ciencias';
            case 'his':
                return 'Historia';
            case 'geog':
                return 'Geografia';
            case 'arts':
                return 'Artes';
            case 'ef':
                return 'Educação Física';   
        }
    } catch (error) {
        messagesHandler.messageError(error);
    }
};


const findTab = (name) => {
    try {
        switch (name) {
            case 'Matematica':
                return $('#mathm');
            case 'Portugues':
                return $('#port');
            case 'Ciencias':
                return $('#cienc');
            case 'Historia':
                return $('#his');
            case 'Geografia':
                return $('#geog');
            case 'Artes':
                return $('#arts');
            case 'Educação Física':
                return $('#ef');
           
        }
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const listSingleGrade = (content) => {
    try {
        content.grades.forEach(grade => {
            const subjectContainer = findTab(grade.disciplina); 
            if (subjectContainer) { 
                const activitiesContainer = $(subjectContainer).find('#all_activitys');
                const activityModel = subjectContainer.find('#model_activity').clone();
                if (grade.atividades) {
                    grade.atividades.forEach(activity => {
                        const model = activityModel.clone();
                        model.find('#name').text(activity.nome);
                        model.find('#point').text(activity.point);
                        model.removeClass('d-none');
                        model.appendTo(activitiesContainer);
                    });
                }

               
            } else {
                console.log('Erro: Não foi possível encontrar a guia para a matéria:', grade.materia);
            }
        });
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const listAllGrades = (content) => {
    try {
        const ctx = '#all_grades';

        content.forEach(student => {
            const model = $('#model_grades').clone()[0];
            $(model).find('#student').text(student.name);

            let totalPointsAllSubjects = 0;
            const userId = student._id
            student.grades.forEach(grade => {
                $(model).find('#student').text(grade.student);
                $(model).find('#status').text('Aprovado').addClass('text-success');
                $(model).find('#add_grade').attr('val', userId);

                if (grade.status === 0) {
                    $(model).find('#status').text('Reprovado').removeClass('text-success').addClass('text-danger');
                }
                let totalPoints = 0;
                
                if (grade.total != 0) {
                    totalPoints = calculateTotalPoints(grade.activity.point);
                    totalPointsAllSubjects += totalPoints;
                } else {
                    totalPoints = grade.total;
                }
                displaySubjectPoints(model, grade.disciplina, totalPoints);
            });

            $(model).find('#total_points').text(totalPointsAllSubjects);
            $(model).removeClass('d-none');
            $(ctx).append(model);
        });
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const addActivity = async () => {
    try {
        const id = $('.modal_grades').find('#all_teams_input').attr('id_value');
        const { content, status } = request('POST', `activity/${id}`, assigments);
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content);
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const calculateTotalPoints = (activities) => {
    return activities.reduce((total, activity) => total + activity.point, 0);
};
const displaySubjectPoints = (model, subject, totalPoints) => {
    $(model).find(`#${subject}`).text(totalPoints);
};


list('grade', listAllGrades)
$(document).ready(() => {

    $('body').on('click', '#edit', () => {
        try {
            $('.modal_grades').modal('show');
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });

    $('body').on('click', '#add_grade', (e) => {
        try {
            const id = $(e.currentTarget).attr('val');
            list(`grade/student/${id}`, listSingleGrade);
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

    $('.modal_grades').on('click', '#save', () => {
        try {
            addActivity();
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
    $('body').on('click', '#add_activity', async() => {
        try {
            let content = await list('team', false);
            fillOptionsList(content, $('#all_teams'), $('#all_teams_input'));
            $('.modal_grades').modal('show');
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
});