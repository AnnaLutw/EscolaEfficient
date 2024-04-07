const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true },
    picture: { type: String },
}, { timestamps: true }); 

const News = mongoose.model('New', newsSchema);

module.exports = News;
 