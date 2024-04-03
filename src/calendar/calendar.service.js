const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const CalendarDTO = require('./calendar.dto');
const CalendarModel = require('./calendar.model');


const getAll = async () => {
    try {
        const caledars = await CalendarModel.find()

        return { content: caledars, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const createEvent = async (calendar) => {
    try {
        console.log(calendar)
        const calendars = new CalendarDTO(null, calendar.event, calendar.date);
        await create(CalendarModel.schema, calendars, 'calendars'); 
        return {content: 'created',status: 200};

    } catch (error) {
        return { error: error.message, status: 500 };
    }
};




module.exports = {  getAll, createEvent};
