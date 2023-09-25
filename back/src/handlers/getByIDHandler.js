const { getByID } = require("../controllers/getByIDController");

const getByIDHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getByID(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
};

module.exports = { getByIDHandler };