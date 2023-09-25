const axios = require('axios');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
// const { Book, Categories } = require('../db.js');
// const { DESC, ASC } = require('../utils.js');
// const DISPLAYED_BOOKS = 10;

const getAPIbooks = async () => {
    //{ sort, page = 0 }
    const apiBooks = []; 
  
    const apiRequest = axios.get(API_URL);
    const responses = await Promise.all([apiRequest]);
  
    // FOR PARA OBJETOS
    for (const response of responses) {
      const books = response.data.items.map((book) => {
          return {
            id: book.id,    // pendiente de si se deja así o se reasigna
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors.map((author) => author),
            publisher: book.volumeInfo.publisher,
            image: book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail: DEFAULT_IMAGE,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount:book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories.map((cat) => cat), // confirmar si lo manejamos así o de forma independiente para los modelos de la BD.
            description: book.volumeInfo.description,
            origin: 'api',
          };
        
      });
      apiBooks.push(...books);
    }
    return apiBooks;
  };


  const getDBbooks = async () => {
    // const dbBooks = await Book.findAll();
    // return dbBooks;
    return [];
  };

  const getAllBooks = async () => {
    const apiBooks = await getAPIbooks();
    const dbBooks = await getDBbooks();

    let allBooks = apiBooks.concat(dbBooks);
    return allBooks;
  };


  module.exports = { getAPIbooks, getDBbooks, getAllBooks};