require('dotenv').config();
const {Book} = require('../../src/db');
// const { getAPIbooks } = require('./getBooksController.js');

const getByID = async (bookID) => {    
    IDFoundBook = [];

    // if (bookID.length > 3){
      console.log("Executing search on database.");    
      const dbBook =  await Book.findOne({
        where: {
            id: bookID,
        },
      });
      IDFoundBook.push(dbBook);
    // };
    
    // if (driverID.length < 4){
    //   console.log("Executing search on API.")
    //   const allAPIbooks= await getAPIbooks();
    //   const apiBook = allAPIbooks.find((book) => book.id === Number(bookID));

    //   if(apiBook){
    //     IDFoundBook.push(apiBook);
    //   }
    // };

    if ( IDFoundBook.length > 0 && IDFoundBook[0] !== null){
        return IDFoundBook[0];
    } else { throw new Error ('The book with the given ID does not exists in the system.'); };
  };

module.exports = { getByID };