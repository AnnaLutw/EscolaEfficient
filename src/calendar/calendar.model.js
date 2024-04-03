const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    event: { type: String, required: true },
    date:{ type: Date, required: true }
 
   
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
