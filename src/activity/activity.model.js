const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    nome: {  type: String,  required: true },
    point: { type:Number,  required: true, default: 0},
    team:  { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
     
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
