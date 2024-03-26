const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const studentDTO = require('./student.dto');
const studentModel = require('./student.model');
const TeamModel = require('../team/team.model');
const GradeModel = require('../grade/grade.model');
const DisciplineModel = require('../disciplines/discipline.model');

const createStudent = async (student) => {
    try {
        const newStudent = new studentDTO(
            null,
            student.name,
            student.cpf,
            student.contact,
            student.turma,
            student.status,
            []
        );

        const createdStudent = await create(studentModel.schema, newStudent, 'students');

        // Retrieve the IDs of disciplines
        const disciplinas = ['Matematica', 'Portugues', 'Ciencias', 'Geografia', 'Historia', 'Educação Física', 'Artes', 'Ingles'];
        const disciplineIds = await Promise.all(disciplinas.map(async (disciplinaName) => {
            const discipline = await DisciplineModel.findOne({ name: disciplinaName });
            return discipline._id;
        }));

        // Create grades with valid references to disciplines
        const createdGrades = disciplineIds.map(disciplineId => ({
            discipline: disciplineId,
            point: 0 
        }));

        createdStudent.grades = createdGrades;
        await createdStudent.save();

        return { content: createdStudent, status: 200 };
    } catch (error) {
        return { content: error.message, status: 500 };
    }
};



const getAllStudents = async () => {
    try {
        const students = await studentModel.find();
        const updatedStudents = await Promise.all(students.map(async (student) => {
            const turma = await TeamModel.findOne({ students: student._id });
            console.log(turma)
            if (turma) {
                console.log(turma)
                student.turma = turma.name;
            } else {
                student.turma = null;
            }
            return student;
        }));
        return { content: updatedStudents, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};









const changeStatusById = async (id) => {
    try {
        let student = await studentModel.findById(id);

        if (!student) {
            throw new Error('Professor não encontrado');
        }
        student.status = student.status === 1 ? 0 : 1;
        await student.save();
        return {status:200 , content:'update'};
    } catch (error) {
        return { status:200, content: error.message };
    }
};

const getById = async (id) => {
    try {
        let student = await studentModel.findById(id);
        return {status:200 , content:student};

    } catch (error) {
        return { status:200, content: error.message };
    }
};
const change = async (id, body) => {
    try {
        let student = await studentModel.findById(id);

        if (!student) {
            return { status: 404, content: "Student not found" };
        }

        student.name = body.name;
        student.cpf = body.cpf;
        student.contact = body.contact;

        await student.save(); 
        return { status: 200, content: 'update' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};


module.exports = { createStudent, getAllStudents, changeStatusById, getById, change };
