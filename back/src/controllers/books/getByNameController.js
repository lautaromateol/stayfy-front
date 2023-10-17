const axios = require("axios");
// const Book = require("../models/Book.js");
const { Book } = require('../../db.js');
const { getAPIbooks } = require("./getBooksController.js");

const getByName = async (originalName) => {

    if (!originalName) {
        throw new Error ('You must enter a name in order to the system to be able to search it.');
    };
    const apiBooks = await getAPIbooks();
    // console.log(apiBooks)

    // const bookTitle = originalName.charAt(0).toUpperCase() + originalName.slice(1).toLowerCase();
    // console.log(Gotten name ${originalName} turned into ${bookTitle});

    // const dbFoundBook = await Book.findAll({
    //     where: {
    //         title: originalName,
    //     },
    // });


    // if (!dbFoundBook.length){
    //     throw new Error (`The book ${bookTitle} was not found.`);
    // } else{
    //     return dbFoundBook;
    // };

    const bookTitle = originalName;
    const dbFoundBook = [];
    
    const apiFoundBooks = apiBooks.filter((book) => book.title == bookTitle);   
    const queryFoundBooks = dbFoundBook.concat(apiFoundBooks);

    if (!queryFoundBooks.length){
        throw new Error (`The book ${bookTitle} was not found.`);
    } else{
        return queryFoundBooks;
    };
};

module.exports = { getByName };