function filterByGenre(books, genre) {
    if (!genre) {
      return books;
    }
    const filteredBooks = books.filter((book) => {
      return book.genre === genre;
    });
    return filteredBooks;
  };

module.exports = { filterByGenre };