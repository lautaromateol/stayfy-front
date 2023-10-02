const { getBooks } = require("./getBooksController");

const getGenres = async () => {
    const allBooks = await getBooks();
    const allGenres = allBooks.map((book) => book.genre)
    uniqueGenres = [...new Set(allGenres)];
    return uniqueGenres;
};

module.exports = { getGenres };