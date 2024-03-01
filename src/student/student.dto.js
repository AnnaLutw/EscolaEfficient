class StudentDTO {
    constructor(id, name, cpf, contact, turmas, status) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.contact = contact;
        this.turmas = turmas;
        this.status = status;
    }
    
}

module.exports = StudentDTO;
