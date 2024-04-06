const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    cpf: { type: String, required: true, unique: true },
    status: { type: Number, default: 1 },
    passwordHash: { type: String,required: true, unique: true }, 
  
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
