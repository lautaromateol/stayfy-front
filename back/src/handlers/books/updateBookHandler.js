const { updateBook, deactivateBook } = require("../../controllers/books/updateBook");

const deactivateBookHandler = async (req, res) => {
  const { id } = req.params;
  const response = await deactivateBook(id);
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateBookHandler = async (req, res) => {
  const { id } = req.params;    // o por query... nuevamente, quedaría en fucnión de lo que quede más cómodo para el front quizás
  const { title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active } = req.body;
  const response = await updateBook(id, title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active);
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { deactivateBookHandler, updateBookHandler };