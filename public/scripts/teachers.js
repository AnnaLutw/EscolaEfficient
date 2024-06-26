const teacherValues = ()=>{
    try{
        const ctx = '.modal_teacher'

        const name = $(ctx).find('#name').val()
        const cpf = $(ctx).find('#cpf').val()
        const email = $(ctx).find('#email').val()
        const password = $(ctx).find('#password').val()
        formatedCpf = maskOut(cpf)
        return {name,cpf:formatedCpf,email , password}
    }catch(error){
        messagesHandler.messageError(error)
    } 
}

const save = async(id)=>{
    try{
        const method = id ? 'PUT': 'POST'
        const body = teacherValues()
        const {status, content} = id ? await request(method, `teacher/${id}`, body) : await request(method, `teacher`, body)
        status !== 200 ? messagesHandler.messageError(content)  : messagesHandler.newMessage(content, true)
        closeModal('.modal_teacher')
        await list('teacher', listAllTeachers)
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
        await list('teacher', listAllTeachers)
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const listSingleTeacher = (content)=>{
    try{
        const ctx = '.modal_teacher'

        $(ctx).find('#name').val(content.name)
        $(ctx).find('#email').val(content.email)
        $(ctx).find('#cpf').val(content.cpf)
        $(ctx).find('#save').attr('val', content._id)

    }catch(error){
        messagesHandler.messageError(error)

    }
}
const listAllTeachers = (content) => {
    try {
        if (content || Array.isArray(content)) {
            console.log(content)

            const ctx = '#all_teachers';
            $(ctx).empty()
            content.forEach(teacher => {
                const model = $('#model_teacher').clone()[0];
                console.log(teacher)
                $(model).find('#name').text(teacher.name);
                $(model).find('#cpf').text(formatCpf(teacher.cpf));
                $(model).find('#email').text(teacher.email);
                $(model).find('#delete').attr('val', teacher._id).text(teacher.status === 0 ? 'Ativar' : 'Desativar');
                $(model).find('#edit').attr('val', teacher._id).toggleClass('d-none', teacher.status === 0);


                $(model).find('#status').text(teacher.status === 0 ? 'Desativado' : 'Ativado')
                    .removeClass(teacher.status === 0 ? 'text-success' : 'text-danger')
                    .addClass(teacher.status === 0 ? 'text-danger' : 'text-success');
                $(model).find('#classes').empty();
                if(teacher.turmas){
                    teacher.turmas.forEach(turma => {
                        const classElement = $('<div>').text(turma);
                        $(model).find('#classes').append(classElement);
                    });
                }else{
                    $(model).find('#classes').text('Sem turmas');
                }
                
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

 $(() => {

    $('.modal_teacher').find('#cpf').mask('000.000.000-00', {reverse: true});

    $('body').on('click', '#edit', (e) => {
        try {
            const id = $(e.currentTarget).attr('val')
            list(`teacher/${id}`, listSingleTeacher)
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
            await save($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
     $('.modal_teacher').on('click', '.btn-close', async(e) => {
        try {
            console.log('aaa')

            closeModal('.modal_teacher')

        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
});
