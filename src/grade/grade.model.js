const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    aluno: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    status: { type: Number, default: 1 }, 
    ano: { type: Number, required: true },
    periodo: { type: Number, enum: [1, 2], required: true }, 
    notas: {
        math: { type: Number, default: null },
        pt: { type: Number, default: null },
        ingl: { type: Number, default: null },
        art: { type: Number, default: null },
        science: { type: Number, default: null },
        history: { type: Number, default: null },
        geo: { type: Number, default: null }
    }
}, { timestamps: true });

gradeSchema.pre('save', function(next) {
    if (this.isNew) {
        this.notas = {
            math: null,
            pt: null,
            ingl: null,
            art: null,
            science: null,
            history: null,
            geo: null
        };
    }
    next();
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
