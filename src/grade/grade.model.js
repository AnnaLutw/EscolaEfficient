const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    Disciplina: [{
        discipline: { type: mongoose.Schema.Types.ObjectId, ref: 'discipline' },
        point: { type: Number } 
    }],
   
    total: { type: Number, default: 0 }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
