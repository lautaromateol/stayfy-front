function filterByPublisher (books, publisher) {
    if (!publisher) {
      return books;
    }
    const filteredBooks = books.filter((book) => {
      return book.publisher === publisher;
    });
    return filteredBooks;
  };

module.exports = { filterByPublisher };