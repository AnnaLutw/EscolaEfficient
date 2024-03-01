const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    cpf: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    turmas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turma' }],
    status: { type: Number, default: 1 },
}, { timestamps: true }); 

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
 