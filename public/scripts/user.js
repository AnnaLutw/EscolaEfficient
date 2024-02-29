$(document).ready(() => {
    $('body').on('click', '#btn_file', () => {
        try {
            $('#picture').click()
        } catch (error) {
            console.log(error);
        }
    });
    var cropper;
    $('#picture').on('click', function(e){
        e.stopPropagation();
    
       // rest of the code goes here
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
    
});