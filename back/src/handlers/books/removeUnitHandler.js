const {removeUnit} = require('../../controllers/books/removeUnitController')

const removeUnitHandler = async(req, res) => {
    const {items} = req.body

    try {
        const response = await removeUnit(items)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {removeUnitHandler}