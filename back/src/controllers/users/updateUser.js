const { User } = require("../../db")

const updateUser = async (req, res) => {

    const {admin} = req.query

    const { id } = req.params 

    if(admin){
        try {
            if(admin === 'activate'){
                const user = await User.findOne({ where: {userId: id}})
                if(user) await user.update({ isAdmin: true }, { where: { isAdmin: false } })
                return res.status(200).json(await User.findAll())
            }
            if(admin === 'deactivate'){
                const user = await User.findOne({ where: {userId: id}})
                if(user) await user.update({ isAdmin: false }, { where: { isAdmin: true } })
                return res.status(200).json(await User.findAll())
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    else try {
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
        res.status(500).send(error.message)
    }
}

module.exports = updateUser