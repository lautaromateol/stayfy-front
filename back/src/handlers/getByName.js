const { getByName } = require("../controllers/getByNameController");

const getBooksHandler = async (req, res) => {
  const { name } = req.query;
  
  const response = await getByName(name);
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getBooksHandler };