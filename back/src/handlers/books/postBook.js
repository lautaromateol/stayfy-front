const { createBook } = require("../../controllers/books/postBook");

const postHandler = async (req, res) => {
    const { title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active, stock } = req.body;
    try {
        const response = await createBook(title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, active, stock);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postHandler };