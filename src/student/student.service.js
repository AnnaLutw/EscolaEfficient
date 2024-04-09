const mongoose = require('mongoose');
const { create, createHash } = require('../helpers/helpers');
const studentDTO = require('./student.dto');
const studentModel = require('./student.model');
const TeamModel = require('../team/team.model');
const GradeModel = require('../grade/grade.model');
const GradeDTO = require('../grade/grade.dto');
const DisciplineModel = require('../disciplines/discipline.model');
const DisciplineDTO = require('../disciplines/disciplines.dto');

const initializeDisciplines = async () => {
    try {
        const disciplinas = ['Matemática', 'Português', 'Ciências', 'Geografia', 'História', 'Educação Física', 'Artes', 'Inglês'];
        for (const disciplina of disciplinas) {
            const existingDiscipline = await DisciplineModel.findOne({ name: disciplina });
            if (!existingDiscipline) {
                const newDiscipline = new DisciplineModel({ 
                    name: disciplina, 
                    atividades: [], 
                });
                await create(DisciplineModel.schema, newDiscipline, 'disciplines'); 
            }
        }
    } catch (error) {
        console.error('Erro ao inicializar as disciplinas:', error);
    }
};

const createStudent = async (student) => {
    try {
        await initializeDisciplines()
        const passwordHash = await createHash(student.password)

        const newStudent = new studentDTO(
            null,
            student.name,
            student.cpf,
            student.contact,
            student.turma,
            student.status,
            '',
            passwordHash
        );

         const studentCreated = await create(studentModel.schema, newStudent, 'students');

         const disciplineIds = (await DisciplineModel.find({}, '_id')).map(discipline => discipline._id);

         const gradeEntries = disciplineIds.map(disciplineId => ({
            discipline: disciplineId, 
            total: 0
        }));


        const newGrade = new GradeModel({
            student: studentCreated._id, 
            disciplines: gradeEntries
        });
            await create(GradeModel.schema, newGrade, 'grades');

 

        return { content: 'Estudante criado com sucesso', status: 200 };
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
