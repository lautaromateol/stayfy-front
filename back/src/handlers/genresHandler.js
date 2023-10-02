const { getGenres } = require("../controllers/getGenresController");

const getGenresHandler = async (req, res) => {
  const response = await getGenres();
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getGenresHandler };