const { getAllBooks } = require("../controllers/getBooksController");

const getBooksHandler = async (req, res) => {
  try {
    const response = await getAllBooks();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getBooksHandler };