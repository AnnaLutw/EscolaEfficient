const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref:'Student' } ,
    team: { type: mongoose.Schema.Types.ObjectId, ref:'Team' } ,
}, { timestamps: true }); 

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
 