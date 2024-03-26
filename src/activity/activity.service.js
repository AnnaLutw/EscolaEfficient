const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');

const ActivityModel = require('../activity.model');
const TeamModel = require('../team/team.model');
const GradeModel = require('../grade/grade.model');
const ActivityDTO = require('../activity.dto');


const createActivity = async (id, activities) => {

    try {
        let team = await TeamModel.findById(id);

        for (const activity of activities) {
            const newActivityDTO = new ActivityDTO(activity.name, activity.point, team);
            await create(ActivityModel.schema, newActivityDTO, 'activities');
        }

        return { content: 'Atividades criadas com sucesso', status: 200 };
    } catch (error) {
        return { content: error.message, status: 500 };
    }
};



module.exports = { createActivity };
