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
const DISPLAYED_BOOKS = 10;

const getBooks = async () => {
  
    const apiRequest = axios.get(API_URL);
    const responses = await Promise.all([apiRequest]); 
    const dbBooks = await Book.findAll();
    
    if(dbBooks.length < 1){
    for (const response of responses) {
      response.data.forEach(async(book) => {
        await Book.create({
            id: book.id,   
            title: book.title,
            authors: book.authors,
            publisher: book.publisher,
            image: book.image ? book.image: DEFAULT_IMAGE,
            publishedDate: book.publishedDate,
            pageCount:book.pageCount,
            genre: book.gender,
            price: book.price,
            description: book.description,
            rating: Math.floor(Math.random() * 5 + 1)
          })
      });
    }
  }
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

module.exports = { getBooks, getFilteredBooks };


// -------------------------------------------------------------

// FOR PARA OBJETOS
// for (const response of responses) {
//   const books = response.data.map((book) => {
//       return {
//         id: book.id,   
//         title: book.title,
//         authors: book.authors,
//         publisher: book.publisher,
//         image: book.image ? book.image: DEFAULT_IMAGE,
//         publishedDate: book.publishedDate,
//         pageCount:book.pageCount,
//         genre: book.gender,
//         price: book.price,
//         // usdPrice: book.price,
//         // arsPrice: book.price * 350,
//         // copPrice: book.price * 4000, 
//         description: book.description,
//       };
//   });
//   apiBooks.push(...books);
// }



// const dbBooks = await Book.findAll();
// if (dbBooks.length < 1){
  //   await Book.bulkCreate(apiBooks, {
  //     ignoreDuplicates: true,
  // });
  // };  
  
  // const getDBbooks = async () => {
    //   const dbBooks = await Book.findAll();
    //   return dbBooks;
    // };
    
    // const getAllBooks = async () => {
    //   const apiBooks = await getAPIbooks();
    //   const dbBooks = await getDBbooks();
  
    //   let allBooks = apiBooks.concat(dbBooks);
    //   return allBooks;
    // };