const {User} = require("../../db")

const getUserById = async(req, res)=>{
    try {
        const {id} = req.params
        const user = await User.findOne({where: {userId: id}})
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

module.exports = getUserById