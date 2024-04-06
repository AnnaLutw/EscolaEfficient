const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const TeacherModel = require('../teacher/teacher.model');
const StudentModel = require('../student/student.model');
const UserModel = require('../user/user.model');

const secretKey = 'efficient';

async function create(schema, dto, collectionName) {
    try {
        const db = mongoose.connection;

        if (!db.models[collectionName]) {
            db.model(collectionName, schema);
        }

        const collectionModel = db.model(collectionName);
        const newDocument = new collectionModel(dto);

        const insertedDocument = await newDocument.save();
        return insertedDocument;
    } catch (error) {
        console.error(`Erro ao criar documento na coleção ${collectionName}:`, error);
        throw error;
    }
}

const generateToken = (type, cpf) => {
    const payload = {
        userType: type,
        cpf: cpf
    };
    const options = {
        expiresIn: '1h' 
    };

    return jwt.sign(payload, secretKey, options);
};

const checkStudent = async (user, res) => {
    try {
        const foundUser = await StudentModel.findOne({ cpf: user.cpf });
        if (foundUser) {
            const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.passwordHash);
            if (isPasswordCorrect) {
                const token = generateToken('student', user.cpf);
                const cookie = setCookie(token, res);
                if (cookie) {
                    return { content: 'Estudante autenticado', status: 200 };
                } else {
                    return { content: 'Não logado', status: 404 };
                }
            } else {
                return { content: 'Senha incorreta', status: 404 };
            }
        }
    } catch (error) {
        return { error: error, status: 500 };
    }
}

const checkTeacher = async (user, res) => {
    try {
        const foundUser = await TeacherModel.findOne({ cpf: user.cpf });

        if (foundUser) {
            const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.passwordHash);
            if (isPasswordCorrect) {
                const token = generateToken('teacher', user.cpf);
                const cookie = setCookie(token, res);
                if (cookie) {
                    return { content: 'Professor autenticado', status: 200 };
                } else {
                    return { content: 'Não logado', status: 404 };
                }
            } else {
                return { content: 'Senha incorreta', status: 404 };
            }
        }
    } catch (error) {
        return { error: error, status: 500 };
    }
}

const checkSecretary = async (user, res) => {
    try {
        console.log(user)

        const foundUser = await UserModel.findOne({ cpf: user.cpf });

        if (foundUser) {
            const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.passwordHash);
            if (isPasswordCorrect) {
                const token = generateToken('user', user.cpf);
                const cookie = setCookie(token, res);
                if (cookie) {
                    return { content: 'Secretaria autenticada', status: 200 };
                } else {
                    return { content: 'Não logado', status: 404 };
                }
            } else {
                return { content: 'Senha incorreta', status: 404 };
            }
        }
        
    } catch (error) {
        return { error: error, status: 500 };
    }
}
const login = async (user, res) => {
    try {
        const studentResult = await checkStudent(user, res);
        const teacherResult = await checkTeacher(user, res);
        const secretaryResult = await checkSecretary(user, res);

        if (studentResult && studentResult.status === 200) {
            return studentResult;
        } else if (teacherResult && teacherResult.status === 200) {
            return teacherResult;
        } else if (secretaryResult && secretaryResult.status === 200) {
            return secretaryResult;
        } else {
            return { content: 'Usuario não encontrado', status: 404 };
        }
    } catch (error) {
        return { content: error.message, status: 500 };
    }
}


const setCookie = (token, res) => {
    try {
        if (res && res.cookie) { 
            res.cookie('_auth_', token, { httpOnly: true });
            return true
        }
        return false
    } catch (error) {
        return { content: error.message, status: 500 };
    }
}



const createHash = async(password) =>{
    try{
        const saltRounds = 10; 
        return await bcrypt.hash(password, saltRounds);

    } catch(error){
        return { content: error.message, status: 500 };
    }
}
const getUser = async (req) => {
    try {
        const token = req.cookies._auth_; 

        if (token) {
            const { userType, cpf } = jwt.verify(token, secretKey);
            let userData;

            if (userType === 'teacher') {
                userData = await TeacherModel.findOne({ cpf: cpf });
            } else if (userType === 'student') {
                userData = await StudentModel.findOne({ cpf: cpf });
            } else {
                userData = await UserModel.findOne({ cpf: cpf });
            }

            if (!userData) {
                return { error: 'Usuário não encontrado', status: 404 };
            }
            const userDataWithType = {
                ...userData.toObject(),
                type: userType
            };

            return { content: userDataWithType, status: 200 };
        } else {
            return { error: 'Token não fornecido', status: 401 };
        }
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};



const getUserByCookie = async(req) =>{
    try {
        const token = req.cookies._auth_; 

        if (token) {
            const type = jwt.verify(token, secretKey);

            return type;
        } else {
            return { error: 'Token não fornecido', status: 401 };
        }
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}


module.exports = { create, createHash, login, getUserByCookie, getUser };
