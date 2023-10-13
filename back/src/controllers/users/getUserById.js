const {User, Order} = require("../../db")

const getUserById = async(req, res)=>{
    try {
        const {id} = req.params
        const user = await User.findOne({where: {userId: id}, include: {
            model: Order,
            through: {
                attributes: []
            }}})
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

module.exports = getUserById