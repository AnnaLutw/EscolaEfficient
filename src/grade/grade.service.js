const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const GradeDTO = require('./grade.dto');
const GradeModel = require('./grade.model');
const ActivityModel = require('../activity/activity.model');
const ActivityDTO = require('../activity/activity.dto');
const StudentModel = require('../student/student.model');


const getAll = async () => {
    try {
        const students = await StudentModel.find().populate('grades').exec();

        const updatedStudents = students.map(student => {
            const updatedGrades = student.grades.map(grade => {
                const total = grade.atividades.reduce((total, activity) => total + activity.point, 0);
                return {
                    id: grade._id,
                    disciplina: grade.disciplina,
                    total: total
                };
            });

            return {
                _id: student._id,
                name: student.name,
                grades: updatedGrades
            };
        });

        return { content: updatedStudents, status: 200 };
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
        if (!id) {
            throw new Error('ID not provided');
        }

        let student = await StudentModel.findById(id).populate('grades').exec();
        
        if (!student) {
            throw new Error('Student not found');
        }

        const updatedGrades = student.grades.map(grade => {
            const totalPoints = grade.atividades.reduce((total, activity) => total + activity.point, 0);
            return {
                _id: grade._id,
                disciplina: grade.disciplina,
                totalPoints: totalPoints
            };
        });

        const updatedStudent = {
            _id: student._id,
            name: student.name,
            grades: updatedGrades
        };

        return { status: 200, content: updatedStudent };
    } catch (error) {
        return { status: 500, content: error.message };
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

module.exports = {  getAll, changeStatusById, getById, change };
