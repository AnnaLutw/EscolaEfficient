const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const GradeDTO = require('./grade.dto');
const GradeModel = require('./grade.model');
const TeamModel = require('../team/team.model');

// const createGrade = async (grade) => {
//     try {
//         const newGrade = new GradeDTO({
//             aluno: grade.aluno,
//             status: grade.status,
//             ano: grade.ano,
//             periodo: grade.periodo,
//             notas: {
//                 math: null,
//                 pt: null,
//                 ingl: null,
//                 art: null,
//                 science: null,
//                 history: null,
//                 geo: null
//             }
//         });

//         await create(GradeModel.schema, newGrade, 'grades'); 
//         return { content: newGrade, status: 200 };
//     } catch (error) {
//         return { error: error.message, status: 500 };
//     }
// };


const getAll = async () => {
    try {
        const grades = await GradeModel.find();
        
        return { content: grades, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};


const changeStatusById = async (id) => {
    try {
        let grade = await GradeModel.findById(id);

        if (!grade) {
            throw new Error('Professor não encontrado');
        }
        grade.status = grade.status === 1 ? 0 : 1;
        await grade.save();
        return {status:200 , content:'update'};
    } catch (error) {
        return { status:200, content: error.message };
    }
};

const getById = async (id) => {
    try {
        let grade = await GradeModel.findById(id);
        return {status:200 , content:grade};

    } catch (error) {
        return { status:200, content: error.message };
    }
};
const change = async (id, body) => {
    try {
        let grade = await GradeModel.findById(id);

        if (!grade) {
            return { status: 404, content: "Grade not found" };
        }

        if (body.aluno) {
            grade.aluno = body.aluno;
        }
        
        if (body.status) {
            grade.status = body.status;
        }
        if (body.ano) {
            grade.ano = body.ano;
        }
        if (body.periodo) {
            grade.periodo = body.periodo;
        }

        await grade.save(); 
        return { status: 200, content: 'Grade updated' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};



module.exports = { createGrade, getAll, changeStatusById, getById, change };
