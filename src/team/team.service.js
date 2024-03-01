const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const TeamDTO = require('./team.dto');
const TeamModel = require('./team.model');

const createTeam = async (team) => {
    try {
        const newTeam = new TeamDTO(null, team.name, team.students, team.teachers);
        await create(TeamModel.schema, newTeam, 'team'); 
        return { content: newTeam, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const getAll = async () => {
    try {
        const teams = await TeamModel.find().select('name students teachers');
        return { content: teams, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const changeStatusById = async (id) => {
    try {
        let team = await TeamModel.findById(id);

        if (!team) {
            throw new Error('Team não encontrado');
        }
        team.status = team.status === 1 ? 0 : 1;
        await team.save();
        return { status: 200, content: 'update' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

const getById = async (id) => {
    try {
        let team = await TeamModel.findById(id);
        return { status: 200, content: team };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

const change = async (id, body) => {
    try {
        let team = await TeamModel.findById(id);

        if (!team) {
            return { status: 404, content: "Team not found" };
        }

        team.name = body.name;
        team.students = body.students;
        team.teachers = body.teachers;

        await team.save(); 
        return { status: 200, content: 'update' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

module.exports = { createTeam, getAll, changeStatusById, getById, change };
