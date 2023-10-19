const {User} = require("../../db")

const resetPassword = async (req, res) => {
    const {id} = req.params
    const {password} = req.body
    console.log(password)
    console.log(id)
    try {
        const user = await User.findOne({ where: {userId: id}})
        console.log(user.email)
        await user.update({passwordHash: password})
        return res.send({Status: "Success"})
    } catch (error) {
        return res.send({Status: error})
    }
}

module.exports = resetPassword

