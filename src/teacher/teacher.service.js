const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const TeacherDTO = require('./teacher.dto');
const TeacherModel = require('./teacher.model');
const TeamModel = require('../team/team.model');

const createTeacher = async (teacher) => {
    try {
        const newTeacher = new TeacherDTO(null, teacher.name, teacher.cpf, teacher.email, [], teacher.status);
        await create(TeacherModel.schema, newTeacher, 'teachers'); 
        return {content: teacher,status: 200};
    } catch (error) {
        return  { error: error.message,status: 500};
    }
};

const getAllTeachers = async () => {
    try {
        const teachers = await TeacherModel.find();
        const updatedTeachers = await Promise.all(teachers.map(async (teacher) => {
            const turmas = await TeamModel.find({ teacher: teacher._id });
            if (turmas.length > 0) {
                teacher.turmas = turmas.map(turma => turma.name);
            } else {
                teacher.turmas = null;
            }
            return teacher;
        }));
        return { content: updatedTeachers, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};


const changeStatusById = async (id) => {
    try {
        let teacher = await TeacherModel.findById(id);

        if (!teacher) {
            throw new Error('Professor não encontrado');
        }
        teacher.status = teacher.status === 1 ? 0 : 1;
        await teacher.save();
        return {status:200 , content:'update'};
    } catch (error) {
        return { status:200, content: error.message };
    }
};

const getById = async (id) => {
    try {
        let teacher = await TeacherModel.findById(id);
        return {status:200 , content:teacher};

    } catch (error) {
        return { status:200, content: error.message };
    }
};
const change = async (id, body) => {
    try {
        let teacher = await TeacherModel.findById(id);

        if (!teacher) {
            return { status: 404, content: "Professor not found" };
        }

        teacher.name = body.name;
        teacher.cpf = body.cpf;
        teacher.email = body.email;

        await teacher.save(); 
        return { status: 200, content: 'update' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};


module.exports = { createTeacher, getAllTeachers, changeStatusById, getById, change };
