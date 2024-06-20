const mongoose = require('mongoose');
const BookDTO = require('./book.dto');
const BookModel = require('./book.model');
const { create, getUser } = require('../helpers/helpers');


const getAll = async (headers) => {
    try {
      const userResponse = await getUser(headers); 
      if (userResponse.error) {
          return userResponse; 
      }
      const user = userResponse.content;
      let books

      if(user.type == 'student'){
        books = await BookModel.find({ student: user._id })
      }else{
        books = await BookModel.find();

      }
        return { content: books, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const createBook = async (book, headers) => {
    try {
      const userResponse = await getUser(headers); 
      if (userResponse.error) {
          return userResponse; 
      }
      const user = userResponse.content;

      let expiration = new Date();
      expiration.setDate(expiration.getDate() + 7); 
  
      const newBooks = new BookDTO(null, book.id, user._id, expiration, false);
  
      await create(BookModel.schema, newBooks, 'books');
  
      return { content: 'Emprestado', status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  };
  
  const change = async (body) => {
    try {
        let book = await BookModel.findById(body.id);

        if (!book) {
            return { status: 404, content: "Emprestimo não encontrado" };
        }
        if (!book.returned) {
            book.returned = true;
        }

        await book.save(); 
        return { status: 200, content: 'Livro devolvido' };
    } catch (error) {
        return { status: 500, content: error.message };
    }
};

module.exports = { createBook, getAll, change };