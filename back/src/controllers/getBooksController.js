const axios = require('axios');
const { DEFAULT_IMAGE, ASC, DESC } = require('../utils');
require('dotenv').config();
const { API_URL } = process.env;
const { Book } = require('../db.js');
const { filterByTitle } = require('./filters.js/filterByTitle');
const { filterByGenre } = require('./filters.js/filterByGenre');
const { sortByDate } = require('./filters.js/sortByDate');
const { sortBooks } = require('./filters.js/sortBooks');
const DISPLAYED_BOOKS = 10;


// function sortBooks(foundBooks, sort, page) {
  
//   let totalPages = Math.ceil(foundBooks.length / DISPLAYED_BOOKS);

//   const finalPage = page > totalPages ? totalPages - 1 : page;
//   if (sort) {
//     let sortedBooks = [...foundBooks].sort((a, b) => {
//       if (a[sort.field] < b[sort.field]) {
//         return -1;
//       }
//       if (a[sort.field] > b[sort.field]) {
//         return 1;
//       }
//       return 0;
//     });
//     if (sort.direction === DESC) {
//       sortedBooks = [...sortedBooks].reverse();
//     }
//     foundBooks = sortedBooks;
//   }

//   if (finalPage === 0 || finalPage) {
//     let paginatedBooks = [...foundBooks].slice(
//       finalPage * DISPLAYED_BOOKS,
//       finalPage * DISPLAYED_BOOKS + DISPLAYED_BOOKS
//     );
//     foundBooks = paginatedBooks;
//   }
//   return {
//     foundBooks,
//     totalPages,
//   };
// };

// function filterByTitle(drivers, searchTitle) {
//   if (!searchTitle) {
//     return drivers;
//   };
//   const lowerSearchTitle = searchTitle.toLocaleLowerCase();
//   const filteredDrivers = drivers.filter(({ title }) => {
//     const title = filteredDrivers.toLocaleLowerCase();
//     return title.includes(lowerSearchTitle);
//   });
//   return filteredDrivers;
// };


// function filterByGenre(books, genre) {
//   if (!genre) {
//     return books;
//   }
//   const filteredBooks = books.filter((book) => {
//     return book.genre === genre;
//   });
//   return filteredBooks;
// };

// function sortByDate(books, direction) {
//   let sortedBooks = [...drivers];
//   sortedBooks.sort((a, b) => {
//     // const dateA = new Date(a.dob);
//     // const dateB = new Date(b.dob);
//     const dateA = a.publishedDate;
//     const dateB = b.publishedDate,

//     if (direction === ASC) {
//       return dateA - dateB;
//     } else {
//       return dateB - dateA;
//     }
//   });
//   return sortedBooks;
// };

// module.exports = { sortByDate }

// ---------------------------------------------------------------------------------------------------------------

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
            price: book.price * 800,
            description: book.description,
            rating: Math.floor(Math.random() * 5 + 1)
          })
      });
    }
  }
  return dbBooks;
};

const getFilteredBooks = async ({ sort, page = 0, genre = '', title, publishedDate }) => {

  let foundBooks = await getBooks();

  foundBooks = filterByTitle(foundBooks, title);
  let filteredByGenresBooks = filterByGenre(foundBooks, genre);

  if(publishedDate){
    filteredByGenresBooks = sortByDate(filteredByGenresBooks, publishedDate.direction);
  };

  const sortedBooks = sortBooks(filteredByGenresBooks, sort, page);
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