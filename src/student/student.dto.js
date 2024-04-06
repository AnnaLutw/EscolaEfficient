class StudentDTO {
    constructor(id, name, cpf, contact, turma, status ,picture, passwordHash) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.contact = contact;
        this.turma = turma;
        this.status = status;
        this.picture = picture;
        this.passwordHash = passwordHash;
     
    }
}

module.exports = StudentDTO;
