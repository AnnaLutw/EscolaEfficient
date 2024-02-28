const news = [
    {
        id:'1',
        title:'Festa Junina na Escola: Uma Celebração de Tradição, Alegria e União!',
        img:'https://img.imageboss.me/revista-cdn/cdn/20307/027086c0f43c9fb29ea017077ce8ea73be61223c.jpg?1561400337',
        text:'Caros alunos, pais e membros da comunidade escolar, É com grande entusiasmo que anunciamos a chegada de uma das festas mais aguardadas do ano: a Festa Junina da nossa querida escola! É hora de celebrar nossas tradições, compartilhar momentos de alegria e fortalecer ainda mais os laços de união que nos tornam uma comunidade escolar única. Este ano, preparamos uma festa repleta de atividades emocionantes, barracas de comidas típicas deliciosas, jogos divertidos e apresentações culturais que irão encantar a todos. Desde a quadrilha até o correio elegante, cada detalhe foi pensado com carinho para garantir que todos tenham uma experiência inesquecível',
       
    },
    {
        id:'2',
        title:'Festa Junina na Escola: Uma Celebração de Tradição, Alegria e União!',
        img:'https://img.imageboss.me/revista-cdn/cdn/20307/027086c0f43c9fb29ea017077ce8ea73be61223c.jpg?1561400337',
        text:'Ana Luiza',
    }
]
const listAllNews = ()=>{
    try{
        const ctx =   '#all_news'  

        news.forEach(val =>{
            const model = $('#model_news').clone()[0]
            $(model).find('#img').attr('src',val.img)
            $(model).find('#title').text(val.title)
            $(model).find('#text').text(val.text)
          
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}
listAllNews()
$(document).ready(() => {
   
    $('body').on('click', '#add_news', () => {
        try {
            $('.modal_news').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
});
