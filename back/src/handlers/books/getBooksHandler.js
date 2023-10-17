const { getBooks, getFilteredBooks } = require("../../controllers/books/getBooksController");

const getBooksHandler = async (req, res) => {
  const response = await getBooks();
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getFilteredBooksHandler = async (req, res) => {
  const { sort, page, genre, title, publishedDate, author, publisher, rating } = req.query;

  const response = await getFilteredBooks({ sort, page, genre, title, publishedDate, author, publisher, rating });
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getBooksHandler, getFilteredBooksHandler };