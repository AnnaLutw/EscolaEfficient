class StudentDTO {
    constructor(id, name, cpf, contact, turma, status) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.contact = contact;
        this.turma = turma;
        this.status = status;
     
    }
}

module.exports = StudentDTO;
