function filterByAuthor(books, author) {
    if (!author) {
      return books;
    }
    const filteredBooks = books.filter((book) => {
      return book.authors[0] === author;
    });
    return filteredBooks;
  };

module.exports = { filterByAuthor };