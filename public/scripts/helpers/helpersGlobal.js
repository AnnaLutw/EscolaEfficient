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
            throw new Error(content); // Throw an error to be caught in the calling function
        }
        console.log(status,content)

        return { content, status };
    } catch (error) {
        throw new Error('Erro ao processar a requisição: ' + error.message);
    }
};


const list = async (route, func) => {
    try {
        const resposne = await request('GET', route, null)
        return resposne.status != 200 ? messagesHandler.messageError() : func(resposne.content); 
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

