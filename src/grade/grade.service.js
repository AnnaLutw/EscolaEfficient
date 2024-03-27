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
        const grades = await GradeModel.find().populate('student disciplines');

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
        const grades = await GradeModel.findById(id).populate('student disciplines');
        
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

const createActivity = async (gradeId, activitiesByDiscipline) => {
    try {
        let grade = await GradeModel.findById(gradeId);

        if (!grade) {
            throw new Error('Grade not found');
        }

        for (const disciplineName in activitiesByDiscipline[0]) {
            console.log(disciplineName)
            const activities = activitiesByDiscipline[0][disciplineName]; 

            const discipline = await DisciplineModel.findOne({ name: disciplineName });
            if (!discipline) {
                throw new Error(`Discipline '${disciplineName}' not found`);
            }

            if (!discipline.atividades) {
                discipline.atividades = [];
            }

            for (const activity of activities) {
            console.log(activity)
                // Assuming ActivityDTO is a class or a constructor function
                const newActivityDTO = new ActivityDTO(
                    null,
                    activity.name,
                     activity.points,
                    discipline.id,
                     activity.team
              );
                
                // Assuming create is a function to create the activity in the database
                await create(ActivityModel.schema, newActivityDTO, 'activities');
                discipline.atividades.push(newActivityDTO);
            }
        }

        return { content: 'Atividades criadas com sucesso', status: 200 };
    } catch (error) {
        return { content: error.message, status: 500 };
    }
};






module.exports = {  getAll, changeStatusById, getById, change, createActivity };
