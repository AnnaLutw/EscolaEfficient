const mongoose = require('mongoose');
const { create, getUser } = require('../helpers/helpers');
const TeamDTO = require('./team.dto');
const TeamModel = require('./team.model');
const StudentModel = require('../student/student.model');
const MessageModel = require('../message/message.model');
const MessageDTO = require('../message/message.dto');

const createTeam = async (team) => {
    try {
        const checkResult = await checkStudentsInOtherTeams(team.students);
        if (checkResult) {
            return checkResult;
        }
        
        const newTeam = new TeamDTO(null, team.name, team.students, team.teacher);
        await create(TeamModel.schema, newTeam, 'team');

        // let student = await studentModel.findById(id);
        // if (!student) {
        //     return { status: 404, content: "Student not found" };
        // }
        // student.turma = body.name;


        return { content: newTeam, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};


const getAll = async (headers) => {
    try {
        const userResponse = await getUser(headers); 
        if (userResponse.error) {
            return userResponse; 
        }
        const user = userResponse.content;
        let teams
        if(user.type == 'user'){
             teams = await TeamModel.find().populate('students', 'id name').populate('teacher', 'id name');
        }else if(user.type == 'teacher'){
             teams = await TeamModel.find({ teacher: user._id })
            .populate('students', 'id name')
            .populate('teacher', 'id name');
        }else{
            teams = await TeamModel.find({ students: user._id })
            .populate('students', 'id name')
            .populate('teacher', 'id name');
        }
       
        
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
        let team = await TeamModel.findById(id).populate('students', 'id name').populate('teacher', 'id name');
        return { status: 200, content: team };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};
const getStudentsById = async (id) => {
    try {
        let team = await TeamModel.findById(id).populate('students', 'name')
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

        const checkResult = await checkStudentsInOtherTeams(body.students);
        if (checkResult) {
            return checkResult;
        }

        team.name = body.name;
        team.students = [...team.students, ...body.students];
        team.teacher = body.teacher;

        await team.save(); 
        return { status: 200, content: 'update' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

const checkStudentsInOtherTeams = async (students) => {
    const allTeams = await TeamModel.find().populate('students', 'id');

    const studentIdsInOtherTeams = allTeams.reduce((acc, team) => {
        team.students.forEach(student => {
            acc.add(student.id);
        });
        return acc;
    }, new Set());

    const duplicatedStudents = students.filter(studentId => studentIdsInOtherTeams.has(studentId));

    if (duplicatedStudents.length > 0) {
        const duplicatedStudentsNames = await Promise.all(duplicatedStudents.map(async studentId => {
            const student = await StudentModel.findById(studentId);
            return student ? student.name : null;
        }));
        return { status: 400, content: "Os alunos " + duplicatedStudentsNames + " já estão em uma turma"  };
    }

    return null;
};

const deleteStudent = async (studentId) => {
    try {
        const team = await TeamModel.findOne({ students: studentId });
        if (!team) {
            throw new Error('Equipe não encontrada ou o aluno não está presente na equipe.');
        }
        team.students = team.students.filter(id => id.toString() !== studentId.toString());

        const updatedTeam = await team.save();

        return { status: 200, content: 'removed' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

const createMessage = async (message, headers) => {
    try {
        const userResponse = await getUser(headers); 
        if (userResponse.error) {
            return userResponse; 
        } 
        const user = userResponse.content;
        const newMessage = new MessageDTO(null, user._id, message.text, message.team);
        await create(MessageModel.schema, newMessage, 'message');
        return { status: 200, content: 'created' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

const getMessagesByTeam = async (teamId, headers) => {
    try {
        const userResponse = await getUser(headers);
        if (userResponse.error) {
            return userResponse;
        }
        const user = userResponse.content;

        let team = await TeamModel.findById(teamId.id);

        const myMessages = await MessageModel.find({ user: user._id, team: teamId.id }).populate('user');
        const otherMessages = await MessageModel.find({ user: { $ne: user._id }, team: teamId.id }).populate('user');

        return { status: 200, content: {team, myMessages, otherMessages } };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

module.exports = { createTeam,
     getAll, 
     changeStatusById, 
     getById, 
     change,
     deleteStudent, 
     createMessage, 
     getMessagesByTeam,
     getStudentsById };
