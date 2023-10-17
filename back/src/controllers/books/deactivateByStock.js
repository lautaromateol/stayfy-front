const { Book } = require("../../db");

async function deactivateByStock() {

    const booksToDeactivate = await Book.findAll({ where: { stock: 0 } });

    booksToDeactivate.forEach(async (book) => {
        book.active = false;
        console.log(`Deactivating book with ID ${book.id}`);
        await book.save(); // Guardar cada libro modificado
    });
    console.log('Deactivation process completed.');
};

module.exports = { deactivateByStock };