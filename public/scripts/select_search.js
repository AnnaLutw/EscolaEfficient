const listContent = (list, content) => {
    list.empty();
    content.forEach(item => {
        if(item.status != 0 ){
            console.log(item.name)
            console.log(item._id)
            const option = $('<option></option>');
            option.attr('id_value', item._id).text(item.name);
            list.append(option);
        }
        
    });
}

const fillOptionsList = (content, listContainer, input) => {
    try {
        const list = $(listContainer);
        
        listContent(list, content);

        input.on('keyup', function() {
            const searchText = $(this).val().toLowerCase(); 
            list.empty(); 

            content.forEach(option => {
                if (!searchText || option.name.toLowerCase().includes(searchText)) {
                    const item = $('<option>', {
                        class: 'option-item',
                        id_value: option._id,
                        text: option.name
                    });
                    list.append(item);
                }
            });
            
            if (list.children().length > 0) {
                list.removeClass('d-none').addClass('d-block');
            } else {
                list.removeClass('d-block').addClass('d-none');
            }
        });

        list.on('click', 'option', function() {
            input.val($(this).text()); 
            input.attr('id_value', $(this).attr('id_value')); 
            list.addClass('d-none'); 
        });

        input.on('click', function() {
            list.toggleClass('d-none');
        });
        $(document).on('click', function(event) {
            if (!$(event.target).closest(listContainer).length && !$(event.target).is(input)) {
                list.addClass('d-none');
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

