let AllStudents = [];
let SingleTeacher = {};

const teamValues = () => {
    try {
        const ctx = '.modal_team';
        const name = $(ctx).find('#name').val();
        const newStudents = AllStudents.filter(student => !student.existing).map(student => student._id);
        const teacher = SingleTeacher;
        return { name, students: newStudents, teacher }; 
    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const save = async(id)=>{
    try{
        const method = id ? 'PUT': 'POST'
        const body = teamValues()
        const {status, content} = id ? await request(method, `team/${id}`, body) : await request(method, `team`, body)
        console.log(status)
        if(status !== 200 ){
            messagesHandler.messageError(content, true)
            return
        } 
        messagesHandler.newMessage(content)
        closeModal('.modal_team')
        await list('team', listAllTeams)
    }catch(error){
        messagesHandler.messageError(error)
    }
}

const addTeacher = () => {
    try {
        const id = $('#all_teachers_input').attr('id_value');
        const name = $('#all_teachers_input').val();

        SingleTeacher = id;

        const model = $('#model_teacher').removeClass('d-none');
        $(model).find('#name_teacher').text(name);
    } catch (error) {
        console.log(error);
    }
};

const addStudentList = () => {
    try {
        const id = $('#all_students_input').attr('id_value');
        const name = $('#all_students_input').val(); 

        const existingStudent = AllStudents.find(student => student._id === id);
        if (existingStudent) {
            console.log("Este estudante já foi adicionado.");
            return;
        }

        AllStudents.push({ _id: id, name: name, existing: false }); 
        listNames('#choosed_students', '#model_student', '#name_student'); 
    } catch (error) {
        console.log(error);
    }
};



const listNames = (ctx, model, nameDiv) => {
    try {
        $(ctx).empty();
        AllStudents.forEach(val => {
            const modelCloned = $(model).clone();
            $(modelCloned).find(nameDiv).text(val.name);
            $(modelCloned).find('#delete_student').attr('val', val._id);
            $(modelCloned).removeClass('d-none');
            $(ctx).append(modelCloned);
        });
    } catch (error) {
        console.log(error);
    }
};


const listAllTeams = (content)=>{
    try{
        const ctx =   '#all_teams'  
        $(ctx).empty()
        content.forEach(val =>{
            const model = $('#model_teams').clone()[0]
            $(model).find('#name').text(val.name)
            $(model).find('#teacher').text(val.teacher.name)
            $(model).find('#students_size').text(val.students.length)
            $(model).find('#delete').attr('val', val._id).text('Desativar')
            $(model).find('#edit').attr('val', val._id)
            $(model).find('#status').text('Ativado').removeClass('text-danger').addClass('text-success')

            if(val.status == 0){
                $(model).find('#status').text('Desativado').removeClass('text-success').addClass('text-danger')
            $(model).find('#delete').attr('val', val._id).text('Ativar')

            }
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}
const listSingleTeam = (content) => {
    try {
        const ctx = '.modal_team';
        $(ctx).find('#name').val(content.name);
        
        AllStudents = content.students.map(student => ({ _id: student._id, name: student.name, existing: true }));
        
        SingleTeacher =  content.teacher._id;
        
        listNames('#choosed_students', '#model_student', '#name_student');
        $(ctx).find('#model_teacher').removeClass('d-none');
        $(ctx).find('#name_teacher').text(content.teacher.name);
        $(ctx).find('#save').attr('val', content._id);

    } catch (error) {
        messagesHandler.messageError(error);
    }
};

const deleteTeam = async(id)=>{
    try{
        const cfm = confirm('Deseja mudar o status?')   
        if(!cfm){
            return
        }
        const {status, content} = await request('DELETE', `team/${id}`)
        console.log(status, content)
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content)
        await list('team', listAllTeams)
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const deleteStudent = async (id, teamId) => {
    try {
        const student = AllStudents.find(student => student._id === id);
        if (student) {
            if (student.existing) {
                const { status, content } = await request('DELETE', `team/student/${id}`);
                if (status === 200) {
                    messagesHandler.newMessage(content);
                    AllStudents = AllStudents.filter(student => student._id !== id);
                } else {
                    messagesHandler.messageError(content);
                }
            }
            AllStudents = AllStudents.filter(student => student._id !== id);
            const teamId = $('.modal_team').attr('val')
            await list(`team/${teamId}`, listSingleTeam)
        }
    } catch (error) {
        messagesHandler.messageError(error);
    }
};


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

            $(e.currentTarget).is('#add_teacher') ? addTeacher() : addStudentList()
            
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
    $('.modal_team').on('click', '#delete', (e) => {
        try {

            const id = $(e.currentTarget).attr('id_value')
            console.log(id)
            
        } catch (error) {
            messagesHandler.messageError(error)
        }
    });
    $('.modal_team').on('click', '#save', async(e) => {
        try {
            await save($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('.modal_team').on('click', '#delete_student', async(e) => {
        try {
            await deleteStudent($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('body').on('click', '#edit',async (e) => {
        try {
            let content = await list('teacher', false);
            fillOptionsList(content, $('#all_teachers'), $('#all_teachers_input'));
             content = await list('student', false);
            fillOptionsList(content, $('#all_students'), $('#all_students_input'));

            const id = $(e.currentTarget).attr('val')
            await list(`team/${id}`, listSingleTeam)
            $('.modal_team').attr('val' ,id )
            $('.modal_team').offcanvas('show'); 
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('body').on('click', '#delete', (e) => {
        try {
            deleteTeam($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
});
