// const Book = require('../models/Book.js');
const { Book } = require('../../db.js');
const { DEFAULT_IMAGE } = require('../../utils.js');
// const { Op, Sequelize } = require('sequelize');
require('dotenv').config();

const createBook = async (title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active, stock ) => {

  authors.includes(',') ? authors = authors.split(', ') : authors = authors.split('  ')

    const newBook = await Book.create({title, authors, publisher, image: image? image: DEFAULT_IMAGE, publishedDate, pageCount, genre, price, description, rating: rating? rating: 0, active: active? active: true, stock: stock? stock: 1 });
    return newBook;
};

module.exports = { createBook }