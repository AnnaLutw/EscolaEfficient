const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const studentDTO = require('./student.dto');
const studentModel = require('./student.model');

const createStudent = async (student) => {
    try {
        const newstudent = new studentDTO(null, student.name, student.cpf, student.contact, [], student.status);
        await create(studentModel.schema, newstudent, 'students'); 
        return {content: student,status: 200};
    } catch (error) {
        return  { error: error.message,status: 500};
    }
};

const getAllStudents = async () => {
    try {
        const students = await studentModel.find()
        return {content: students,status: 200};
    } catch (error) {
     
        return  { error: error.message,status: 500};
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
