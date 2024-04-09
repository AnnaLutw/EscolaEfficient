class MessageDTO {
    constructor(id, user, text, team) {
        this.id = id; 
        this.user = user;
        this.text = text;
        this.team = team
    }
    
}
module.exports = MessageDTO;
