class UserDTO {
    constructor(id, name, cpf, status, passwordHash) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.status = status;
        this.passwordHash = passwordHash;
    }
    
}

module.exports = UserDTO;
