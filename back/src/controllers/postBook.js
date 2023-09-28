// const Book = require('../models/Book.js');
const { Book } = require('../db.js');
const { DEFAULT_IMAGE } = require('../utils.js');
// const { Op, Sequelize } = require('sequelize');
require('dotenv').config();
// const { DEFAULT_IMAGE } = process.env;

const createBook = async (title, authors, publisher, image, publishedDate, pageCount, genre, price, description) => {

  authors.includes(',') ? authors = authors.split(', ') : authors = authors.split('  ')

    const newBook = await Book.create({title, authors, publisher, image: image? image: DEFAULT_IMAGE, publishedDate, pageCount, genre, price, description });
    return newBook;
};

module.exports = { createBook }