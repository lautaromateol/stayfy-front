const {User} = require("../../db")
const createUser = async(req, res) => {
    try {
       const {username, email, password, fullName} = req.body 
       const newUser = {
        username,
        email,
        passwordHash: password,
        fullName
       }

       const userDb = await User.create(newUser)
       res.status(201).json(userDb)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = createUser;