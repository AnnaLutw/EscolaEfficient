class TeacherDTO {
    constructor(id, name, cpf, email, turmas, status) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.turmas = turmas;
        this.status = status;
    }
    
}

module.exports = TeacherDTO;
