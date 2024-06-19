const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book: { type: String, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    date_expiratrion: { type: Date, required: true },
    returned: { type: Boolean, required: true },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;