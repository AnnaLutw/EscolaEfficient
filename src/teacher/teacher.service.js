const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const TeacherDTO = require('./teacher.dto');
const TeacherModel = require('./teacher.model');

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
        const teachers = await TeacherModel.find().select('name cpf email turmas status');
        return {content: teachers,status: 200};
    } catch (error) {
     
        return  { error: error.message,status: 500};
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



module.exports = { createTeacher, getAllTeachers, changeStatusById };
