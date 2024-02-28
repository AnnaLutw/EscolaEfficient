const grades = [
    {
        id:'1',
        student:'Ana Luiza',
        math:34.8,
        science:1,
        pt:1,
        history:1,
        geo:1,
        art:1,
        ingl:1,
        fisics:1,
        status:1
    },
    {
        id:'2',
        student:'Marcelo hahaha',
        math:34.8,
        science:54,
        pt:76.3,
        history:23.7,
        geo:8,
        art:7,
        ingl:1,
        fisics:1,
        status:0
    }
]
const listAllGrades = ()=>{
    try{
        const ctx =   '#all_grades'  

        grades.forEach(grade =>{
            const model = $('#model_grades').clone()[0]
            $(model).find('#math').text(grade.math)
            $(model).find('#student').text(grade.student)
            $(model).find('#science').text(grade.science)
            $(model).find('#pt').text(grade.pt)
            $(model).find('#history').text(grade.history)
            $(model).find('#geo').text(grade.geo)
            $(model).find('#art').text(grade.art)
            $(model).find('#ingl').text(grade.ingl)
            $(model).find('#fisics').text(grade.fisics)
            $(model).find('#edit').attr('id', grade._id)
            $(model).find('#status').text('Aprovado').addClass('text-success')

            if(grade.status == 0){
                $(model).find('#status').text('Reprovado').removeClass('text-success').addClass('text-danger')
            }
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}
listAllGrades()
$(document).ready(() => {
    $('body').on('click', '#edit', () => {
        try {
            $('.modal_grades').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
    $('body').on('click', '#see_more', (e) => {
        const ctx = $(e.currentTarget).closest('.model');
        const model = ctx.find('#info_model');
        const icon = $(e.currentTarget).find('#icon_eye');
    
        model.toggleClass('d-none');
        icon.toggleClass('bi-eye-slash-fill bi-eye-fill');
    });
    
});
