const mongoose = require('mongoose');
const { create , createHash, getUser } = require('../helpers/helpers');
const UserDTO = require('./user.dto');
const UserModel = require('./user.model');

const createUser = async (user) => {
    try {
        const passwordHash = await createHash(user.password)

        const newUser = new UserDTO(null, user.name, user.cpf, user.status,passwordHash);
        await create(UserModel.schema, newUser, 'users'); 
        return {content: 'Criado',status: 200};
    } catch (error) {
        return  { error: error.message,status: 500};
    }
};
const editUser = async (body, headers) => {
    try {
        const userResponse = await getUser(headers); 
        if (userResponse.error) {
            return userResponse; 
        }
        const user = userResponse.content;
        const Model = require(`../${user.type}/${user.type}.model`);
        let userFounded = await Model.findById(user._id);
        userFounded.picture = body.picture;

        await userFounded.save();
        return { content: 'Editado', status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};


module.exports = { createUser, editUser };
