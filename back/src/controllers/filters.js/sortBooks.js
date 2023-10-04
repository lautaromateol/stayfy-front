const { ASC, DESC } = require("../../utils");
const DISPLAYED_BOOKS = 12;

function sortBooks(foundBooks, sort, page) {
  
    let totalPages = Math.ceil(foundBooks.length / DISPLAYED_BOOKS);
  
    const finalPage = page > totalPages ? totalPages - 1 : page;
    if (sort) {
      let sortedBooks = [...foundBooks].sort((a, b) => {
        if (a[sort.field] < b[sort.field]) {
          return -1;
        }
        if (a[sort.field] > b[sort.field]) {
          return 1;
        }
        return 0;
      });
      if (sort.direction === DESC) {
        sortedBooks = [...sortedBooks].reverse();
      }
      foundBooks = sortedBooks;
    };
  
    if (finalPage === 0 || finalPage) {
      let paginatedBooks = [...foundBooks].slice(
        finalPage * DISPLAYED_BOOKS,
        finalPage * DISPLAYED_BOOKS + DISPLAYED_BOOKS
      );
      foundBooks = paginatedBooks;
    };
    return {
      foundBooks,
      totalPages,
    };
  };

  module.exports = { sortBooks }