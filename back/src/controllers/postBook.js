const Book = require('../models/Book.js');
// const { Op, Sequelize } = require('sequelize');
require('dotenv').config();
const { DEFAULT_IMAGE } = process.env;

const createBook = async (title, authors, publisher, image, publishedDate, pageCount, genre, price, description) => {
  
  if (!Array.isArray(authors)) {
    throw new Error('authors should be an array.');
  }
    const newBook = await Book.create({title, authors, publisher, image: image? image: DEFAULT_IMAGE, publishedDate, pageCount, genre, price, description });  
    return newBook;
};    

module.exports = { createBook }