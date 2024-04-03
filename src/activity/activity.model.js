const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Referência à turma
    point: { type: Number,  default: 0 },
   
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
