
const newsValues = ()=>{
    try{
        const ctx = '.modal_news'

        const title = $(ctx).find('#title').val()
        const description = $(ctx).find('#description').val()
        const picture = $(ctx).find('#picture').attr('src')
        return {title, description, picture}
    }catch(error){
        messagesHandler.messageError(error)
    } 
}
const save = async(id)=>{
    try{
        const method = id ? 'PUT': 'POST'
        const body = newsValues()
        const {status, content} = id ? await request(method, `news/${id}`, body) : await request(method, `news`, body)
        status !== 200 ? messagesHandler.messageError(content)  : messagesHandler.newMessage(content, true)
        closeModal('.modal_teacher')
        await list('teacher', listAllTeachers)
    }catch(error){
        messagesHandler.messageError(error)
    }
}

const listAllNews = (content)=>{
    try{
        const ctx =   '#all_news'  

        content.forEach(val =>{
            const model = $('#model_news').clone()[0]
            $(model).find('#img').attr('src',val.picture)
            $(model).find('#title').text(val.title)
            $(model).find('#text').text(val.description)
          
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        messagesHandler.messageError(error);
    }
}
const savePicture = (e) => {
    try {
        const imagemSelecionada = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;
            console.log(base64Image)
            $('#picture').attr('img' , base64Image);
        };
        
        reader.readAsDataURL(imagemSelecionada);
    } catch (error) {
        messagesHandler.messageError(error);
    }
};
list('news', listAllNews)
$(document).ready(() => {
   
    $('body').on('click', '#add_news', () => {
        try {
            $('.modal_news').offcanvas('show'); 
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });
    $('.modal_news').on('click', '#save', async(e) => {
        try {
            await save($(e.currentTarget).attr('val'))
        } catch (error) {
            messagesHandler.messageError(error)

        }
    });
   
    $('body').on('click', '#btn_file', () => {
        try {
            $('#foto').click();
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });
    $('#foto').on('click' ,(e) =>{
        console.log('add')

        e.stopPropagation();
    
    })
    $('#foto').on('change' ,(e)=>{
        console.log('abriuu')
        savePicture(e)
    })
    
});
