const students = [
    {
        id:'1',
        name:'Ana Luiza',
        cpf:'70435190636',
        status:1,
        class:'5° ano, sala B'
    },
    {
        id:'2',
        name:'Marcos',
        cpf:'4235655433',
        status:0,
        class:'6° ano, sala c'
    }
]
const listAllStudents = ()=>{
    try{
        const ctx =   '#all_students'  

        students.forEach(student =>{
            const model = $('#model_student').clone()[0]
            $(model).find('#name').text(student.name)
            $(model).find('#cpf').text(student.cpf)
            $(model).find('#delete').attr('id', student._id)
            $(model).find('#edit').attr('id', student._id)
            $(model).find('#status').text('Ativado').addClass('text-success')

            if(student.status == 0){
                $(model).find('#status').text('Desativado').removeClass('text-success').addClass('text-danger')
            }
            $(model).find('#class').text(student.class)
            $(model).removeClass('d-none')
            $(ctx).append(model)
        });
    }catch(error){
        console.log(error);
    }
}
listAllStudents()
$(document).ready(() => {
    $('body').on('click', '#edit', () => {
        try {
            $('.modal_student').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
    $('body').on('click', '#add_student', () => {
        try {
            $('.modal_student').offcanvas('show'); 
        } catch (error) {
            console.log(error);
        }
    });
});
