class DisciplineDTO {
    constructor(id, name, total, atividades) {
        this.id = id; 
        this.name = name;
        this.atividades = atividades;
        this.total = total;
    }
}

module.exports = DisciplineDTO;
