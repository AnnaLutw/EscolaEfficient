

const logar = async()=>{
    try{
        const body = userValues()
        console.log(body)

        const {status, content} =  await request('POST', `auth`, body) 
        if(status !== 200){
            messagesHandler.messageError(content, true)
            return
        }
        messagesHandler.newMessage(content, true)
        window.location.href = '/novidades'
        closeModal('.modal_teacher')
        await list('teacher', listAllTeachers)
    }catch(error){
        messagesHandler.messageError(error)
    }
}
const userValues = ()=>{
    try{
        const teste = $('#cpf').val()
        const password = $('#password').val()
        const cpf =  maskOut(teste)

        return {cpf, password}
    }catch(error){
        messagesHandler.messageError(error)
    } 
}
$(() => {

    $('body').on('click', '#login', async() => {
        try {
            await logar()
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });

})