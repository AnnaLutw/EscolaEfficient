class TeacherDTO {
    constructor(id, name, cpf, email, turmas, status, picture, passwordHash) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.turmas = turmas;
        this.status = status;
        this.picture = picture;
        this.passwordHash = passwordHash;
    }
    
}

module.exports = TeacherDTO;
