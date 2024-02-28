const request = async (method, route, body) => {
    try {
        const response = await fetch(route, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar a requisição.');
        }

        return await response.json();
    } catch (error) {
        throw statusHandler.messageError(error);
    }
};