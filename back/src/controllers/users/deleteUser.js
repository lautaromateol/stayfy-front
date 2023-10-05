const {User} = require("../../db")

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({where: {userId: id}})
        await user.destroy()
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
}

module.exports = deleteUser