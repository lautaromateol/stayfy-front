function filterByTitle(books, searchTitle) {
    if (!searchTitle) {
      return books;
    };
    const lowerSearchTitle = searchTitle.toLocaleLowerCase();
    const filteredBooks = books.filter(({ title }) => {
      const bookTitle = title.toLocaleLowerCase();
      return bookTitle.includes(lowerSearchTitle);
    });
    return filteredBooks;
  };

  module.exports = { filterByTitle };