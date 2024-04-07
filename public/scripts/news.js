
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
        console.log(error);
    }
}
list('news', listAllNews)
$(document).ready(() => {
   
    $('body').on('click', '#add_news', () => {
        try {
            $('.modal_news').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
});
