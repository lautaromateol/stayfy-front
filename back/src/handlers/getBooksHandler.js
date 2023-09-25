const { getBooks } = require("../controllers/getBooksController");
const { getByName } = require("../controllers/getByNameController");

const getBooksHandler = async (req, res) => {
  const { name } = req.query;

  if(name === undefined || name === null){
    const response = await getByName();
  }
  else {  
    const response = await getBooks();
  }
  
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getBooksHandler };