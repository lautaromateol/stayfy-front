const axios = require('axios');
const { DEFAULT_IMAGE, ASC, DESC } = require('../utils');
require('dotenv').config();
const { API_URL } = process.env;
const { Book } = require('../db.js');
const { filterByTitle } = require('./filters.js/filterByTitle');
const { filterByGenre } = require('./filters.js/filterByGenre');
const { sortByDate } = require('./filters.js/sortByDate');
const { sortBooks } = require('./filters.js/sortBooks');
const { filterByAuthor } = require('./filters.js/filterByAuthor');
const { filterByPublisher } = require('./filters.js/filterByPublisher');
const { filterByRating } = require('./filters.js/filterByRating');

const createBooks = async () => {

  const apiRequest = axios.get(API_URL);
  const responses = await Promise.all([apiRequest]);
  const dbBooks = await Book.findAll();

  if (dbBooks.length < 1) {
    for (const response of responses) {
      response.data.forEach(async (book) => {
        await Book.create({
          id: book.id,
          title: book.title,
          authors: book.authors,
          publisher: book.publisher,
          image: book.image ? book.image : DEFAULT_IMAGE,
          publishedDate: book.publishedDate,
          pageCount: book.pageCount,
          genre: book.gender,
          price: Math.ceil(book.price),
          arsPrice: Math.ceil(book.price * 843),
          copPrice: Math.ceil(book.price * 4200),
          mxnPrice: Math.ceil(book.price * 18),
          description: book.description,
          rating: Math.round(Math.random() * (5 - 3) + 3),
        });
      });
    };
  };
};

const getBooks = async () => {
  const dbBooks = await Book.findAll();
  return dbBooks;
};

const getFilteredBooks = async ({ sort, page = 0, genre = '', title, publishedDate, author, publisher, rating }) => {

  let foundBooks = await getBooks();

  foundBooks = filterByTitle(foundBooks, title);
  foundBooks = filterByGenre(foundBooks, genre);
  foundBooks = filterByAuthor(foundBooks, author);
  foundBooks = filterByPublisher(foundBooks, publisher);
  foundBooks = filterByRating(foundBooks, rating);

  if(publishedDate){
    foundBooks = sortByDate(foundBooks, publishedDate.direction);
  };
  const sortedBooks = sortBooks(foundBooks, sort, page);
  return sortedBooks;
};

module.exports = { createBooks, getBooks, getFilteredBooks };