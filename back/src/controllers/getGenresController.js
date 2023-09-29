const { getBooks } = require("./getBooksController");

const getGenres = async () => {
    console.log("ESTÁ LLEGANDO LA SOLICITUD")
    const allBooks = await getBooks();
    console.log(allBooks)
    const allGenres = allBooks.map((book) => book.genre)
    uniqueGenres = [...new Set(allGenres)];
    return uniqueGenres;
};

module.exports = { getGenres };