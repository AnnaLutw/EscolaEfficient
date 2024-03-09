class GradeDTO {
    constructor(id, aluno, turma, status, notas) {
        this.id = id; 
        this.aluno = aluno;
        this.status = status;
        this.notas = notas;
    }
}

module.exports = GradeDTO;
