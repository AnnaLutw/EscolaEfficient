const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    event: { type: String, required: true },
    start:{ type: Date, required: true },
    end:{ type: Date },
    type:{ type:String, required: true },
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
