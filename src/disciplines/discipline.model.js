const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
    name: { type: String },
    atividades: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
});

const Discipline = mongoose.model('Grade', disciplineSchema);

module.exports = Discipline;
