const mongoose = require('mongoose');
const { create } = require('../helpers/helpers');
const BookDTO = require('./book.dto');
const BookModel = require('./book.model');


const getAll = async () => {
    try {
        const books = await BookModel.find();
      
        return { content: books, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const createBook = async (book) => {
    console.log(book)
    try {
      let expiration = new Date();
      expiration.setDate(expiration.getDate() + 7); 
  
      const newBooks = new BookDTO(null, book.book, book.student, expiration, false);
  
      await create(BookModel.schema, newBooks, 'books');
  
      return { content: newBooks, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  };
  
module.exports = { createBook, getAll };