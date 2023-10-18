const { Book } = require("../../db");

const deactivateBook = async (id) => {
    let book = await Book.findOne({ where: { id } });
  
    if (!book) {
        throw new Error("The book with the given ID does not exist in the database.");
    } else {
      if (book.active) {
        book.active = false;
      } else {
        book.active = true;
      }
      await book.save();
      console.log(book);
      return book;
    }
  };
  

  const updateBook = async ( id, title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active, stock ) => {
    let bookUpdate = await Book.findOne({ where: { id } });

    if (!bookUpdate) {
      throw new Error(
        "The book with the given ID does not exist in the database."
      );
    } else {
      if (title && title.length > 0) {
        bookUpdate.title = title;
      }
      if (authors && (authors.length > 0 || authors == [] || authors == [""])) {
        bookUpdate.authors = authors;
      }
      if (publisher && publisher.length > 0) {
        bookUpdate.publisher = publisher;
      }
      if (image && image.length > 0) {
        bookUpdate.image = image;
      }
      if (publishedDate && publishedDate > 0 && publishedDate < 2024) {
        bookUpdate.publishedDate = publishedDate;
      }
      if (pageCount && pageCount > 0) {
        bookUpdate.pageCount = pageCount;
      }
      if (genre && genre.length > 0) {
        bookUpdate.genre = genre;
      }
      if (price && price > 0) {
        bookUpdate.price = price;
        // bookUpdate.arsPrice = Math.ceil(price * 843);
        // bookUpdate.copPrice = Math.ceil(price * 4200);
        // bookUpdate.mxnPrice = Math.ceil(price * 18);
      }
      if (description && description.length > 0) {
        bookUpdate.description = description;
      }
      if (rating && rating > 0 && rating < 5.01) {
        bookUpdate.rating = rating;
      }
      if (active) {
        bookUpdate.active = active;
      }
      if (stock !== undefined && stock !== null && stock >= 0 && stock !== "") {
        bookUpdate.stock = stock;
        if (stock === 0){
          bookUpdate.active = false;
        } 
      }      
      await bookUpdate.save();
      // console.log(bookUpdate);
      return bookUpdate;
    }
  };

module.exports = { deactivateBook, updateBook }