const { User } = require("../../db")

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const activeUser = await User.findOne({ where: { userId: id, active: true } })
        if (activeUser) {
            await activeUser.update({ active: false }, { where: { active: true } })
            return res.status(200).json(await User.findAll())
        }
        const inactiveUser = await User.findOne({ where: { userId: id, active: false } })
        if (inactiveUser) {
            await inactiveUser.update({ active: true }, { where: { active: false } })
            return res.status(200).json(await User.findAll())
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = updateUser