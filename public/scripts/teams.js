const AllStudents = []
const AllTeachers = []

const teamValues = ()=>{
    try{
        const ctx = '.modal_team'

        const name = $(ctx).find('#name').val()
        const students = AllStudents
        const teachers = AllTeachers

        return {name,cpf:formatedCpf,email}
    }catch(error){
        messagesHandler.messageError(error)
    } 
}
const addTeacherList = ()=>{
    try{
        AllTeachers.push($('#all_teachers_input').attr('id_value'))
    }catch(error){
        console.log(error);
    }
}
const addStudentList = ()=>{
    try{
        const id = $('#all_students_input').attr('id_value')
        const name = $('#all_students_input').text()
        AllStudents.push({id:id, name:name})
    }catch(error){
        console.log(error);
    }
}
const listTeachers = ()=>{
    try{
        AllTeachers.forEach(teacher =>{
            $('#chooses_teachers').text(teacher.name)

        })
    }catch(error){
        console.log(error);
    }
}
const listAllTeams = (content)=>{
    try{
        const ctx =   '#all_teams'  

        content.forEach(val =>{
            const model = $('#model_teams').clone()[0]
            $(model).find('#name').text(val.name)
            $(model).find('#teacher').text(val.teacher)
            $(model).find('#students_size').text(val.students_size)
            $(model).find('#delete').attr('id', val._id)
            $(model).find('#edit').attr('id', val._id)
            $(model).find('#status').text('Ativado').addClass('text-success')

            if(val.status == 0){
                $(model).find('#status').text('Desativado').removeClass('text-success').addClass('text-danger')
            }
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}

list('team', listAllTeams)
$(document).ready(() => {

    $('body').on('click', '#edit', () => {
        try {
            $('.modal_team').modal('show'); 
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });

    $('body').on('click', '#add_team', async () => {
        try {
            let content = await list('teacher', false);
            fillOptionsList(content, $('#all_teachers'), $('#all_teachers_input'));
             content = await list('student', false);
            fillOptionsList(content, $('#all_students'), $('#all_students_input'));
            $('.modal_team').modal('show'); 
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });

    $('.modal_team').on('click', '#add_teacher, #add_student', (e) => {
        try {

        const type = $(e.currentTarget).is('#add_teacher') ? $('#all_teachers').val() : $('#all_students').val();
        $(e.currentTarget).is('#add_teacher') ? AllTeachers.push(type) : AllStudents.push(type);

            
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
    $('.modal_team').on('click', '#add_teacher', () => {
        try {
            addTeacherList()
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
    $('.modal_team').on('click', '#add_student', () => {
        try {
            addStudentList()
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
});
