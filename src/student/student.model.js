const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    cpf: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    status: { type: Number, default: 1 },
    picture: { type: String },
    passwordHash: { type: String,required: true, unique: true }, 
  
}, { timestamps: true }); 

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
