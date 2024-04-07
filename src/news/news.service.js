const mongoose = require('mongoose');
const { create  } = require('../helpers/helpers');
const NewsDTO = require('./news.dto');
const NewsModel = require('./news.model');

const createNews = async (news) => {
    try {
        const newNews = new NewsDTO(null, news.title, news.description, news.picture);
        await create(NewsModel.schema, newNews, 'news'); 
        return {content: newNews,status: 200};
    } catch (error) {
        return  { error: error.message,status: 500};
    }
};

const getAll = async () => {
    try {
        const news = await NewsModel.find();
      
        return { content: news, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};




// const getById = async (id) => {
//     try {
//         let teacher = await TeacherModel.findById(id);
//         return {status:200 , content:teacher};

//     } catch (error) {
//         return { status:200, content: error.message };
//     }
// };
// const change = async (id, body) => {
//     try {
//         let teacher = await TeacherModel.findById(id);

//         if (!teacher) {
//             return { status: 404, content: "Professor not found" };
//         }

//         teacher.name = body.name;
//         teacher.cpf = body.cpf;
//         teacher.email = body.email;

//         await teacher.save(); 
//         return { status: 200, content: 'update' };
//     } catch (error) {
//         return { status: 500, content: error.message };
//     }
// };


module.exports = { createNews, getAll };
