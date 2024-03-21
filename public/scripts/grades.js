const grades = [
    {
        id:'1',
        student:'Ana Luiza',
        math:34.8,
        science:1,
        pt:1,
        history:1,
        geo:1,
        art:1,
        ingl:1,
        status:1
    },
    {
        id:'2',
        student:'Marcelo hahaha',
        math:34.8,
        science:54,
        pt:76.3,
        history:23.7,
        geo:8,
        art:7,
        ingl:1,
        status:0
    }
]
const gradesPoints = [
    {
        id: '1',
        student: 'Ana Luiza',
        assigments: [
            {
                mathm: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
                cienc: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
                port: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
                his: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
                geog: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
                arts: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
                ing: [
                    {
                        id: '1',
                        activity: 'Atividade 1',
                        point: '5'
                    },
                    {
                        id: '2',
                        activity: 'Atividade 3',
                        point: '5'
                    }
                ],
            }
        ]
    }
];
// const listSingleGrade = () => {
//     try {
//         gradesPoints.forEach(student => {
//             Object.keys(student.assigments[0]).forEach(subject => {
//                 student.assigments[0][subject].forEach(activity => {
//                     console.log(activity)
//                     const model = $('#' + subject).closest('#model_activity').clone();
//                     $(model).find('#name').text(activity.activity);
//                     $(model).find('#point').text(activity.point);
//                     $(model).removeClass('d-none');
//                     $(model).appendTo($('#' + subject).closest('#all_activitys'));
//                 });
//             });
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
const listSingleGrade = () => {
    try {
        const ctx = $('#all_activitys_math');
        $(ctx).empty();

        gradesPoints[0].assigments[0].mathm.forEach(activity => {
            console.log(activity);
            const model = $('#model_activity_math').clone();
            $(model).find('#name_math').text(activity.activity);
            $(model).find('#point_math').text(activity.point);
            $(model).removeClass('d-none');
            $(ctx).append(model);
        });
    } catch (error) {
        console.log(error);
    }
};



const listAllGrades = (content)=>{
    try{
        const ctx =   '#all_grades'  

        grades.forEach(grade =>{
            const model = $('#model_grades').clone()[0]
            $(model).find('#math').text(grade.math)
            $(model).find('#student').text(grade.student)
            $(model).find('#science').text(grade.science)
            $(model).find('#pt').text(grade.pt)
            $(model).find('#history').text(grade.history)
            $(model).find('#geo').text(grade.geo)
            $(model).find('#art').text(grade.art)
            $(model).find('#ingl').text(grade.ingl)
            $(model).find('#add_grade').attr('value', grade._id)
            $(model).find('#status').text('Aprovado').addClass('text-success')

            if(grade.status == 0){
                $(model).find('#status').text('Reprovado').removeClass('text-success').addClass('text-danger')
            }
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}
const init=async() =>{
    try{
        let content = await list('team', false);
        fillOptionsList(content, $('#all_teams'), $('#all_teams_input'));
        content = await list('student', false);
        fillOptionsList(content, $('#all_students'), $('#all_students_input'));
    }catch(error){
        console.log(error);
    }
}
list('grade', listAllGrades)
$(document).ready(() => {
    init()
  

    $('body').on('click', '#edit', () => {
        try {
            $('.modal_grades').modal('show'); 
        } catch (error) {
            console.log(error);
        }
    });
    $('body').on('click', '#add_grade', (e) => {
        try {
            listSingleGrade()
            $('.modal_grades').modal('show'); 

        } catch (error) {
            console.log(error);
        }
    });
    $('body').on('click', '#see_more', (e) => {
        const ctx = $(e.currentTarget).closest('.model');
        const model = ctx.find('#info_model');
        const icon = $(e.currentTarget).find('#icon_eye');
    
        model.toggleClass('d-none');
        icon.toggleClass('bi-eye-slash-fill bi-eye-fill');
    });
    
});
