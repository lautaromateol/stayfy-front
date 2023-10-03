const { ASC } = require("../../utils");

function sortByDate(books, direction) {
    let sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
      // const dateA = new Date(a.dob);
      // const dateB = new Date(b.dob);
      const dateA = a.publishedDate;
      const dateB = b.publishedDate;
  
      if (direction === ASC) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    return sortedBooks;
  };

  module.exports = { sortByDate }