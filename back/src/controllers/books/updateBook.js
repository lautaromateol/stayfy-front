const { Book } = require("../../db")

const deactivateBook = async (req, res) => {
    try {
        const { id } = req.params
        const activeBook = await Book.findOne({ where: { id, active: true } })
        if (activeBook) {
            await activeBook.update({ active: false }, { where: { active: true } })
            return res.status(200).json(await Book.findAll())
        }
        const inactiveBook = await Book.findOne({ where: { id, active: false } })
        if (inactiveBook) {
            await inactiveBook.update({ active: true }, { where: { active: false } })
            return res.status(200).json(await Book.findAll())
        }
    } catch (error) {
        console.error(error)
    }
};

const updateBook = async (req, res) => { // --> PENDIENTE TERMINAR ESTE CONTROLADOR
    try {
        const { id } = req.params
        const activeBook = await Book.findOne({ where: { id, active: true } })
        if (activeBook) {
            await activeBook.update({ active: false }, { where: { active: true } })
            return res.status(200).json(await Book.findAll())
        }
        const inactiveBook = await Book.findOne({ where: { id, active: false } })
        if (inactiveBook) {
            await inactiveBook.update({ active: true }, { where: { active: false } })
            return res.status(200).json(await Book.findAll())
        }
    } catch (error) {
        console.error(error)
    }
};


module.exports = { deactivateBook, updateBook }