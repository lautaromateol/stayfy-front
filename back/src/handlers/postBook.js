const { createBook } = require("../controllers/postBook");

const postHandler = async (req, res) => {
    const { title, authors, publisher, image, publishedDate, pageCount, genre, price, description} = req.body;
    try {
        const response = await createBook(title, authors, publisher, image, publishedDate, pageCount, genre, price, description);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postHandler };