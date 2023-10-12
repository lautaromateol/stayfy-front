const jwt = require("jsonwebtoken");
const {User} = require("../../db");

const login = async (req, res) =>{
  try {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).send("Data missing")

    const user = await User.findOne({where: {username}})
    if(!user){
        return res.status(404).send("User not found")
    } else {
        if(user.passwordHash !== password){
            return res.status(403).send("Incorrect password")
        } else {
            const userForToken = {
                id: user.userId,
                name: user.fullName,
                image: user.profilePicture,
                email: user.email
            }

            const token = jwt.sign(userForToken, process.env.SECRET)
            return res.status(200).send({token})
        }
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = login
            

