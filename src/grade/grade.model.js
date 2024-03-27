const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    disciplines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discipline' }],
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
