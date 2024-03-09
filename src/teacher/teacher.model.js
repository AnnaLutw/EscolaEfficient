const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    turmas: [{ type: String, }],
    status: { type: Number, default: 1 }, 
}, { timestamps: true }); 

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
 