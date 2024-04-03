const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
    name: { type: String },
    atividades: [{
        atividade: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
        point: { type: Number, default: 0 }
    }],
});

const Discipline = mongoose.model('Discipline', disciplineSchema);

module.exports = Discipline;
