const teachers = [
    {
        id:'1',
        name:'Ana Luiza',
        cpf:'70435190636',
        email:'correioaninha@gmail.com',
        status:1,
        classes:[
            {
                id:"1",
                name:'4° ano, sala B',
            },
            {
                id:"2",
                name:'5° ano, sala A',
            }
        ]
    },
    {
        id:'2',
        name:'Marcos',
        cpf:'4235655433',
        email:'marcos@gmail.com',
        status:0,
        classes:[
            {
                id:"3",
                name:'5° ano, sala B',
            },
            {
                id:"4",
                name:'6° ano, sala d',
            }
        ]
    }
]
const listAllTeachers = ()=>{
    try{
        const ctx =   '#all_teachers'  

        teachers.forEach(teacher =>{
            const model = $('#model_teacher').clone()[0]

            $(model).find('#name').text(teacher.name)
            $(model).find('#cpf').text(teacher.cpf)
            $(model).find('#email').text(teacher.email)
            $(model).find('#delete').attr('id', teacher._id)
            $(model).find('#edit').attr('id', teacher._id)
            $(model).find('#status').text('Ativado').addClass('text-success')

            if(teacher.status == 0){
                $(model).find('#status').text('Desativado').removeClass('text-success').addClass('text-danger')
            }
            $(model).find('#classes').empty();

            // Itera sobre as classes do professor e adiciona ao modelo
            teacher.classes.forEach(classInfo => {
                const classElement = $('<div>').text(classInfo.name);
                $(model).find('#classes').append(classElement);
            });

            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}
listAllTeachers()
$(document).ready(() => {
    $('body').on('click', '#edit', () => {
        try {
            $('.modal_teacher').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
    $('body').on('click', '#add_teacher', () => {
        try {
            $('.modal_teacher').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
});
