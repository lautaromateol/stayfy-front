require('dotenv').config();
const {Book} = require('../../db');

const getByID = async (bookID) => {
  IDFoundBook = [];

  const dbBook = await Book.findOne({
    where: {
      id: bookID,
    },
  });
  IDFoundBook.push(dbBook);

  if (IDFoundBook.length > 0 && IDFoundBook[0] !== null) {
    return IDFoundBook[0];
  } else {
    throw new Error(
      "The book with the given ID does not exists in the system."
    );
  }
};

module.exports = { getByID };