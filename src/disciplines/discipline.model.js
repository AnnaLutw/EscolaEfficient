const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
    name: { type: String },
    atividades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    total: { type: Number, default: 0 }
});

const Discipline = mongoose.model('Discipline', disciplineSchema);

module.exports = Discipline;
