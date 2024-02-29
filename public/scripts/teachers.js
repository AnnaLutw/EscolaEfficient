const teacherValues = ()=>{
    try{
        const ctx = '.modal_teacher'

        const name = $(ctx).find('#name').val()
        const cpf = $(ctx).find('#cpf').val()
        const email = $(ctx).find('#email').val()
        return {name,cpf,email}
    }catch(error){
        messagesHandler.messageError(error)
    } 
}

const save = async(id)=>{
    try{
        const method = id ? 'PUT': 'POST'
        const body = teacherValues()
        const {status, content} = id ? await request(method, `teacher/${id}`) : await request(method, `teacher`, body)
        console.log(status)
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content)
        list('teacher', listAllTeachers)
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const deleteTeacher = async(id)=>{
    try{
        const cfm = confirm('Deseja mudar o status?')
        if(!cfm){
            return
        }
        const {status, content} = await request('DELETE', `teacher/${id}`)
        console.log(status, content)
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content)
        list('teacher', listAllTeachers)
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const listAllTeachers = (content) => {
    try {
        if (content && Array.isArray(content)) {
            const ctx = '#all_teachers';
            $(ctx).empty()
            content.forEach(teacher => {
                const model = $('#model_teacher').clone()[0];

                $(model).find('#name').text(teacher.name);
                $(model).find('#cpf').text(teacher.cpf);
                $(model).find('#email').text(teacher.email);
                $(model).find('#delete').attr('val', teacher._id).text(teacher.status === 0 ? 'Ativar' : 'Desativar');
                $(model).find('#edit').attr('val', teacher._id);
                $(model).find('#status').text(teacher.status === 0 ? 'Desativado' : 'Ativado')
                    .removeClass(teacher.status === 0 ? 'text-success' : 'text-danger')
                    .addClass(teacher.status === 0 ? 'text-danger' : 'text-success');
                $(model).find('#classes').empty();
                teacher.turmas.forEach(classInfo => {
                    const classElement = $('<div>').text(classInfo.name);
                    $(model).find('#classes').append(classElement);
                });
                $(model).removeClass('d-none');
                $(ctx).append(model);
            });
        } else {
            messagesHandler.messageError(content)

        }
    } catch (error) {
        messagesHandler.messageError(error)

    }
};

list('teacher', listAllTeachers)

$(document).ready(() => {
    $('body').on('click', '#edit', () => {
        try {
            $('.modal_teacher').offcanvas('show'); 
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('body').on('click', '#add_teacher', () => {
        try {
            $('.modal_teacher').offcanvas('show'); 
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('body').on('click', '#delete', (e) => {
        try {
            console.log('aqui')
            deleteTeacher($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('.modal_teacher').on('click', '#save', async(e) => {
        try {
            console.log('aaa')
           
            await save($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
});
