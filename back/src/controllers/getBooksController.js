const axios = require('axios');
const Book = require('../models/Book');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
// const { Book } = require('../db.js');
// const { DESC, ASC } = require('../utils.js');
// const DISPLAYED_BOOKS = 10;


const getBooks = async () => {
    //{ sort, page = 0 }
    const apiBooks = []; 
  
    const apiRequest = axios.get(API_URL);
    const responses = await Promise.all([apiRequest]);
  
    // FOR PARA OBJETOS
    for (const response of responses) {
      const books = response.data.items.map((book) => {
          return {
            id: book.id,   
            title: book.title,
            authors: book.authors,
            publisher: book.publisher,
            image: book.image ? book.image: DEFAULT_IMAGE,
            publishedDate: book.publishedDate,
            pageCount:book.pageCount,
            genre: book.genre,
            usdPrice: book.price,
            arsPrice: book.price * 350,
            copPrice: book.price * 4000, 
            description: book.description,
          };
      });
      apiBooks.push(...books);
    }

    const dbBooks = await Book.findAll();
    if (dbBooks.length < 1){
      await Book.bulkCreate(apiBooks, {
        ignoreDuplicates: true,
    });
    };
    
    return apiBooks;
  };

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


  module.exports = { getBooks };