const request = async (method, route, body) => {
    try {
        let response;

        if (method === 'GET' || method === 'HEAD') {
            response = await fetch('api/' + route, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            response = await fetch('api/' + route, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        }

        if (!response.ok) {
            throw new Error('Erro ao realizar a requisição.');
        }

        const responseData = await response.json();
        const { content, status } = responseData;

        if (status !== 200) {
            messagesHandler.messageError(content)
        }

        return { content, status };
    } catch (error) {
        throw new Error('Erro ao processar a requisição: ' + error.message);
    }
};


const list = async (route, callback) => {
    try {
        const response = await request('GET', route, null);
        if (typeof callback !== 'function') 
        {
            return response.status != 200 ? messagesHandler.messageError() : response.content; 

        }
        return response.status != 200 ? messagesHandler.messageError() : callback(response.content); 

    } catch (error) {
        throw messagesHandler.messageError(error);
    }
};

const constructor = (body, ctx) => {
    const result = {};

    for (const field in body) {
        const inputId = body[field].id;
        const inputValue = document.querySelector(`${ctx} ${inputId}`).value;
        result[field] = inputValue;
    }

    return result;
};
const maskOut = (val)=>{
    try{
        return val.replace(/\D/g, '');;
    }catch(error){
        throw (messagesHandler.messageError(error));
    }
}
const closeModal = (ctx)=>{
    try{
        $(ctx).modal('hide')
        $(ctx).offcanvas('hide')
        $(ctx).find('#save').deleteAttr('val')
        $(ctx).find('input').val('');
    }catch(error){
        throw (messagesHandler.messageError(error));
    
    }
}
const listUser = (content)=>{
    try{
        const ctx = '.user_section'
        $('#user_name').text(content.name).attr('val' , content._id)
        $(ctx).find('#email').val(content.email)
        $(ctx).find('#save').attr('val' , content._id)
        $(ctx).find('#view_picture').attr('src' , content.picture)
        $('.header').find('#view_picture').attr('src' , content.picture)
    }catch(error){
        throw (messagesHandler.messageError(error));
    }
}

const formatCpf = (val) => {
    try {
        const cleanedCpf = val.replace(/\D/g, '');
        return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');;
    } catch (error) {
        throw error;
    }
};

const formatCellphone = (val) => {
    try {
        const cleanedNumber = val.replace(/\D/g, '');

        if (cleanedNumber.length === 11) {
            const formattedNumber = cleanedNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) 9$2-$3');
            return formattedNumber;
        } else {
            return val;
        }
    } catch (error) {
        throw error;
    }
};

const showSpinner = (ctx , e = false) => {
    try {
        if(e){
            $(e.currentTarget).find(ctx).addClass('d-none')
            $(e.currentTarget).find(ctx).next('#spinner').removeClass('d-none')
            return
        }
       $(ctx).addClass('d-none')
        $(ctx).next('#spinner').removeClass('d-none')
    } catch (error) {
        throw error;
    }
};
const hideSpinner = (ctx , e = false) => {
    try {
        $(ctx).removeClass('d-none')
        $(ctx).next('#spinner').addClass('d-none')
    } catch (error) {
        throw error;
    }
};

const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
const getMessageTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diff = now - messageTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 2) {
        return messageTime.toLocaleDateString();
    } else if (days === 1) {
        return 'Ontem ' + messageTime.toLocaleTimeString();
    } else if (hours > 0) {
        return `há ${hours} horas, ${minutes % 60} minutos`;
    } else if (minutes > 0) {
        return `há ${minutes} minutos`;
    } else {
        return 'Agora';
    }
};

