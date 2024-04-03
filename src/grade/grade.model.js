const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    disciplines: [{
        discipline: { type: mongoose.Schema.Types.ObjectId, ref: 'Discipline' },
        total: { type: Number, default: 0 }
    }],
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
