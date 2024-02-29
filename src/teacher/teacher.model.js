const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    turmas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turma' }],
    status: { type: Number, default: 1 }, // Por padrão, o status é definido como 1
}, { timestamps: true }); 

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
 