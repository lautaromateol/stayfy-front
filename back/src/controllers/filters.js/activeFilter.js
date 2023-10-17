function activeFilter(books) {

  const filteredBooks = books.filter((book) => {
    return book.active === true;
  });
  return filteredBooks;
};

module.exports = { activeFilter };