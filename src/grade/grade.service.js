const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const GradeDTO = require('./grade.dto');
const GradeModel = require('./grade.model');
const ActivityModel = require('../activity/activity.model');
const ActivityDTO = require('../activity/activity.dto');
const StudentModel = require('../student/student.model');
const DisciplineModel = require('../disciplines/discipline.model');


const getAll = async () => {
    try {
        const grades = await GradeModel.find().populate({
            path: 'disciplines',
            populate: { path: 'discipline' } // Popule com a disciplina
        }).populate('student');

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
        if (!id) {
            throw new Error('ID not provided');
        }
        const grades = await GradeModel.findById(id).populate({
            path: 'disciplines',
            populate: {
                path: 'discipline', // Popule com a disciplina
                populate: {
                    path: 'atividades.atividade' // Popule com as atividades dentro de cada disciplina
                }
            }
        }).populate('student');
        
        

        
        if (!grades) {
            throw new Error('Student not found');
        }

        return { status: 200, content: grades };
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

const createActivity = async ( activitiesByDiscipline) => {
    try {

        for (const disciplineName in activitiesByDiscipline[0]) {
            const activities = activitiesByDiscipline[0][disciplineName]; 

            const discipline = await DisciplineModel.findOne({ name: disciplineName });
            if (!discipline) {
                throw new Error(`Discipline '${disciplineName}' not found`);
            }

            if (!discipline.atividades) {
                discipline.atividades = [];
            }

            for (const activity of activities) {
            const newActivity = new ActivityModel({ 
                name: activity.name,
                points: activity.points,
                team: activity.team
            });
                
                const activityCreated = await create(ActivityModel.schema, newActivity, 'activities');
                    console.log(discipline)
                discipline.atividades.push({ atividade: activityCreated._id, point: 0 });
            }
            await discipline.save();
        }

        return { content: 'Atividades criadas com sucesso', status: 200 };
    } catch (error) {
        return { content: error.message, status: 500 };
    }
};






module.exports = {  getAll, changeStatusById, getById, change, createActivity };
