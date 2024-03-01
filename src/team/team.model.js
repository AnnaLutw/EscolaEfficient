const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    status: { type: Number, default: 1 }, 
}, { timestamps: true }); 

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
 