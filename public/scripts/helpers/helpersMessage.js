class messagesHandler {

    constructor(message){
        this.message = message;
    }

    static newMessage(newMessage){
        const {message:msg} = new messagesHandler(newMessage);
        return $.notify(msg, "success"); 
    };

    static messageError(newError, error){

        if(error){
            const {message:msg} = new messagesHandler(newError);

            return $.notify(msg, "error");
        }

        
    };

    static messageWarning(newWarning){
        const {message:msg} = new messagesHandler(newWarning);

        return $.notify(msg, "warn");
    };
};