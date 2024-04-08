const updateUser = async(id)=>{
    try{
        const picture = $('#view_picture').attr('src')

        const {content, status} = await request('PUT', `user`, {picture})

        if(status != 200){
            messagesHandler.messageError(content, true);
            return
        }
        messagesHandler.newMessage(content, true);
        list('user', listUser)


    }catch(error){
        messagesHandler.messageError(error);
    }
}

$(document).ready(() => {
    $('body').on('click', '#btn_file', () => {
        try {
            $('#picture').click()
        } catch (error) {
            messagesHandler.messageError(error);
        }
    });
    var cropper;
    $('#picture').on('click', function(e){
        e.stopPropagation();
    
    })
    $('#picture').on('change', function(event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            var reader = new FileReader();
            reader.onload = function(event) {
                $('#crop_modal').modal('show'); 
                $('#cropper_image').attr('src', event.target.result); 

                if (cropper) {
                    $('#cropper_image').cropper('destroy');
                }
    
                var image = $('#cropper_image');
                cropper = image.cropper({
                    aspectRatio: 1,
                    viewMode: 1,
                    cropBoxResizable: false 
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });

    $('#save_crop').on('click', function() {
       
        var croppedCanvas = $('#cropper_image').cropper('getCroppedCanvas', {
            width: 300,
            height: 300
        });

    
        $('#view_picture').attr('src', croppedCanvas.toDataURL());
        $('#view_picture').removeClass('d-none'); 
     
        $('#crop_modal').modal('hide');
        $('#cropper_image').cropper('destroy');
        cropper = null; 
    });
    
    $('#save').on('click', async(e)=> {
        try{
            const id = $(e.currentTarget).attr('id')
            await updateUser()
        }catch(error){
            messagesHandler.messageError(error);
        }
    });
});