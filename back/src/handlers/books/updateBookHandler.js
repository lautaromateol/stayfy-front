const { updateBook, deactivateBook } = require("../../controllers/books/updateBook");

const deactivateBookHandler = async (req, res) => {
  const { id } = req.body;
  
  const response = await deactivateBook(id);
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateBookHandler = async (req, res) => {
  const { id, title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active, stock } = req.body;

  const response = await updateBook(id, title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active, stock);
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { deactivateBookHandler, updateBookHandler };