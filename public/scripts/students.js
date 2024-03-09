const studentValues = ()=>{
    try{
        const ctx = '.modal_student'

        const name = $(ctx).find('#name').val()
        const cpf = $(ctx).find('#cpf').val()
        const contact = $(ctx).find('#contact').val()
        formatedCpf = maskOut(cpf)
        return {name,cpf:formatedCpf,contact}
    }catch(error){
        messagesHandler.messageError(error)
    } 
}

const save = async(id)=>{
    try{
        const method = id ? 'PUT': 'POST'
        const body = studentValues()
        const {status, content} = id ? await request(method, `student/${id}`, body) : await request(method, `student`, body)
        console.log(status)
        if(status != 200){
            messagesHandler.messageError(content)
            return
        }
         messagesHandler.newMessage(content)
        await list('student', listAllStudents)
         
        closeModal('.modal_student')
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const deleteStudent = async(id)=>{
    try{
        const cfm = confirm('Deseja alterar o status?')   
        if(!cfm){
            return
        }
        const {status, content} = await request('DELETE', `student/${id}`)
        console.log(status, content)
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content)
        await list('student', listAllStudents)
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const listSingleStudent = (content)=>{
    try{
        const ctx = '.modal_student'

        $(ctx).find('#name').val(content.name)
        $(ctx).find('#contact').val(content.contact)
        $(ctx).find('#cpf').val(content.cpf)
        $(ctx).find('#save').attr('val', content._id)

    }catch(error){
        messagesHandler.messageError(error)

    }
}
const listAllStudents = (content) => {
    try {
        if (content || Array.isArray(content)) {
            const ctx = '#all_students';
            $(ctx).empty()
            content.forEach(student => {
                console.log(student)

                const model = $('#model_student').clone()[0];

                $(model).find('#name').text(student.name);
                $(model).find('#team').text(student.turma ? student.turma : 'Sem turma');
                $(model).find('#cpf').text(formatCpf(student.cpf));
                $(model).find('#contact').text(formatCellphone(student.contact));
                $(model).find('#delete').attr('val', student._id).text(student.status === 0 ? 'Ativar' : 'Desativar');
                $(model).find('#edit').attr('val', student._id).toggleClass('d-none', student.status === 0);

                $(model).find('#status').text(student.status === 0 ? 'Desativado' : 'Ativado')
                    .removeClass(student.status === 0 ? 'text-success' : 'text-danger')
                    .addClass(student.status === 0 ? 'text-danger' : 'text-success');
                $(model).find('#classes').empty();
              
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

list('student', listAllStudents)

$(() => {

    $('.modal_student').find('#cpf').mask('000.000.000-00', {reverse: true});

    $('body').on('click', '#edit', (e) => {
        try {
            const id = $(e.currentTarget).attr('val')
            list(`student/${id}`, listSingleStudent)
            $('.modal_student').offcanvas('show'); 
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('body').on('click', '#add_student', () => {
        try {
            $('.modal_student').offcanvas('show'); 
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('body').on('click', '#delete', (e) => {
        try {
            console.log('aqui')
            deleteStudent($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
    $('.modal_student').on('click', '#save', async(e) => {
        try {
            await save($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
     $('.modal_student').on('click', '.btn-close', async(e) => {
        try {
            console.log('aaa')

            closeModal('.modal_student')

        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
});
