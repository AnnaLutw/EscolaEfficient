const mongoose = require('mongoose');
const { create, getUser } = require('../helpers/helpers');
const CalendarDTO = require('./calendar.dto');
const CalendarModel = require('./calendar.model');
const TeamModel = require('../student/student.model');
const getAll = async (headers) => {
    try {
        let calendars;

        const userResponse = await getUser(headers); 
        if (userResponse.error) {
            return userResponse; 
        }
        const user = userResponse.content;

        if (user.type === 'user') {
            calendars = await CalendarModel.find();
        } else if (user.type === 'teacher') {
            const team = await TeamModel.find({ teacher: user._id });
            console.log(team);
            team ?   calendars = await CalendarModel.find({ team: team._id }) :  calendars = []
        } else {
            const team = await TeamModel.find({ students: user._id });
            team ?   calendars = await CalendarModel.find({ team: team._id }) :  calendars = []
        }

        const emptyCalendars = await CalendarModel.find({ team: { $exists: false } });
        
        calendars = calendars.concat(emptyCalendars);

        return { content: calendars, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};



const createEvent = async (calendar) => {
    try {
        const calendars = new CalendarDTO(null, calendar.event, calendar.start, calendar.end , calendar.type, calendar.team);
        await create(CalendarModel.schema, calendars, 'calendars'); 
        return {content: 'created',status: 200};

    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const getAllTypes = () => {
    try {
        const eventTypes = CalendarDTO.eventTypes; 
        return { content: eventTypes, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};


module.exports = {  getAll, createEvent, getAllTypes};
