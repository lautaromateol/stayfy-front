const { ASC, DESC } = require("../../utils");

function sortByDate(books, direction) {
    let sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
      const dateA = a.publishedDate;
      const dateB = b.publishedDate;
  
      if (direction === ASC) {
        return dateB - dateA;
      } 
      else if (direction === DESC) {
        return dateA - dateB;
      }
    });
    console.log(direction)
    return sortedBooks;
  };

  module.exports = { sortByDate }