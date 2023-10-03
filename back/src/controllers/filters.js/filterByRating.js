function filterByRating (books, rating) {
    if (!rating) {
      return books;
    }
    const filteredBooks = books.filter((book) => {
      return book.rating >= rating;
    });
    // const filteredBooks = [];
    // books.map((book) => {
    //   if (book.rating === rating || book.rating > rating){
    //     filteredBooks.push(book);
    //   }
    // })
    return filteredBooks;
  };

module.exports = { filterByRating };