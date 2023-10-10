const { Book } = require("../../db");
// const { DEFAULT_IMAGE } = require("../../utils");

const deactivateBook = async (id) => {
    let book = await Book.findOne({ where: { id } });
  
    if (!book) {
        throw new Error("The book with the given ID does not exist in the database.");
    }
    if (book.active) {
      book.active = false;
    } else {
        book.active = true;
    }
    await book.save();
    return book;
  };
  

  const updateBook = async ( id, title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active ) => {
    let bookUpdate = await Book.findOne({ where: { id } });

    if (!bookUpdate) {
      throw new Error(
        "The book with the given ID does not exist in the database."
      );
    } else {
      if (title) {
        bookUpdate.title = title;
      }
      if (authors) {
        bookUpdate.authors = authors;
      }
      if (publisher) {
        bookUpdate.publisher = publisher;
      }
      if (image) {
        bookUpdate.image = image;
      }
      if (publishedDate) {
        bookUpdate.publishedDate = publishedDate;
      }
      if (pageCount) {
        bookUpdate.pageCount = pageCount;
      }
      if (genre) {
        bookUpdate.genre = genre;
      }
      if (price) {
        bookUpdate.price = price;
        bookUpdate.arsPrice = Math.ceil(price * 843);
        bookUpdate.copPrice = Math.ceil(price * 4200);
        bookUpdate.mxnPrice = Math.ceil(price * 18);
      }
      if (description) {
        bookUpdate.description = description;
      }
      if (rating) {
        bookUpdate.rating = rating;
      }
      if (active) {
        bookUpdate.active = active;
      }
      await bookUpdate.save();
      return bookUpdate;
    }
  };

module.exports = { deactivateBook, updateBook }



// const deactivateBook = async (id) => {
//   let activeBook = await Book.findOne({ where: { id, active: true } });
//   let inactiveBook = await Book.findOne({ where: { id, active: false } });

//   if (activeBook) {
//     await activeBook.update({ active: false }, { where: { active: true } });
//     await activeBook.save();
//     return activeBook;
//   } 
//   if (inactiveBook) {
//     await inactiveBook.update({ active: true }, { where: { active: false } });
//     await inactiveBook.save();
//     return inactiveBook;
//   }
//   if (!activeBook && !inactiveBook){
//     throw new Error ("The book whit the given ID does not exists in the database.")
//   }
// };


// const updateBook = async (id, title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active) => {    // --> PENDIENTE TERMINAR ESTE CONTROLADOR
  //   let bookUpdate = await Book.findOne({ where: { id } });
  
  //   if (!bookUpdate) {
  //     throw new Error(
  //       "The book whit the given id does not exists within the database."
  //     );
  //   } else {
  //     await bookUpdate.update(
  //         { title },
  //         { authors },
  //         { publisher },
  //         { image: image ? image: DEFAULT_IMAGE},
  //         { publishedDate },
  //         { pageCount }, 
  //         { genre },
  //         { price },
  //         { arsPrice: Math.ceil(price * 843)},
  //         { copPrice: Math.ceil(price * 4200)},
  //         { mxnPrice: Math.ceil(price * 18)},
  //         { description },
  //         { rating },
  //         { active },
  //     );
  //     return bookUpdate;
  //   }
  // };
