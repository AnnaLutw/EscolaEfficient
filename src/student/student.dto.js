class StudentDTO {
    constructor(id, name, cpf, contact, turma, status, grade) {
        this.id = id; 
        this.name = name;
        this.cpf = cpf;
        this.contact = contact;
        this.turma = turma;
        this.status = status;
        this.grade = grade; 
    }
}

module.exports = StudentDTO;
