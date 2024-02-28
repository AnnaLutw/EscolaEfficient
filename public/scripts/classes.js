const classes = [
    {
        id:'1',
        name:'5° ano, sala B',
        teacher:'Ana Luiza',
        students_size:'30',
        status:1,
    },
    {
        id:'2',
        name:'6° ano, sala C',
        teacher:'Ana Luiza',
        students_size:'30',
        status:0,
    }
]
const listAllClasss = ()=>{
    try{
        const ctx =   '#all_classes'  

        classes.forEach(val =>{
            const model = $('#model_class').clone()[0]
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
listAllClasss()
$(document).ready(() => {
    $('body').on('click', '#edit', () => {
        try {
            $('.modal_class').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
    $('body').on('click', '#add_class', () => {
        try {
            $('.modal_class').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
});
