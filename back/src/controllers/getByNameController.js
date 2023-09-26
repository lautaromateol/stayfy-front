const axios = require("axios");
require('dotenv').config();
// const { API_URL, DEFAULT_IMAGE } = process.env;
const {Book} = require("../../src/db");
// const { getBooks } = require("./getBooksController.js");

const getByName = async (originalName) => {

    if (!originalName) {
        throw new Error ('You must enter a name in order to the system to be able to search it.');
    };
    // const apiBooks = await getBooks();

    const bookTitle = originalName.charAt(0).toUpperCase() + originalName.slice(1).toLowerCase();
    console.log(`Gotten name ${originalName} turned into ${bookTitle}`);

    const dbFoundBook = await Book.findAll({
        where: {
            title: bookTitle,
        },
    });

    if (!dbFoundBook.length){
        throw new Error (`The book ${bookTitle} was not found.`);
    } else{
        return dbFoundBook;
    };

    // const apiFoundBooks = apiBooks.filter((book) => book.title == bookTitle);   
    // const queryFoundBooks = dbFoundBook.concat(apiFoundBooks);

    // if (!queryFoundBooks.length){
    //     throw new Error (`The book ${bookTitle} was not found.`);
    // } else{
    //     return queryFoundBooks;
    // };
};

module.exports = { getByName };