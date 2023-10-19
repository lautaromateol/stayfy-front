const { Book } = require('../../db');

const removeUnit = async (items) => {
  for (const el of items) {
    const book = await Book.findOne({ where: { title: el.title } });

    if (book) {
      const newStock = book.stock - el.quantity;
      
      if (newStock >= 0) {
        await book.update({ stock: newStock });
      }
      else {
        console.error(`No se pueden eliminar ${el.quantity} unidades de "${el.title}" porque el stock es insuficiente.`);
      }
    } else {
      console.error(`No se encontró un libro con el título "${el.title}".`);
    }
  }

  return await Book.findAll();
};

module.exports = { removeUnit };
